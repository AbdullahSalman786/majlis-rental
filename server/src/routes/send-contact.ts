import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import sanitizeHtml from 'sanitize-html';
import { z } from 'zod';
import { createTransporter } from '../lib/email/transporter';
import { renderAdminEmail, renderClientConfirmationEmail, type ContactEmailPayload } from '../lib/email/templates';

const router = Router();

const routeLimiter = rateLimit({
  windowMs: 60_000,
  max: 3,
  standardHeaders: true,
  legacyHeaders: false,
});

const ContactSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required').max(80),
  lastName: z.string().trim().min(1, 'Last name is required').max(80),
  email: z.string().trim().email('Please enter a valid email address').max(120),
  phone: z.string().trim().min(5, 'Phone number is too short').max(30),

  eventDate: z.string().trim().regex(/^\d{4}-\d{2}-\d{2}$/),
  eventTime: z.string().trim().regex(/^\d{2}:\d{2}$/),

  eventType: z.string().trim().min(2, 'Event type is required').max(50),
  guestCount: z.preprocess((value) => {
    if (typeof value === 'string') {
      const trimmed = value.trim();
      if (trimmed === '') return undefined;
      const parsed = Number(trimmed);
      return Number.isNaN(parsed) ? value : parsed;
    }
    return value;
  }, z.number({ invalid_type_error: 'Guest count must be a number' }).int().min(1).max(500)),

  location: z.string().trim().min(2, 'Location is required').max(140),

  selectedPackage: z.enum(['essential', 'signature', 'prestige'], {
    errorMap: () => ({ message: 'Please select a valid package' }),
  }),
  addons: z.array(z.string().trim().max(60)).max(20).default([]),

  specialRequests: z.string().trim().max(2000).optional().default(''),
});

function sanitizeString(s: string) {
  const cleaned = sanitizeHtml(s, {
    allowedTags: [],
    allowedAttributes: {},
  });
  // Remove excessive whitespace
  return cleaned.replace(/\s+/g, ' ').trim();
}

/**
 * Generate a short reference code based on timestamp + random chars.
 * Format: YYMMDD-XXXX  (e.g., 250816-A7K3)
 */
function generateRefCode(): string {
  const now = new Date();
  const datePart = [
    String(now.getFullYear()).slice(2),
    String(now.getMonth() + 1).padStart(2, '0'),
    String(now.getDate()).padStart(2, '0'),
  ].join('');
  const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${datePart}-${randomPart}`;
}

router.post('/api/send-contact', routeLimiter, async (req, res) => {
  console.log('[send-contact] received request');

  try {
    const parsed = ContactSchema.safeParse({
      ...req.body,
      guestCount: typeof req.body?.guestCount === 'string' ? Number(req.body.guestCount) : req.body?.guestCount,
      addons: Array.isArray(req.body?.addons) ? req.body.addons : [],
      specialRequests: typeof req.body?.specialRequests === 'string' ? req.body.specialRequests : '',
    });

    if (!parsed.success) {
      const flattened = parsed.error.flatten();
      console.error('[send-contact] validation failed', flattened.fieldErrors);
      return res.status(400).json({ ok: false, message: 'Validation failed', errors: flattened.fieldErrors });
    }

    const v = parsed.data;

    const payload: ContactEmailPayload = {
      firstName: sanitizeString(v.firstName),
      lastName: sanitizeString(v.lastName),
      email: sanitizeString(v.email),
      phone: sanitizeString(v.phone),

      eventDate: sanitizeString(v.eventDate),
      eventTime: sanitizeString(v.eventTime),
      eventType: sanitizeString(v.eventType),
      guestCount: v.guestCount,

      location: sanitizeString(v.location),
      selectedPackage: sanitizeString(v.selectedPackage),
      addons: v.addons.map(sanitizeString),
      specialRequests: sanitizeString(v.specialRequests ?? ''),
    };

    // Env configuration
    const ADMIN_EMAIL = process.env.CONTACT_ADMIN_EMAIL;
    const OWNER_NAME = process.env.CONTACT_OWNER_NAME ?? 'Concierge';

    if (!ADMIN_EMAIL) {
      console.error('[send-contact] CONTACT_ADMIN_EMAIL is missing');
      return res.status(500).json({ ok: false, message: 'Mail recipient is not configured yet.' });
    }

    const transporter = createTransporter();
    if (!transporter) {
      console.error('[send-contact] SMTP credentials are missing');
      return res.status(500).json({ ok: false, message: 'Mail service is not configured yet. Please contact us directly.' });
    }

    // Generate unique reference code for this reservation
    const refCode = generateRefCode();

    const ownerText = `${payload.firstName} ${payload.lastName} (${payload.email}, ${payload.phone})`;
    const subject = `New Reservation [${refCode}] - ${payload.eventDate} ${payload.eventTime} - ${payload.selectedPackage}`;

    // Owner/admin email
    await transporter.sendMail({
      from: process.env.GMAIL_FROM_EMAIL ?? process.env.GMAIL_SMTP_USER ?? ADMIN_EMAIL,
      to: ADMIN_EMAIL,
      subject,
      text: `New reservation received.

Reference: ${refCode}
Client: ${ownerText}
Event: ${payload.eventDate} ${payload.eventTime} (${payload.eventType})
Guests: ${payload.guestCount}
Location: ${payload.location}
Package: ${payload.selectedPackage}
Addons: ${payload.addons.join(', ') || 'None'}
Special Requests: ${payload.specialRequests || '—'}`,
      html: renderAdminEmail(payload),
      headers: {
        'X-Reservation': 'HookahRental',
        'X-Ref-Code': refCode,
      },
    });

    // Optional client confirmation (controlled)
    const SEND_CLIENT_CONFIRMATION = (process.env.SEND_CLIENT_CONFIRMATION ?? 'false').toLowerCase() === 'true';
    if (SEND_CLIENT_CONFIRMATION) {
      await transporter.sendMail({
        from: process.env.GMAIL_FROM_EMAIL ?? process.env.GMAIL_SMTP_USER ?? ADMIN_EMAIL,
        to: payload.email,
        subject: `Reservation Received [#${refCode}] - Hookah Rental`,
        text: `Thanks ${payload.firstName}! We received your reservation (Ref: ${refCode}) and will contact you shortly.`,
        html: renderClientConfirmationEmail(payload, refCode),
      });
    }

    console.log('[send-contact] mail request accepted for', payload.email);
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('[send-contact] request failed', err);
    return res.status(500).json({ ok: false, message: 'Unable to send request right now.' });
  }
});

export default router;

