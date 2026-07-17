export type ContactEmailPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  eventDate: string; // YYYY-MM-DD
  eventTime: string; // HH:mm
  eventType: string;
  guestCount: number;
  location: string;

  selectedPackage: string;
  addons: string[];
  specialRequests: string;
};

const escapeHtml = (input: string) =>
  input
    .replaceAll('&', '&amp;')
    .replaceAll('<', '<')
    .replaceAll('>', '>')
    .replaceAll('"', '"')
    .replaceAll("'", '&#039;');

const formatList = (items: string[]) =>
  items.length ? items.map((x) => `<li style="margin:0 0 6px 0;">${escapeHtml(x)}</li>`).join('') : `<li style="margin:0;">None</li>`;

export function renderAdminEmail(p: ContactEmailPayload) {
  const addonsHtml = formatList(p.addons);

  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>New Reservation</title>
  </head>
  <body style="margin:0;padding:0;background:#070707;">
    <div style="max-width:680px;margin:0 auto;padding:28px;">
      <div style="background:linear-gradient(135deg,#111 0%, #070707 55%, #0f0f0f 100%);border:1px solid rgba(198,161,69,.35);border-radius:18px;padding:26px 22px;color:#f2f2f2;font-family:Arial, Helvetica, sans-serif;">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:16px;">
          <div>
            <div style="font-size:13px;letter-spacing:.24em;text-transform:uppercase;color:rgba(198,161,69,.95);font-weight:700;">Hookah Rental</div>
            <div style="margin-top:8px;font-size:22px;line-height:1.25;font-weight:700;">New Reservation Submitted</div>
            <div style="margin-top:8px;font-size:13px;color:rgba(255,255,255,.75);">Luxury details below</div>
          </div>
          <div style="width:48px;height:48px;border-radius:14px;border:1px solid rgba(198,161,69,.45);display:flex;align-items:center;justify-content:center;color:rgba(198,161,69,.95);font-weight:800;">HR</div>
        </div>

        <div style="margin-top:18px;border-top:1px solid rgba(255,255,255,.08);padding-top:18px;">
          <div style="font-size:14px;color:rgba(255,255,255,.88);font-weight:700;margin-bottom:10px;">Client</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div style="background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:14px;padding:12px;">
              <div style="font-size:12px;color:rgba(255,255,255,.65);">Name</div>
              <div style="margin-top:4px;font-size:14px;font-weight:700;color:#fff;">${escapeHtml(p.firstName)} ${escapeHtml(p.lastName)}</div>
            </div>
            <div style="background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:14px;padding:12px;">
              <div style="font-size:12px;color:rgba(255,255,255,.65);">Contact</div>
              <div style="margin-top:4px;font-size:14px;font-weight:700;color:#fff;">${escapeHtml(p.email)}<br/>${escapeHtml(p.phone)}</div>
            </div>
          </div>
        </div>

        <div style="margin-top:16px;border-top:1px solid rgba(255,255,255,.08);padding-top:16px;">
          <div style="font-size:14px;color:rgba(255,255,255,.88);font-weight:700;margin-bottom:10px;">Event</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div style="background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:14px;padding:12px;">
              <div style="font-size:12px;color:rgba(255,255,255,.65);">Date & Time</div>
              <div style="margin-top:4px;font-size:14px;font-weight:700;color:#fff;">${escapeHtml(p.eventDate)} at ${escapeHtml(p.eventTime)}</div>
            </div>
            <div style="background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:14px;padding:12px;">
              <div style="font-size:12px;color:rgba(255,255,255,.65);">Type</div>
              <div style="margin-top:4px;font-size:14px;font-weight:700;color:#fff;">${escapeHtml(p.eventType)}</div>
            </div>
            <div style="background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:14px;padding:12px;">
              <div style="font-size:12px;color:rgba(255,255,255,.65);">Guests</div>
              <div style="margin-top:4px;font-size:14px;font-weight:700;color:#fff;">${escapeHtml(String(p.guestCount))}</div>
            </div>
            <div style="background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:14px;padding:12px;">
              <div style="font-size:12px;color:rgba(255,255,255,.65);">Location</div>
              <div style="margin-top:4px;font-size:14px;font-weight:700;color:#fff;">${escapeHtml(p.location)}</div>
            </div>
          </div>
        </div>

        <div style="margin-top:16px;border-top:1px solid rgba(255,255,255,.08);padding-top:16px;">
          <div style="font-size:14px;color:rgba(255,255,255,.88);font-weight:700;margin-bottom:10px;">Package</div>
          <div style="background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:14px;padding:12px;">
            <div style="font-size:13px;color:rgba(255,255,255,.65);">Selected</div>
            <div style="margin-top:4px;font-size:14px;font-weight:700;color:#fff;">${escapeHtml(p.selectedPackage)}</div>

            <div style="margin-top:10px;">
              <div style="font-size:13px;color:rgba(255,255,255,.65);margin-bottom:6px;">Add-ons</div>
              <ul style="padding-left:18px;margin:0;color:#fff;">${addonsHtml}</ul>
            </div>

            <div style="margin-top:12px;">
              <div style="font-size:13px;color:rgba(255,255,255,.65);margin-bottom:6px;">Special Requests</div>
              <div style="white-space:pre-wrap;font-size:13px;line-height:1.5;color:rgba(255,255,255,.92);">${escapeHtml(p.specialRequests || '') || '—'}</div>
            </div>
          </div>
        </div>

        <div style="margin-top:18px;font-size:12px;color:rgba(255,255,255,.65);text-align:center;">
          © ${new Date().getFullYear()} Hookah Rental. Crafted in gold & black luxury.
        </div>
      </div>
    </div>
  </body>
</html>`;
}

export function renderClientConfirmationEmail(p: ContactEmailPayload) {
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Reservation Confirmation</title>
  </head>
  <body style="margin:0;padding:0;background:#070707;">
    <div style="max-width:680px;margin:0 auto;padding:28px;">
      <div style="background:linear-gradient(135deg,#111 0%, #070707 55%, #0f0f0f 100%);border:1px solid rgba(198,161,69,.35);border-radius:18px;padding:26px 22px;color:#f2f2f2;font-family:Arial, Helvetica, sans-serif;">
        <div style="font-size:13px;letter-spacing:.24em;text-transform:uppercase;color:rgba(198,161,69,.95);font-weight:700;">Hookah Rental</div>
        <div style="margin-top:10px;font-size:22px;line-height:1.25;font-weight:700;">Your Reservation Is Received</div>
        <div style="margin-top:8px;font-size:13px;color:rgba(255,255,255,.75);">We’ll contact you shortly to confirm the details.</div>

        <div style="margin-top:18px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:14px;padding:14px;">
          <div style="font-size:14px;color:rgba(255,255,255,.88);font-weight:700;margin-bottom:10px;">Reservation Summary</div>
          <div style="font-size:13px;line-height:1.7;color:rgba(255,255,255,.92);">
            <div><b style="color:#fff;">Name:</b> ${escapeHtml(p.firstName)} ${escapeHtml(p.lastName)}</div>
            <div><b style="color:#fff;">Event:</b> ${escapeHtml(p.eventDate)} at ${escapeHtml(p.eventTime)} (${escapeHtml(p.eventType)})</div>
            <div><b style="color:#fff;">Guests:</b> ${escapeHtml(String(p.guestCount))}</div>
            <div><b style="color:#fff;">Location:</b> ${escapeHtml(p.location)}</div>
            <div><b style="color:#fff;">Package:</b> ${escapeHtml(p.selectedPackage)}</div>
          </div>

          <div style="margin-top:12px;font-size:12px;color:rgba(255,255,255,.7);">
            Need to reach us faster? Use WhatsApp and we’ll respond immediately.
          </div>
        </div>

        <div style="margin-top:18px;text-align:center;">
          <div style="display:inline-block;padding:10px 16px;border-radius:999px;background:rgba(198,161,69,.12);border:1px solid rgba(198,161,69,.35);color:rgba(198,161,69,.95);font-weight:700;font-size:12px;">
            Premium gold/black support • 15-minute response
          </div>
        </div>

        <div style="margin-top:18px;font-size:12px;color:rgba(255,255,255,.65);text-align:center;">
          © ${new Date().getFullYear()} Hookah Rental
        </div>
      </div>
    </div>
  </body>
</html>`;
}
