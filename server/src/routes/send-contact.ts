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
  firstName: z.string().min(1).max(80),
  lastName: z.string().min(1).max(80),
  email: z.string().email().max(120),
  phone: z.string().min(5).max(30),

  eventDate: z.string().regex(/^\\d{4}-\\d{2}-\\d{2}$/),
  eventTime: z.string().regex(/^\\d{2}:\\d{2}$/),

  eventType: z.string().min(2).max(50),
  guestCount: z.number().int().min(1).max(500),

  location: z.string().min(2).max(140),

  selectedPackage: z.string().min(1).max(40),
  addons: z.array(z.string().max(60)).max(20).default([]),

  specialRequests: z.string().max(2000).optional().default(''),
});

function sanitizeString(s: string) {
  const cleaned = sanitizeHtml(s, {
    allowedTags: [],
    allowedAttributes: {},
  });
  // Remove excessive whitespace
  return cleaned.replace(/\\s+/g, ' ').trim();
}

router.post('/api/send-contact', routeLimiter, async (req, res) => {
  // Do not leak details.
  try {
    const parsed = ContactSchema.safeParse({
      ...req.body,
      // Normalize number fields coming from JSON as strings
      guestCount: typeof req.body?.guestCount === 'string' ? Number(req.body.guestCount) : req.body?.guestCount,
      addons: Array.isArray(req.body?.addons) ? req.body.addons : [],
      specialRequests: typeof req.body?.specialRequests === 'string' ? req.body.specialRequests : '',
    });

    if (!parsed.success) {
      return res.status(400).json({ ok: false, message: 'Please check your details and try again.' });
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
      return res.status(500).json({ ok: false, message: 'Unable to send request right now.' });
    }

    const transporter = createTransporter();

    const ownerText = `${payload.firstName} ${payload.lastName} (${payload.email}, ${payload.phone})`;
    const subject = `New Reservation - ${payload.eventDate} ${payload.eventTime} - ${payload.selectedPackage}`;

    // Owner/admin email
    await transporter.sendMail({
      from: process.env.GMAIL_FROM_EMAIL ?? process.env.GMAIL_SMTP_USER,
      to: ADMIN_EMAIL,
      subject,
      text: `New reservation received.\n\nClient: ${ownerText}\nEvent: ${payload.eventDate} ${payload.eventTime} (${payload.eventType})\nGuests: ${payload.guestCount}\nLocation: ${payload.location}\nPackage: ${payload.selectedPackage}\nAddons: ${payload.addons.join(', ') || 'None'}\nSpecial Requests: ${payload.specialRequests || '—'}`,
      html: renderAdminEmail(payload),
      headers: {
        'X-Reservation': 'HookahRental',
      },
    });

    // Optional client confirmation (controlled)
    const SEND_CLIENT_CONFIRMATION = (process.env.SEND_CLIENT_CONFIRMATION ?? 'false').toLowerCase() === 'true';
    if (SEND_CLIENT_CONFIRMATION) {
      await transporter.sendMail({
        from: process.env.GMAIL_FROM_EMAIL ?? process.env.GMAIL_SMTP_USER,
        to: payload.email,
        subject: 'Reservation Received - Hookah Rental',
        text: `Thanks ${payload.firstName}! We received your reservation and will contact you shortly.`,
        html: renderClientConfirmationEmail(payload),
      });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ ok: false, message: 'Unable to send request right now.' });
  }
});

export default router;
