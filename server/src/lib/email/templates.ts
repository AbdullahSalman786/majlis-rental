// ─────────────────────────────────────────
// types & helpers
// ─────────────────────────────────────────

export type ContactEmailPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  eventDate: string;   // YYYY-MM-DD
  eventTime: string;   // HH:mm
  eventType: string;
  guestCount: number;
  location: string;
  selectedPackage: string;
  addons: string[];
  specialRequests: string;
};

// ✅ FIX 1: All entities are correct HTML escape sequences
const escapeHtml = (input: string): string =>
  input
    .replaceAll('&',  '&amp;')
    .replaceAll('<',  '&lt;')
    .replaceAll('>',  '&gt;')
    .replaceAll('"',  '&quot;')
    .replaceAll("'",  '&#039;');

// ✅ FIX 4: addons render as table rows (not <li>) — safe inside email <td>
const formatList = (items: string[]): string =>
  items.length
    ? items
        .map(
          (x) => `
        <table cellpadding="0" cellspacing="0" border="0" width="100%"
          style="margin-bottom:8px;">
          <tr>
            <td style="width:20px;height:20px;min-width:20px;
              background:linear-gradient(135deg,#C6A145,#E8C96A);
              border-radius:5px;text-align:center;vertical-align:middle;
              font-size:10px;color:#070707;font-weight:900;line-height:20px;">
              &#10003;
            </td>
            <td style="padding-left:10px;font-size:13px;color:#ffffff;
              font-family:Arial,Helvetica,sans-serif;font-weight:700;
              line-height:1.45;vertical-align:middle;">
              ${escapeHtml(x)}
            </td>
          </tr>
        </table>`
        )
        .join('')
    : `<p style="margin:0;padding:4px 0;font-size:13px;
         color:rgba(255,255,255,0.28);font-style:italic;
         font-family:Arial,Helvetica,sans-serif;">None selected</p>`;


// ─────────────────────────────────────────
// ✅ FIX 1 & 2: Wrapped in a proper exported function with parameter `p`
// ─────────────────────────────────────────
export function renderAdminEmail(p: ContactEmailPayload): string {

  // ✅ FIX 3: currentYear declared inside the function
  const currentYear = new Date().getFullYear();

  // ✅ FIX 4: addonsHtml declared inside the function
  const addonsHtml = formatList(p.addons);

  // ✅ FIX 5: specialRequests ternary resolved BEFORE the template literal
  const specialRequestsHtml = escapeHtml(p.specialRequests || '').trim()
    ? `<div style="font-family:Arial,Helvetica,sans-serif;font-size:13px;
         line-height:1.58;color:rgba(255,255,255,0.78);
         white-space:pre-wrap;word-break:break-word;">
         ${escapeHtml(p.specialRequests || '').trim()}
       </div>`
    : `<div style="font-family:Arial,Helvetica,sans-serif;font-size:13px;
         color:rgba(255,255,255,0.28);font-style:italic;">
         No special requests
       </div>`;

  return `<!doctype html>
<html
  xmlns="http://www.w3.org/1999/xhtml"
  xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:o="urn:schemas-microsoft-com:office:office"
  lang="en"
>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta name="format-detection"
      content="telephone=no,address=no,email=no,date=no,url=no" />
    <meta name="color-scheme" content="dark light" />
    <meta name="supported-color-schemes" content="dark light" />
    <title>New Reservation &#8212; Hookah Rental</title>
    <!--[if mso]>
      <noscript><xml><o:OfficeDocumentSettings>
        <o:AllowPNG /><o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings></xml></noscript>
    <![endif]-->
    <style type="text/css">
      /* ─── HARD RESET ─── */
      html,body{margin:0!important;padding:0!important;width:100%!important;
        -webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;}
      *{box-sizing:border-box;}
      table{border-collapse:collapse!important;
        mso-table-lspace:0pt!important;mso-table-rspace:0pt!important;}
      td,th{padding:0;}
      img{border:0;height:auto;line-height:100%;outline:none;
        text-decoration:none;-ms-interpolation-mode:bicubic;display:block;}
      a{text-decoration:none;}
      body{overflow-x:hidden!important;}
      .email-root{overflow-x:hidden!important;width:100%!important;}
      u+.email-body .gml-wrap{min-width:100vw;}
      #MessageViewBody,.email-body{width:100%!important;}

      /* ══════════════════════════════════════════
         MOBILE FIRST  ≤ 480px
      ══════════════════════════════════════════ */
      .shell{width:100%!important;max-width:100%!important;}
      .shell-td{padding:0!important;}
      .wrap{padding:12px 10px!important;}
      .brand-line{width:28px!important;}
      .card-outer{border-radius:14px!important;width:100%!important;}
      .card-inner{padding:20px 15px 24px!important;}
      .hero-title{font-size:20px!important;line-height:1.28!important;
        letter-spacing:-0.01em!important;}
      .hero-sub{font-size:12px!important;line-height:1.55!important;}
      .hero-badge{display:none!important;mso-hide:all!important;}
      .status-wrap{padding:12px 13px!important;}
      .status-icon-cell{width:30px!important;}
      .status-dot{width:30px!important;height:30px!important;
        font-size:13px!important;line-height:30px!important;
        border-radius:50%!important;}
      .status-title{font-size:11px!important;}
      .status-sub{font-size:10px!important;}
      .sec{margin-top:18px!important;padding-top:18px!important;}
      .sec-bar{width:3px!important;height:15px!important;}
      .sec-title{font-size:12px!important;padding-left:8px!important;}
      .grid-row{width:100%!important;}
      .col-l,.col-r{display:block!important;width:100%!important;
        padding:0!important;float:none!important;}
      .col-l{padding-bottom:8px!important;}
      .col-r{padding-bottom:0!important;}
      .ic{padding:11px 13px!important;border-radius:10px!important;
        width:100%!important;}
      .ic-lbl{font-size:9px!important;letter-spacing:0.09em!important;}
      .ic-val{font-size:13px!important;margin-top:5px!important;}
      .ic-val-xl{font-size:20px!important;}
      .ic-icon{width:22px!important;height:22px!important;
        font-size:11px!important;line-height:22px!important;
        border-radius:5px!important;min-width:22px!important;}
      .pkg-card{padding:14px 13px!important;border-radius:10px!important;}
      .pkg-title{font-size:16px!important;}
      .pkg-icon-wrap{width:34px!important;}
      .pkg-icon{width:32px!important;height:32px!important;
        font-size:14px!important;line-height:32px!important;
        border-radius:9px!important;}
      .sub-card{padding:12px 13px!important;border-radius:10px!important;}
      .sub-lbl{font-size:9px!important;letter-spacing:0.09em!important;}
      .cta-wrap{margin-top:22px!important;}
      .cta-btn{padding:13px 0!important;font-size:12px!important;
        letter-spacing:0.05em!important;width:100%!important;
        display:block!important;border-radius:11px!important;
        text-align:center!important;}
      .cta-helper{font-size:10px!important;margin-top:8px!important;}
      .footer{padding:18px 15px 14px!important;}
      .footer-brand{font-size:9px!important;}
      .footer-tag{font-size:10px!important;}
      .footer-copy{font-size:9px!important;}
      .footer-link{font-size:9px!important;}
      .gap-sm{height:8px!important;font-size:8px!important;
        line-height:8px!important;}
      .gap-md{height:12px!important;font-size:12px!important;
        line-height:12px!important;}

      /* ══════════════════════════════════════════
         TABLET  481 – 640px
      ══════════════════════════════════════════ */
      @media only screen and (min-width:481px){
        .wrap{padding:18px 16px!important;}
        .card-inner{padding:26px 22px 28px!important;}
        .hero-title{font-size:24px!important;}
        .hero-sub{font-size:13px!important;}
        .hero-badge{display:table-cell!important;mso-hide:none!important;}
        .status-wrap{padding:13px 16px!important;}
        .status-dot{width:34px!important;height:34px!important;
          font-size:15px!important;line-height:34px!important;}
        .status-title{font-size:12px!important;}
        .status-sub{font-size:11px!important;}
        .sec{margin-top:22px!important;padding-top:22px!important;}
        .sec-title{font-size:13px!important;}
        .col-l,.col-r{display:table-cell!important;width:50%!important;}
        .col-l{padding-right:5px!important;padding-bottom:0!important;}
        .col-r{padding-left:5px!important;}
        .ic{padding:12px 14px!important;border-radius:11px!important;}
        .ic-lbl{font-size:10px!important;}
        .ic-val{font-size:14px!important;}
        .ic-val-xl{font-size:23px!important;}
        .ic-icon{width:26px!important;height:26px!important;
          font-size:12px!important;line-height:26px!important;
          border-radius:7px!important;}
        .pkg-title{font-size:17px!important;}
        .pkg-icon{width:36px!important;height:36px!important;
          font-size:16px!important;line-height:36px!important;}
        .cta-btn{width:auto!important;display:inline-block!important;
          padding:13px 38px!important;}
        .footer{padding:22px 20px 16px!important;}
      }

      /* ══════════════════════════════════════════
         DESKTOP  641px+
      ══════════════════════════════════════════ */
      @media only screen and (min-width:641px){
        .wrap{padding:24px 20px!important;}
        .card-inner{padding:32px 28px 30px!important;}
        .hero-title{font-size:28px!important;letter-spacing:-0.02em!important;}
        .hero-sub{font-size:13px!important;}
        .sec{margin-top:26px!important;padding-top:24px!important;}
        .ic{padding:14px 15px!important;border-radius:12px!important;}
        .ic-lbl{font-size:10px!important;}
        .ic-val{font-size:14px!important;}
        .ic-val-xl{font-size:26px!important;}
        .ic-icon{width:27px!important;height:27px!important;
          border-radius:7px!important;}
        .pkg-title{font-size:19px!important;}
        .pkg-icon{width:38px!important;height:38px!important;
          font-size:17px!important;line-height:38px!important;}
        .cta-btn{padding:14px 48px!important;font-size:13px!important;}
        .footer{padding:26px 24px 18px!important;}
      }

      @media (prefers-color-scheme:dark){
        .email-bg{background-color:#060606!important;}
      }
    </style>
  </head>

  <body class="email-body email-bg"
    style="margin:0;padding:0;background-color:#060606;
      -webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;
      word-break:break-word;">

    <!-- Hidden preheader -->
    <div aria-hidden="true"
      style="display:none;font-size:1px;color:#060606;line-height:1px;
        max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;">
      New reservation from ${escapeHtml(p.firstName)} ${escapeHtml(p.lastName)}
      for ${escapeHtml(p.eventType)} on ${escapeHtml(p.eventDate)}.
      &zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;
    </div>

    <!-- FULL-WIDTH SHELL -->
    <table class="shell email-root" role="presentation"
      cellpadding="0" cellspacing="0" border="0" width="100%"
      style="width:100%;background-color:#060606;table-layout:fixed;">
      <tr>
        <td class="shell-td" align="center" valign="top">

          <!-- CENTERED WRAP max 600px -->
          <table class="wrap" role="presentation"
            cellpadding="0" cellspacing="0" border="0"
            width="600" style="max-width:600px;width:100%;padding:12px 10px;">

            <!-- BRAND BAR -->
            <tr>
              <td align="center" style="padding:6px 0 14px;">
                <table role="presentation" cellpadding="0" cellspacing="0"
                  border="0" align="center">
                  <tr>
                    <td class="brand-line"
                      style="width:28px;height:1px;font-size:0;line-height:0;
                        background:linear-gradient(90deg,transparent,
                        rgba(198,161,69,.45));vertical-align:middle;">
                      &nbsp;
                    </td>
                    <td style="padding:0 12px;vertical-align:middle;
                      white-space:nowrap;">
                      <span style="font-family:Arial,Helvetica,sans-serif;
                        font-size:9px;letter-spacing:0.32em;
                        text-transform:uppercase;
                        color:rgba(198,161,69,.55);font-weight:700;">
                        &#10022;&nbsp; Hookah Rental &nbsp;&#10022;
                      </span>
                    </td>
                    <td class="brand-line"
                      style="width:28px;height:1px;font-size:0;line-height:0;
                        background:linear-gradient(90deg,
                        rgba(198,161,69,.45),transparent);
                        vertical-align:middle;">
                      &nbsp;
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- MAIN CARD -->
            <tr>
              <td>
                <!-- ✅ FIX 6: Added missing border on card -->
                <table class="card-outer" role="presentation"
                  cellpadding="0" cellspacing="0" border="0" width="100%"
                  style="border-radius:14px;
                    border:1px solid rgba(198,161,69,.2);
                    background:linear-gradient(158deg,
                      #161616 0%,#0c0c0c 48%,#111 100%);
                    overflow:hidden;">

                  <!-- Gold top line 3px -->
                  <tr>
                    <td style="height:3px;font-size:0;line-height:0;
                      background:linear-gradient(90deg,
                        rgba(198,161,69,.05) 0%,
                        rgba(198,161,69,.65) 20%,
                        rgba(232,201,106,.95) 50%,
                        rgba(198,161,69,.65) 80%,
                        rgba(198,161,69,.05) 100%);"></td>
                  </tr>

                  <!-- CARD BODY -->
                  <tr>
                    <td class="card-inner" style="padding:20px 15px 24px;">

                      <!-- HERO -->
                      <table role="presentation" cellpadding="0"
                        cellspacing="0" border="0" width="100%">
                        <tr>
                          <!-- Left: text -->
                          <td style="vertical-align:top;">

                            <!-- Pill tag -->
                            <table role="presentation" cellpadding="0"
                              cellspacing="0" border="0">
                              <tr>
                                <td style="background:rgba(198,161,69,.1);
                                  border:1px solid rgba(198,161,69,.2);
                                  border-radius:20px;padding:4px 11px 5px;">
                                  <span style="font-family:Arial,Helvetica,
                                    sans-serif;font-size:9px;
                                    letter-spacing:0.16em;
                                    text-transform:uppercase;
                                    color:#C6A145;font-weight:700;">
                                    New Reservation
                                  </span>
                                </td>
                              </tr>
                            </table>

                            <!-- Title -->
                            <div class="hero-title"
                              style="margin-top:10px;
                                font-family:Arial,Helvetica,sans-serif;
                                font-size:20px;line-height:1.28;
                                font-weight:800;color:#ffffff;
                                letter-spacing:-0.01em;">
                              Reservation<br/>Submitted
                            </div>

                            <!-- Sub -->
                            <div class="hero-sub"
                              style="margin-top:7px;
                                font-family:Arial,Helvetica,sans-serif;
                                font-size:12px;
                                color:rgba(255,255,255,.48);
                                line-height:1.55;">
                              A new luxury booking has been received.<br/>
                              Review the details below.
                            </div>

                          </td>
                        </tr>
                      </table>

                      <!-- STATUS BANNER -->
                      <table role="presentation" cellpadding="0"
                        cellspacing="0" border="0" width="100%"
                        style="margin-top:14px;">
                        <tr>
                          <td class="status-wrap"
                            style="background:linear-gradient(135deg,
                              rgba(198,161,69,.09),
                              rgba(198,161,69,.03));
                              border:1px solid rgba(198,161,69,.16);
                              border-radius:11px;padding:12px 13px;">
                            <table role="presentation" cellpadding="0"
                              cellspacing="0" border="0" width="100%">
                              <tr>
                                <td class="status-icon-cell"
                                  style="width:30px;vertical-align:middle;">
                                  <div class="status-dot"
                                    style="width:30px;height:30px;
                                      min-width:30px;
                                      background:linear-gradient(135deg,
                                        #C6A145,#E8C96A);
                                      border-radius:50%;text-align:center;
                                      line-height:30px;font-size:13px;">
                                    &#9203;
                                  </div>
                                </td>
                                <td style="padding-left:10px;
                                  vertical-align:middle;">
                                  <div class="status-title"
                                    style="font-family:Arial,Helvetica,
                                      sans-serif;font-size:11px;
                                      font-weight:700;color:#C6A145;
                                      line-height:1.3;">
                                    Awaiting Confirmation
                                  </div>
                                  <div class="status-sub"
                                    style="margin-top:2px;font-family:Arial,
                                      Helvetica,sans-serif;font-size:10px;
                                      color:rgba(255,255,255,.4);
                                      line-height:1.4;">
                                    Please review and confirm this reservation
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>

                      <!-- CLIENT INFO SECTION -->
                      <table role="presentation" cellpadding="0"
                        cellspacing="0" border="0" width="100%"
                        class="sec"
                        style="margin-top:18px;
                          border-top:1px solid rgba(255,255,255,.055);
                          padding-top:18px;">
                        <tr>
                          <td>

                            <!-- Heading -->
                            <table role="presentation" cellpadding="0"
                              cellspacing="0" border="0">
                              <tr>
                                <td class="sec-bar"
                                  style="width:3px;height:15px;min-width:3px;
                                    background:linear-gradient(180deg,
                                      #C6A145,#E8C96A);
                                    border-radius:2px;vertical-align:top;">
                                </td>
                                <td class="sec-title"
                                  style="padding-left:8px;font-family:Arial,
                                    Helvetica,sans-serif;font-size:12px;
                                    font-weight:700;
                                    color:rgba(255,255,255,.88);
                                    vertical-align:middle;">
                                  Client Information
                                </td>
                              </tr>
                            </table>

                            <!-- Name + Contact -->
                            <table class="grid-row" role="presentation"
                              cellpadding="0" cellspacing="0" border="0"
                              width="100%" style="margin-top:10px;">
                              <tr>

                                <!-- Name -->
                                <td class="col-l"
                                  style="width:50%;padding-right:5px;
                                    vertical-align:top;padding-bottom:8px;">
                                  <table role="presentation" cellpadding="0"
                                    cellspacing="0" border="0" width="100%">
                                    <tr>
                                      <td class="ic"
                                        style="background:rgba(255,255,255,.022);
                                          border-radius:10px;
                                          padding:11px 13px;width:100%;">
                                        <table role="presentation"
                                          cellpadding="0" cellspacing="0"
                                          border="0" width="100%">
                                          <tr>
                                            <td style="vertical-align:top;">
                                              <div class="ic-lbl"
                                                style="font-family:Arial,
                                                  Helvetica,sans-serif;
                                                  font-size:9px;
                                                  text-transform:uppercase;
                                                  letter-spacing:0.09em;
                                                  color:rgba(255,255,255,.38);
                                                  font-weight:600;">
                                                Full Name
                                              </div>
                                              <div class="ic-val"
                                                style="margin-top:5px;
                                                  font-family:Arial,Helvetica,
                                                  sans-serif;font-size:13px;
                                                  font-weight:700;color:#ffffff;
                                                  line-height:1.35;
                                                  word-break:break-word;">
                                                ${escapeHtml(p.firstName)}&nbsp;${escapeHtml(p.lastName)}
                                              </div>
                                            </td>
                                            <td style="width:26px;
                                              vertical-align:top;
                                              text-align:right;
                                              padding-left:6px;">
                                              <div class="ic-icon"
                                                style="width:22px;height:22px;
                                                  min-width:22px;
                                                  background:rgba(198,161,69,.1);
                                                  border-radius:5px;
                                                  text-align:center;
                                                  line-height:22px;
                                                  font-size:11px;">
                                                &#128100;
                                              </div>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>
                                </td>

                                <!-- Contact -->
                                <td class="col-r"
                                  style="width:50%;padding-left:5px;
                                    vertical-align:top;">
                                  <table role="presentation" cellpadding="0"
                                    cellspacing="0" border="0" width="100%">
                                    <tr>
                                      <td class="ic"
                                        style="background:rgba(255,255,255,.022);
                                          border-radius:10px;
                                          padding:11px 13px;">
                                        <table role="presentation"
                                          cellpadding="0" cellspacing="0"
                                          border="0" width="100%">
                                          <tr>
                                            <td style="vertical-align:top;">
                                              <div class="ic-lbl"
                                                style="font-family:Arial,
                                                  Helvetica,sans-serif;
                                                  font-size:9px;
                                                  text-transform:uppercase;
                                                  letter-spacing:0.09em;
                                                  color:rgba(255,255,255,.38);
                                                  font-weight:600;">
                                                Contact
                                              </div>
                                              <div style="margin-top:5px;
                                                line-height:1.5;">
                                                <a href="mailto:${escapeHtml(p.email)}"
                                                  style="font-family:Arial,
                                                    Helvetica,sans-serif;
                                                    font-size:12px;
                                                    color:#C6A145;
                                                    text-decoration:none;
                                                    font-weight:600;
                                                    word-break:break-all;
                                                    display:block;">
                                                  ${escapeHtml(p.email)}
                                                </a>
                                                <a href="tel:${escapeHtml(p.phone)}"
                                                  style="font-family:Arial,
                                                    Helvetica,sans-serif;
                                                    font-size:12px;
                                                    color:rgba(255,255,255,.68);
                                                    text-decoration:none;
                                                    font-weight:500;
                                                    display:block;
                                                    margin-top:2px;">
                                                  ${escapeHtml(p.phone)}
                                                </a>
                                              </div>
                                            </td>
                                            <td style="width:26px;
                                              vertical-align:top;
                                              text-align:right;
                                              padding-left:6px;">
                                              <div class="ic-icon"
                                                style="width:22px;height:22px;
                                                  min-width:22px;
                                                  background:rgba(198,161,69,.1);
                                                  border-radius:5px;
                                                  text-align:center;
                                                  line-height:22px;
                                                  font-size:11px;">
                                                &#128231;
                                              </div>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>
                                </td>

                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>

                      <!-- EVENT SECTION -->
                      <table role="presentation" cellpadding="0"
                        cellspacing="0" border="0" width="100%"
                        class="sec"
                        style="margin-top:18px;
                          border-top:1px solid rgba(255,255,255,.055);
                          padding-top:18px;">
                        <tr>
                          <td>

                            <table role="presentation" cellpadding="0"
                              cellspacing="0" border="0">
                              <tr>
                                <td class="sec-bar"
                                  style="width:3px;height:15px;min-width:3px;
                                    background:linear-gradient(180deg,
                                      #C6A145,#E8C96A);
                                    border-radius:2px;vertical-align:top;">
                                </td>
                                <td class="sec-title"
                                  style="padding-left:8px;font-family:Arial,
                                    Helvetica,sans-serif;font-size:12px;
                                    font-weight:700;
                                    color:rgba(255,255,255,.88);
                                    vertical-align:middle;">
                                  Event Details
                                </td>
                              </tr>
                            </table>

                            <!-- Row 1: Date + Type -->
                            <table class="grid-row" role="presentation"
                              cellpadding="0" cellspacing="0" border="0"
                              width="100%"
                              style="margin-top:10px;margin-bottom:10px;">
                              <tr>

                                <!-- Date & Time -->
                                <td class="col-l"
                                  style="width:50%;padding-right:5px;
                                    vertical-align:top;padding-bottom:8px;">
                                  <table role="presentation" cellpadding="0"
                                    cellspacing="0" border="0" width="100%">
                                    <tr>
                                      <td class="ic"
                                        style="background:rgba(255,255,255,.022);
                                          border-radius:10px;
                                          padding:11px 13px;">
                                        <table role="presentation"
                                          cellpadding="0" cellspacing="0"
                                          border="0" width="100%">
                                          <tr>
                                            <td style="vertical-align:top;">
                                              <div class="ic-lbl"
                                                style="font-family:Arial,
                                                  Helvetica,sans-serif;
                                                  font-size:9px;
                                                  text-transform:uppercase;
                                                  letter-spacing:0.09em;
                                                  color:rgba(255,255,255,.38);
                                                  font-weight:600;">
                                                Date &amp; Time
                                              </div>
                                              <div class="ic-val"
                                                style="margin-top:5px;
                                                  font-family:Arial,Helvetica,
                                                  sans-serif;font-size:13px;
                                                  font-weight:700;color:#fff;
                                                  line-height:1.3;">
                                                ${escapeHtml(p.eventDate)}
                                              </div>
                                              <div style="margin-top:2px;
                                                font-family:Arial,Helvetica,
                                                sans-serif;font-size:12px;
                                                color:#C6A145;font-weight:600;">
                                                ${escapeHtml(p.eventTime)}
                                              </div>
                                            </td>
                                            <td style="width:26px;
                                              vertical-align:top;
                                              text-align:right;
                                              padding-left:6px;">
                                              <div class="ic-icon"
                                                style="width:22px;height:22px;
                                                  min-width:22px;
                                                  background:rgba(198,161,69,.1);
                                                  border-radius:5px;
                                                  text-align:center;
                                                  line-height:22px;
                                                  font-size:11px;">
                                                &#128197;
                                              </div>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>
                                </td>

                                <!-- Event Type -->
                                <td class="col-r"
                                  style="width:50%;padding-left:5px;
                                    vertical-align:top;padding-bottom:8px;">
                                  <table role="presentation" cellpadding="0"
                                    cellspacing="0" border="0" width="100%">
                                    <tr>
                                      <td class="ic"
                                        style="background:rgba(255,255,255,.022);
                                          border-radius:10px;
                                          padding:11px 13px;">
                                        <table role="presentation"
                                          cellpadding="0" cellspacing="0"
                                          border="0" width="100%">
                                          <tr>
                                            <td style="vertical-align:top;">
                                              <div class="ic-lbl"
                                                style="font-family:Arial,
                                                  Helvetica,sans-serif;
                                                  font-size:9px;
                                                  text-transform:uppercase;
                                                  letter-spacing:0.09em;
                                                  color:rgba(255,255,255,.38);
                                                  font-weight:600;">
                                                Event Type
                                              </div>
                                              <div class="ic-val"
                                                style="margin-top:5px;
                                                  font-family:Arial,Helvetica,
                                                  sans-serif;font-size:13px;
                                                  font-weight:700;color:#fff;
                                                  line-height:1.35;
                                                  word-break:break-word;">
                                                ${escapeHtml(p.eventType)}
                                              </div>
                                            </td>
                                            <td style="width:26px;
                                              vertical-align:top;
                                              text-align:right;
                                              padding-left:6px;">
                                              <div class="ic-icon"
                                                style="width:22px;height:22px;
                                                  min-width:22px;
                                                  background:rgba(198,161,69,.1);
                                                  border-radius:5px;
                                                  text-align:center;
                                                  line-height:22px;
                                                  font-size:11px;">
                                                &#127881;
                                              </div>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>
                                </td>

                              </tr>
                            </table>

                            <!-- Row 2: Guests + Location -->
                            <table class="grid-row" role="presentation"
                              cellpadding="0" cellspacing="0" border="0"
                              width="100%">
                              <tr>

                                <!-- Guests -->
                                <td class="col-l"
                                  style="width:50%;padding-right:5px;
                                    vertical-align:top;padding-bottom:8px;">
                                  <table role="presentation" cellpadding="0"
                                    cellspacing="0" border="0" width="100%">
                                    <tr>
                                      <td class="ic"
                                        style="background:rgba(255,255,255,.022);
                                          border-radius:10px;
                                          padding:11px 13px;">
                                        <table role="presentation"
                                          cellpadding="0" cellspacing="0"
                                          border="0" width="100%">
                                          <tr>
                                            <td style="vertical-align:top;">
                                              <div class="ic-lbl"
                                                style="font-family:Arial,
                                                  Helvetica,sans-serif;
                                                  font-size:9px;
                                                  text-transform:uppercase;
                                                  letter-spacing:0.09em;
                                                  color:rgba(255,255,255,.38);
                                                  font-weight:600;">
                                                Guests
                                              </div>
                                              <div style="margin-top:5px;
                                                line-height:1;">
                                                <span class="ic-val-xl"
                                                  style="font-family:Arial,
                                                    Helvetica,sans-serif;
                                                    font-size:20px;
                                                    font-weight:800;
                                                    color:#C6A145;
                                                    vertical-align:baseline;">
                                                  ${escapeHtml(String(p.guestCount))}
                                                </span>
                                                <span style="font-family:Arial,
                                                  Helvetica,sans-serif;
                                                  font-size:11px;
                                                  color:rgba(255,255,255,.35);
                                                  margin-left:5px;
                                                  vertical-align:baseline;">
                                                  people
                                                </span>
                                              </div>
                                            </td>
                                            <td style="width:26px;
                                              vertical-align:top;
                                              text-align:right;
                                              padding-left:6px;">
                                              <div class="ic-icon"
                                                style="width:22px;height:22px;
                                                  min-width:22px;
                                                  background:rgba(198,161,69,.1);
                                                  border-radius:5px;
                                                  text-align:center;
                                                  line-height:22px;
                                                  font-size:11px;">
                                                &#128101;
                                              </div>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>
                                </td>

                                <!-- Location -->
                                <td class="col-r"
                                  style="width:50%;padding-left:5px;
                                    vertical-align:top;padding-bottom:0;">
                                  <table role="presentation" cellpadding="0"
                                    cellspacing="0" border="0" width="100%">
                                    <tr>
                                      <td class="ic"
                                        style="background:rgba(255,255,255,.022);
                                          border-radius:10px;
                                          padding:11px 13px;">
                                        <table role="presentation"
                                          cellpadding="0" cellspacing="0"
                                          border="0" width="100%">
                                          <tr>
                                            <td style="vertical-align:top;">
                                              <div class="ic-lbl"
                                                style="font-family:Arial,
                                                  Helvetica,sans-serif;
                                                  font-size:9px;
                                                  text-transform:uppercase;
                                                  letter-spacing:0.09em;
                                                  color:rgba(255,255,255,.38);
                                                  font-weight:600;">
                                                Location
                                              </div>
                                              <div class="ic-val"
                                                style="margin-top:5px;
                                                  font-family:Arial,Helvetica,
                                                  sans-serif;font-size:13px;
                                                  font-weight:700;color:#fff;
                                                  line-height:1.38;
                                                  word-break:break-word;">
                                                ${escapeHtml(p.location)}
                                              </div>
                                            </td>
                                            <td style="width:26px;
                                              vertical-align:top;
                                              text-align:right;
                                              padding-left:6px;">
                                              <div class="ic-icon"
                                                style="width:22px;height:22px;
                                                  min-width:22px;
                                                  background:rgba(198,161,69,.1);
                                                  border-radius:5px;
                                                  text-align:center;
                                                  line-height:22px;
                                                  font-size:11px;">
                                                &#128205;
                                              </div>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>
                                </td>

                              </tr>
                            </table>

                          </td>
                        </tr>
                      </table>

                      <!-- PACKAGE SECTION -->
                      <table role="presentation" cellpadding="0"
                        cellspacing="0" border="0" width="100%"
                        class="sec"
                        style="margin-top:18px;
                          border-top:1px solid rgba(255,255,255,.055);
                          padding-top:18px;">
                        <tr>
                          <td>

                            <table role="presentation" cellpadding="0"
                              cellspacing="0" border="0">
                              <tr>
                                <td class="sec-bar"
                                  style="width:3px;height:15px;min-width:3px;
                                    background:linear-gradient(180deg,
                                      #C6A145,#E8C96A);
                                    border-radius:2px;vertical-align:top;">
                                </td>
                                <td class="sec-title"
                                  style="padding-left:8px;font-family:Arial,
                                    Helvetica,sans-serif;font-size:12px;
                                    font-weight:700;
                                    color:rgba(255,255,255,.88);
                                    vertical-align:middle;">
                                  Package &amp; Extras
                                </td>
                              </tr>
                            </table>

                            <!-- Selected Package -->
                            <table role="presentation" cellpadding="0"
                              cellspacing="0" border="0" width="100%"
                              style="margin-top:10px;">
                              <tr>
                                <td class="pkg-card"
                                  style="background:linear-gradient(135deg,
                                    rgba(198,161,69,.09),
                                    rgba(198,161,69,.02));
                                    border-radius:10px;padding:14px 13px;">
                                  <table role="presentation" cellpadding="0"
                                    cellspacing="0" border="0" width="100%">
                                    <tr>
                                      <td style="vertical-align:middle;">
                                        <div style="font-family:Arial,
                                          Helvetica,sans-serif;font-size:9px;
                                          text-transform:uppercase;
                                          letter-spacing:0.09em;
                                          color:rgba(198,161,69,.58);
                                          font-weight:600;">
                                          Selected Package
                                        </div>
                                        <div class="pkg-title"
                                          style="margin-top:5px;font-family:
                                            Arial,Helvetica,sans-serif;
                                            font-size:16px;font-weight:800;
                                            color:#C6A145;line-height:1.28;">
                                          ${escapeHtml(p.selectedPackage)}
                                        </div>
                                      </td>
                                      <td class="pkg-icon-wrap"
                                        style="width:34px;vertical-align:middle;
                                          text-align:right;padding-left:8px;">
                                        <div class="pkg-icon"
                                          style="width:32px;height:32px;
                                            min-width:32px;
                                            background:linear-gradient(135deg,
                                              #C6A145,#E8C96A);
                                            border-radius:9px;
                                            text-align:center;
                                            line-height:32px;font-size:14px;">
                                          &#128230;
                                        </div>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>

                            <!-- ✅ FIX 7: Add-ons sub-card — added missing background -->
                            <table role="presentation" cellpadding="0"
                              cellspacing="0" border="0" width="100%"
                              style="margin-top:8px;">
                              <tr>
                                <td class="sub-card"
                                  style="background:rgba(255,255,255,.022);
                                    border-radius:10px;padding:12px 13px;">
                                  <div class="sub-lbl"
                                    style="font-family:Arial,Helvetica,
                                      sans-serif;font-size:9px;
                                      text-transform:uppercase;
                                      letter-spacing:0.09em;
                                      color:rgba(255,255,255,.38);
                                      font-weight:600;margin-bottom:9px;">
                                    Add-ons
                                  </div>
                                  ${addonsHtml}
                                </td>
                              </tr>
                            </table>

                            <!-- Special Requests -->
                            <table role="presentation" cellpadding="0"
                              cellspacing="0" border="0" width="100%"
                              style="margin-top:8px;">
                              <tr>
                                <td class="sub-card"
                                  style="background:rgba(255,255,255,.022);
                                    border-radius:10px;padding:12px 13px;">
                                  <div class="sub-lbl"
                                    style="font-family:Arial,Helvetica,
                                      sans-serif;font-size:9px;
                                      text-transform:uppercase;
                                      letter-spacing:0.09em;
                                      color:rgba(255,255,255,.38);
                                      font-weight:600;margin-bottom:7px;">
                                    Special Requests
                                  </div>
                                  ${specialRequestsHtml}
                                </td>
                              </tr>
                            </table>

                          </td>
                        </tr>
                      </table>

                      <!-- CTA -->
                      <table class="cta-wrap" role="presentation"
                        cellpadding="0" cellspacing="0" border="0"
                        width="100%" style="margin-top:22px;">
                        <tr>
                          <td align="center">

                            <!--[if mso]>
                              <v:roundrect
                                xmlns:v="urn:schemas-microsoft-com:vml"
                                xmlns:w="urn:schemas-microsoft-com:office:word"
                                href="tel:${escapeHtml(p.phone)}"
                                style="height:46px;v-text-anchor:middle;
                                  width:230px;"
                                arcsize="24%"
                                fillcolor="#C6A145"
                                stroke="f">
                                <w:anchorlock/>
                                <center style="font-family:Arial,sans-serif;
                                  font-size:13px;font-weight:bold;
                                  color:#070707;text-transform:uppercase;
                                  letter-spacing:2px;">
                                  Contact Customer
                                </center>
                              </v:roundrect>
                            <![endif]-->
                            <!--[if !mso]><!-->
                            <table role="presentation" cellpadding="0"
                              cellspacing="0" border="0" width="100%">
                              <tr>
                                <td align="center"
                                  style="background:linear-gradient(135deg,
                                    #C6A145 0%,#D4AF5B 45%,#E8C96A 100%);
                                    border-radius:11px;">
                                  <a href="tel:${escapeHtml(p.phone)}"
                                    class="cta-btn" target="_blank"
                                    style="display:block;width:100%;
                                      padding:13px 0;font-family:Arial,
                                      Helvetica,sans-serif;font-size:12px;
                                      font-weight:800;color:#070707;
                                      text-decoration:none;
                                      letter-spacing:0.05em;
                                      text-transform:uppercase;
                                      text-align:center;border-radius:11px;
                                      line-height:1.2;">
                                    Contact Customer
                                  </a>
                                </td>
                              </tr>
                            </table>
                            <!--<![endif]-->

                            <div class="cta-helper"
                              style="margin-top:8px;font-family:Arial,
                                Helvetica,sans-serif;font-size:10px;
                                color:rgba(255,255,255,.28);line-height:1.5;
                                text-align:center;">
                              Need more details? Reply to this email or
                              contact&nbsp;<a href="mailto:${escapeHtml(p.email)}"
                                style="color:rgba(198,161,69,.65);
                                  text-decoration:none;">
                                ${escapeHtml(p.email)}
                              </a>
                            </div>

                          </td>
                        </tr>
                      </table>

                    </td>
                  </tr>
                  <!-- END CARD BODY -->

                  <!-- Gold bottom line 2px -->
                  <tr>
                    <td style="height:2px;font-size:0;line-height:0;
                      background:linear-gradient(90deg,
                        rgba(198,161,69,.03) 0%,
                        rgba(198,161,69,.32) 50%,
                        rgba(198,161,69,.03) 100%);"></td>
                  </tr>

                </table>
                <!-- end .card-outer -->
              </td>
            </tr>
            <!-- end main card row -->

            <!-- FOOTER -->
            <tr>
              <td class="footer"
                style="padding:18px 15px 14px;text-align:center;">

                <div style="font-size:7px;color:rgba(198,161,69,.28);
                  letter-spacing:5px;margin-bottom:11px;">
                  &#9670;&nbsp;&#9670;&nbsp;&#9670;
                </div>

                <div class="footer-brand"
                  style="font-family:Arial,Helvetica,sans-serif;font-size:9px;
                    letter-spacing:0.24em;text-transform:uppercase;
                    color:rgba(198,161,69,.38);font-weight:700;">
                  Hookah Rental
                </div>

                <div class="footer-tag"
                  style="margin-top:4px;font-family:Arial,Helvetica,sans-serif;
                    font-size:10px;color:rgba(255,255,255,.2);line-height:1.5;">
                  Luxury Hookah Experiences for Weddings, Private Parties
                  &amp; Special Events.
                </div>

                <div class="footer-copy"
                  style="margin-top:10px;font-family:Arial,Helvetica,sans-serif;
                    font-size:9px;color:rgba(255,255,255,.13);">
                  &copy; ${currentYear} Hookah Rental. All rights reserved.
                </div>

              </td>
            </tr>

          </table>
          <!-- end .wrap -->

        </td>
      </tr>
    </table>
    <!-- end .shell -->

  </body>
</html>`;

} 

// ─────────────────────────────────────────
// Client confirmation email
// ─────────────────────────────────────────

export function renderClientConfirmationEmail(
  p: ContactEmailPayload,
  refCode: string
): string {
  const addonsHtml       = formatList(p.addons);
  const currentYear      = new Date().getFullYear();

  // ✅ FIX 2: escape user input before interpolating into HTML
  const specialRequests  = escapeHtml(p.specialRequests).trim();

  // ✅ FIX 3: ternary resolved to a clean single-line string — no broken spans
  const specialRequestsHtml = specialRequests
    ? `<div style="font-family:Arial,Helvetica,sans-serif;font-size:13px;
         line-height:1.58;color:rgba(255,255,255,0.78);
         white-space:pre-wrap;word-break:break-word;">${specialRequests}</div>`
    : `<div style="font-family:Arial,Helvetica,sans-serif;font-size:13px;
         line-height:1.58;color:rgba(255,255,255,0.28);
         font-style:italic;">No special requests provided</div>`;

  return `<!doctype html>
<html
  xmlns="http://www.w3.org/1999/xhtml"
  xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:o="urn:schemas-microsoft-com:office:office"
  lang="en"
>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta name="format-detection"
      content="telephone=no,address=no,email=no,date=no,url=no" />
    <meta name="color-scheme" content="dark light" />
    <meta name="supported-color-schemes" content="dark light" />
    <title>Reservation Received &#8212; Hookah Rental</title>
    <!--[if mso]>
      <noscript><xml><o:OfficeDocumentSettings>
        <o:AllowPNG /><o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings></xml></noscript>
    <![endif]-->
    <style type="text/css">
      /* ─── RESET ─── */
      html,body{margin:0!important;padding:0!important;width:100%!important;
        -webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;}
      *{box-sizing:border-box;}
      table{border-collapse:collapse!important;
        mso-table-lspace:0pt!important;mso-table-rspace:0pt!important;}
      td,th{padding:0;}
      img{border:0;height:auto;line-height:100%;outline:none;
        text-decoration:none;-ms-interpolation-mode:bicubic;display:block;}
      a{text-decoration:none;}
      body{overflow-x:hidden!important;}
      u+.eb .gw{min-width:100vw;}

      /* ══════════════════════════════════════
         MOBILE FIRST  ≤ 480px
      ══════════════════════════════════════ */
      .shell{width:100%!important;max-width:100%!important;
        table-layout:fixed!important;}
      .wrap{padding:10px 8px!important;}
      .bb-line{width:28px!important;}
      .bb-text{font-size:9px!important;letter-spacing:0.28em!important;
        padding:0 10px!important;}
      .card{border-radius:14px!important;}
      .card-body{padding:20px 15px 24px!important;}
      .hero-title{font-size:20px!important;line-height:1.28!important;}
      .hero-sub{font-size:12px!important;line-height:1.55!important;
        max-width:none!important;}
      .hero-icons{display:none!important;mso-hide:all!important;
        width:0!important;height:0!important;overflow:hidden!important;
        max-height:0!important;font-size:0!important;line-height:0!important;}
      .sb-wrap{padding:12px 13px!important;border-radius:11px!important;}
      .sb-dot{width:30px!important;height:30px!important;
        min-width:30px!important;font-size:13px!important;
        line-height:30px!important;}
      .sb-col{width:34px!important;}
      .sb-title{font-size:11px!important;}
      .sb-sub{font-size:10px!important;}
      .sec{margin-top:18px!important;padding-top:18px!important;}
      .sec-bar{width:3px!important;min-width:3px!important;
        height:15px!important;}
      .sec-title{font-size:12px!important;padding-left:8px!important;}
      .sum-table{border-radius:12px!important;}
      .sum-lbl{display:block!important;width:100%!important;
        padding:12px 13px 2px!important;white-space:normal!important;
        font-size:9px!important;}
      .sum-val{display:block!important;width:100%!important;
        padding:0 13px 12px!important;}
      .sum-sep{height:1px!important;}
      .col-l,.col-r{display:block!important;width:100%!important;
        padding:0!important;float:none!important;}
      .col-l{padding-bottom:8px!important;}
      .ic{padding:11px 12px!important;border-radius:10px!important;}
      .ic-lbl{font-size:9px!important;letter-spacing:0.09em!important;}
      .ic-val{font-size:13px!important;margin-top:5px!important;}
      .ic-val-xl{font-size:20px!important;}
      .ic-icon{width:22px!important;height:22px!important;
        min-width:22px!important;font-size:11px!important;
        line-height:22px!important;border-radius:5px!important;}
      .ic-icon-cell{width:26px!important;padding-left:6px!important;}
      .steps-col{display:block!important;width:100%!important;
        padding:0 0 16px!important;text-align:center!important;}
      .step-conn{display:none!important;mso-hide:all!important;}
      .wa-strip{padding:13px 12px!important;border-radius:12px!important;}
      .wa-icon{width:34px!important;height:34px!important;
        min-width:34px!important;font-size:17px!important;
        line-height:34px!important;}
      .wa-icon-cell{width:38px!important;}
      .wa-title{font-size:12px!important;}
      .wa-sub{font-size:11px!important;}
      .wa-btn-cell{display:none!important;mso-hide:all!important;}
      .wa-btn-row{display:block!important;width:100%!important;
        margin-top:10px!important;}
      .cta-wrap{margin-top:22px!important;}
      .cta-btn{display:block!important;width:100%!important;
        padding:14px 0!important;font-size:12px!important;
        letter-spacing:0.05em!important;border-radius:11px!important;
        text-align:center!important;}
      .cta-helper{font-size:10px!important;margin-top:8px!important;}
      .badge-pill{padding:8px 12px!important;}
      .badge-text{font-size:9px!important;letter-spacing:0.06em!important;}
      .sr-card{padding:12px 13px!important;border-radius:10px!important;}
      .sr-lbl{font-size:9px!important;letter-spacing:0.09em!important;}
      .sr-val{font-size:13px!important;}
      .foot{padding:16px 12px 12px!important;}
      .foot-brand{font-size:9px!important;}
      .foot-tag{font-size:10px!important;}
      .foot-copy{font-size:9px!important;}
      .foot-link{font-size:9px!important;}
      .foot-links-wrap{margin-top:10px!important;}

      /* ══════════════════════════════════════
         TABLET  481px - 640px
      ══════════════════════════════════════ */
      @media only screen and (min-width:481px){
        .wrap{padding:16px!important;}
        .card{border-radius:16px!important;}
        .card-body{padding:26px 22px 28px!important;}
        .hero-title{font-size:24px!important;}
        .hero-sub{font-size:13px!important;}
        .hero-icons{display:table-cell!important;mso-hide:none!important;
          width:auto!important;height:auto!important;overflow:visible!important;
          max-height:none!important;font-size:inherit!important;
          line-height:normal!important;}
        .sb-wrap{padding:13px 16px!important;}
        .sb-dot{width:34px!important;height:34px!important;
          min-width:34px!important;font-size:15px!important;
          line-height:34px!important;}
        .sb-col{width:38px!important;}
        .sb-title{font-size:12px!important;}
        .sb-sub{font-size:11px!important;}
        .sec{margin-top:22px!important;padding-top:22px!important;}
        .sec-title{font-size:13px!important;}
        .sum-lbl{display:table-cell!important;width:130px!important;
          padding:13px 14px!important;white-space:nowrap!important;}
        .sum-val{display:table-cell!important;width:auto!important;
          padding:13px 14px 13px 0!important;}
        .col-l,.col-r{display:table-cell!important;
          width:50%!important;padding:0!important;}
        .col-l{padding-right:5px!important;padding-bottom:0!important;}
        .col-r{padding-left:5px!important;}
        .ic{padding:12px 13px!important;border-radius:11px!important;}
        .ic-lbl{font-size:10px!important;}
        .ic-val{font-size:14px!important;}
        .ic-val-xl{font-size:23px!important;}
        .ic-icon{width:25px!important;height:25px!important;
          min-width:25px!important;font-size:12px!important;
          line-height:25px!important;border-radius:6px!important;}
        .ic-icon-cell{width:29px!important;}
        .steps-col{display:table-cell!important;width:33%!important;
          padding:0 6px!important;text-align:center!important;}
        .step-conn{display:table-cell!important;mso-hide:none!important;
          width:16px!important;vertical-align:middle!important;}
        .wa-btn-cell{display:table-cell!important;mso-hide:none!important;
          width:96px!important;vertical-align:middle!important;
          text-align:right!important;padding-left:10px!important;}
        .wa-btn-row{display:none!important;}
        .cta-btn{display:inline-block!important;width:auto!important;
          padding:14px 44px!important;font-size:13px!important;}
        .badge-text{font-size:10px!important;}
        .sr-card{padding:13px 14px!important;}
        .foot{padding:20px 18px 14px!important;}
      }

      /* ══════════════════════════════════════
         DESKTOP  641px+
      ══════════════════════════════════════ */
      @media only screen and (min-width:641px){
        .wrap{padding:22px 18px!important;}
        .card-body{padding:32px 28px 30px!important;}
        .hero-title{font-size:28px!important;letter-spacing:-0.02em!important;}
        .sec{margin-top:24px!important;padding-top:24px!important;}
        .sum-lbl{width:136px!important;padding:14px 16px!important;}
        .sum-val{padding:14px 16px 14px 0!important;}
        .ic{padding:13px 14px!important;border-radius:12px!important;}
        .ic-val-xl{font-size:26px!important;}
        .ic-icon{width:26px!important;height:26px!important;
          min-width:26px!important;border-radius:7px!important;}
        .ic-icon-cell{width:30px!important;}
        .cta-btn{padding:15px 52px!important;}
        .foot{padding:22px 20px 16px!important;}
      }

      @media (prefers-color-scheme:dark){
        .email-bg{background-color:#060606!important;}
      }
    </style>
  </head>

  <body class="eb email-bg"
    style="margin:0;padding:0;background-color:#060606;
      -webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;
      word-break:break-word;overflow-x:hidden;">

    <!-- Preheader -->
    <div aria-hidden="true"
      style="display:none;font-size:1px;color:#060606;line-height:1px;
        max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;">
      Your reservation is received, ${escapeHtml(p.firstName)}. We will confirm
      your ${escapeHtml(p.eventType)} on ${escapeHtml(p.eventDate)} within 15 minutes.
      &zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;
    </div>

    <!-- SHELL -->
    <table class="shell" role="presentation" cellpadding="0" cellspacing="0"
      border="0" width="100%"
      style="width:100%;background-color:#060606;table-layout:fixed;">
      <tr>
        <td align="center" valign="top">

          <!-- 600px container -->
          <table class="gw" role="presentation" cellpadding="0" cellspacing="0"
            border="0" width="600" style="max-width:600px;width:100%;">
            <tr>
              <td class="wrap" style="padding:10px 8px;">
                <table role="presentation" cellpadding="0" cellspacing="0"
                  border="0" width="100%">

                  <!-- BRAND BAR -->
                  <tr>
                    <td align="center" style="padding:6px 0 14px;">
                      <table role="presentation" cellpadding="0" cellspacing="0"
                        border="0" align="center">
                        <tr>
                          <td class="bb-line"
                            style="width:28px;height:1px;font-size:0;line-height:0;
                              background:linear-gradient(90deg,transparent,
                              rgba(198,161,69,.45));vertical-align:middle;"
                          >&nbsp;</td>
                          <td class="bb-text"
                            style="padding:0 10px;vertical-align:middle;
                              white-space:nowrap;">
                            <span style="font-family:Arial,Helvetica,sans-serif;
                              font-size:9px;letter-spacing:0.28em;
                              text-transform:uppercase;
                              color:rgba(198,161,69,.55);font-weight:700;">
                              &#10022;&nbsp; Hookah Rental &nbsp;&#10022;
                            </span>
                          </td>
                          <td class="bb-line"
                            style="width:28px;height:1px;font-size:0;line-height:0;
                              background:linear-gradient(90deg,
                              rgba(198,161,69,.45),transparent);
                              vertical-align:middle;"
                          >&nbsp;</td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- MAIN CARD -->
                  <tr>
                    <td>
                      <table class="card" role="presentation" cellpadding="0"
                        cellspacing="0" border="0" width="100%"
                        style="border-radius:14px;
                          border:1px solid rgba(198,161,69,.2);
                          background:linear-gradient(158deg,
                            #161616 0%,#0c0c0c 48%,#111 100%);
                          overflow:hidden;">

                        <!-- Gold top line 3px -->
                        <tr>
                          <td style="height:3px;font-size:0;line-height:0;
                            background:linear-gradient(90deg,
                              rgba(198,161,69,.05) 0%,
                              rgba(198,161,69,.65) 20%,
                              rgba(232,201,106,.95) 50%,
                              rgba(198,161,69,.65) 80%,
                              rgba(198,161,69,.05) 100%);"></td>
                        </tr>

                        <!-- Card body -->
                        <tr>
                          <td class="card-body" style="padding:20px 15px 24px;">

                            <!-- HERO -->
                            <table role="presentation" cellpadding="0"
                              cellspacing="0" border="0" width="100%">
                              <tr>
                                <td style="vertical-align:top;">

                                  <!-- Tag pill -->
                                  <table role="presentation" cellpadding="0"
                                    cellspacing="0" border="0">
                                    <tr>
                                      <td style="background:rgba(198,161,69,.1);
                                        border:1px solid rgba(198,161,69,.2);
                                        border-radius:20px;
                                        padding:4px 12px 5px;">
                                        <span style="font-family:Arial,
                                          Helvetica,sans-serif;font-size:9px;
                                          letter-spacing:0.16em;
                                          text-transform:uppercase;
                                          color:#C6A145;font-weight:700;">
                                          Reservation Received
                                        </span>
                                      </td>
                                    </tr>
                                  </table>

                                  <!-- Title -->
                                  <div class="hero-title"
                                    style="margin-top:12px;
                                      font-family:Arial,Helvetica,sans-serif;
                                      font-size:20px;line-height:1.28;
                                      font-weight:800;color:#ffffff;
                                      letter-spacing:-0.01em;">
                                    Thank you,<br />
                                    <span style="color:#C6A145;">
                                      ${escapeHtml(p.firstName)}!
                                    </span>
                                  </div>

                                  <!-- Sub -->
                                  <div class="hero-sub"
                                    style="margin-top:8px;
                                      font-family:Arial,Helvetica,sans-serif;
                                      font-size:12px;
                                      color:rgba(255,255,255,.48);
                                      line-height:1.55;">
                                    We have received your booking request and
                                    will confirm all details
                                    within&nbsp;<strong style="
                                      color:rgba(255,255,255,.72);
                                      font-weight:700;">
                                      15&nbsp;minutes
                                    </strong>.
                                  </div>

                                </td>

                                <!-- Hero icons (hidden on mobile) -->
                                <td class="hero-icons"
                                  style="width:64px;vertical-align:top;
                                    text-align:right;padding-left:10px;
                                    display:none;">
                                  <div style="width:56px;height:56px;
                                    background:linear-gradient(145deg,
                                      rgba(198,161,69,.16),
                                      rgba(198,161,69,.05));
                                    border:1px solid rgba(198,161,69,.22);
                                    border-radius:16px;text-align:center;
                                    line-height:56px;font-size:24px;">
                                    &#127882;
                                  </div>
                                  <div style="margin-top:8px;width:56px;
                                    height:56px;
                                    background:rgba(255,255,255,.02);
                                    border:1px solid rgba(255,255,255,.05);
                                    border-radius:16px;text-align:center;
                                    line-height:56px;font-size:24px;">
                                    &#129453;
                                  </div>
                                </td>

                              </tr>
                            </table>

                            <!-- STATUS BANNER -->
                            <table role="presentation" cellpadding="0"
                              cellspacing="0" border="0" width="100%"
                              style="margin-top:14px;">
                              <tr>
                                <td class="sb-wrap"
                                  style="background:linear-gradient(135deg,
                                    rgba(198,161,69,.09),
                                    rgba(198,161,69,.03));
                                    border:1px solid rgba(198,161,69,.16);
                                    border-radius:11px;padding:12px 13px;">
                                  <table role="presentation" cellpadding="0"
                                    cellspacing="0" border="0" width="100%">
                                    <tr>
                                      <td class="sb-col"
                                        style="width:34px;vertical-align:middle;">
                                        <div class="sb-dot"
                                          style="width:30px;height:30px;
                                            min-width:30px;
                                            background:linear-gradient(135deg,
                                              #C6A145,#E8C96A);
                                            border-radius:50%;
                                            text-align:center;
                                            line-height:30px;font-size:13px;">
                                          &#9203;
                                        </div>
                                      </td>
                                      <td style="padding-left:10px;
                                        vertical-align:middle;">
                                        <div class="sb-title"
                                          style="font-family:Arial,Helvetica,
                                            sans-serif;font-size:11px;
                                            font-weight:700;color:#C6A145;
                                            line-height:1.3;">
                                          Pending Confirmation
                                        </div>
                                        <div class="sb-sub"
                                          style="margin-top:2px;
                                            font-family:Arial,Helvetica,
                                            sans-serif;font-size:10px;
                                            color:rgba(255,255,255,.4);
                                            line-height:1.4;">
                                          Our team will reach out to finalise
                                          your booking.
                                        </div>
                                      </td>
                                      <td style="vertical-align:middle;
                                        text-align:right;padding-left:8px;
                                        width:68px;">
                                        <div style="font-family:Arial,
                                          Helvetica,sans-serif;font-size:9px;
                                          color:rgba(255,255,255,.28);
                                          text-transform:uppercase;
                                          letter-spacing:0.1em;">Ref</div>
                                        <div style="font-family:Arial,
                                          Helvetica,sans-serif;font-size:11px;
                                          font-weight:700;
                                          color:rgba(198,161,69,.65);
                                          letter-spacing:0.05em;">
                                          #${refCode}
                                        </div>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>

                            <!-- RESERVATION SUMMARY -->
                            <table role="presentation" cellpadding="0"
                              cellspacing="0" border="0" width="100%"
                              class="sec"
                              style="margin-top:18px;
                                border-top:1px solid rgba(255,255,255,.055);
                                padding-top:18px;">
                              <tr>
                                <td>

                                  <!-- Heading -->
                                  <table role="presentation" cellpadding="0"
                                    cellspacing="0" border="0">
                                    <tr>
                                      <td class="sec-bar"
                                        style="width:3px;min-width:3px;
                                          height:15px;
                                          background:linear-gradient(180deg,
                                            #C6A145,#E8C96A);
                                          border-radius:2px;
                                          vertical-align:top;"></td>
                                      <td class="sec-title"
                                        style="padding-left:8px;
                                          font-family:Arial,Helvetica,sans-serif;
                                          font-size:12px;font-weight:700;
                                          color:rgba(255,255,255,.88);
                                          vertical-align:middle;">
                                        Reservation Summary
                                      </td>
                                    </tr>
                                  </table>

                                  <!-- Summary table -->
                                  <table class="sum-table" role="presentation"
                                    cellpadding="0" cellspacing="0" border="0"
                                    width="100%"
                                    style="margin-top:12px;
                                      background:rgba(255,255,255,.022);
                                      border-radius:12px;overflow:hidden;">

                                    <!-- ── Name ── -->
                                    <tr>
                                      <td class="sum-lbl"
                                        style="width:130px;padding:12px 13px 2px;
                                          font-family:Arial,Helvetica,sans-serif;
                                          font-size:9px;text-transform:uppercase;
                                          letter-spacing:0.09em;
                                          color:rgba(255,255,255,.38);
                                          font-weight:600;vertical-align:top;
                                          white-space:nowrap;">
                                        <table cellpadding="0" cellspacing="0"
                                          border="0"><tr>
                                          <td style="width:16px;
                                            text-align:center;font-size:12px;
                                            line-height:1;">&#128100;</td>
                                          <td style="padding-left:6px;
                                            vertical-align:middle;">Client</td>
                                        </tr></table>
                                      </td>
                                      <td class="sum-val"
                                        style="padding:0 13px 12px;
                                          font-family:Arial,Helvetica,sans-serif;
                                          font-size:13px;font-weight:700;
                                          color:#ffffff;vertical-align:bottom;
                                          word-break:break-word;">
                                        ${escapeHtml(p.firstName)}&nbsp;${escapeHtml(p.lastName)}
                                      </td>
                                    </tr>
                                    <tr class="sum-sep">
                                      <td colspan="2" style="height:1px;
                                        font-size:0;line-height:0;
                                        background:rgba(255,255,255,.05);"></td>
                                    </tr>

                                    <!-- ── Date & Time ── -->
                                    <tr>
                                      <td class="sum-lbl"
                                        style="width:130px;padding:12px 13px 2px;
                                          font-family:Arial,Helvetica,sans-serif;
                                          font-size:9px;text-transform:uppercase;
                                          letter-spacing:0.09em;
                                          color:rgba(255,255,255,.38);
                                          font-weight:600;vertical-align:top;
                                          white-space:nowrap;">
                                        <table cellpadding="0" cellspacing="0"
                                          border="0"><tr>
                                          <td style="width:16px;
                                            text-align:center;font-size:12px;
                                            line-height:1;">&#128197;</td>
                                          <td style="padding-left:6px;
                                            vertical-align:middle;">
                                            Date &amp; Time
                                          </td>
                                        </tr></table>
                                      </td>
                                      <td class="sum-val"
                                        style="padding:0 13px 12px;
                                          vertical-align:bottom;">
                                        <div style="font-family:Arial,
                                          Helvetica,sans-serif;font-size:13px;
                                          font-weight:700;color:#ffffff;
                                          line-height:1.35;">
                                          ${escapeHtml(p.eventDate)}
                                        </div>
                                        <div style="margin-top:2px;
                                          font-family:Arial,Helvetica,sans-serif;
                                          font-size:12px;color:#C6A145;
                                          font-weight:600;">
                                          ${escapeHtml(p.eventTime)}
                                        </div>
                                      </td>
                                    </tr>
                                    <tr class="sum-sep">
                                      <td colspan="2" style="height:1px;
                                        font-size:0;line-height:0;
                                        background:rgba(255,255,255,.05);"></td>
                                    </tr>

                                    <!-- ── Event ── -->
                                    <tr>
                                      <td class="sum-lbl"
                                        style="width:130px;padding:12px 13px 2px;
                                          font-family:Arial,Helvetica,sans-serif;
                                          font-size:9px;text-transform:uppercase;
                                          letter-spacing:0.09em;
                                          color:rgba(255,255,255,.38);
                                          font-weight:600;vertical-align:top;
                                          white-space:nowrap;">
                                        <table cellpadding="0" cellspacing="0"
                                          border="0"><tr>
                                          <td style="width:16px;
                                            text-align:center;font-size:12px;
                                            line-height:1;">&#127881;</td>
                                          <td style="padding-left:6px;
                                            vertical-align:middle;">Event</td>
                                        </tr></table>
                                      </td>
                                      <td class="sum-val"
                                        style="padding:0 13px 12px;
                                          font-family:Arial,Helvetica,sans-serif;
                                          font-size:13px;font-weight:700;
                                          color:#ffffff;vertical-align:bottom;
                                          word-break:break-word;">
                                        ${escapeHtml(p.eventType)}
                                      </td>
                                    </tr>
                                    <tr class="sum-sep">
                                      <td colspan="2" style="height:1px;
                                        font-size:0;line-height:0;
                                        background:rgba(255,255,255,.05);"></td>
                                    </tr>

                                    <!-- ── Guests ── -->
                                    <tr>
                                      <td class="sum-lbl"
                                        style="width:130px;padding:12px 13px 2px;
                                          font-family:Arial,Helvetica,sans-serif;
                                          font-size:9px;text-transform:uppercase;
                                          letter-spacing:0.09em;
                                          color:rgba(255,255,255,.38);
                                          font-weight:600;vertical-align:top;
                                          white-space:nowrap;">
                                        <table cellpadding="0" cellspacing="0"
                                          border="0"><tr>
                                          <td style="width:16px;
                                            text-align:center;font-size:12px;
                                            line-height:1;">&#128101;</td>
                                          <td style="padding-left:6px;
                                            vertical-align:middle;">Guests</td>
                                        </tr></table>
                                      </td>
                                      <td class="sum-val"
                                        style="padding:0 13px 12px;
                                          vertical-align:bottom;">
                                        <span class="ic-val-xl"
                                          style="font-family:Arial,Helvetica,
                                            sans-serif;font-size:20px;
                                            font-weight:800;color:#C6A145;
                                            vertical-align:baseline;">
                                          ${escapeHtml(String(p.guestCount))}
                                        </span>
                                        <span style="font-family:Arial,
                                          Helvetica,sans-serif;font-size:11px;
                                          color:rgba(255,255,255,.35);
                                          margin-left:3px;vertical-align:baseline;">
                                          guests
                                        </span>
                                      </td>
                                    </tr>
                                    <tr class="sum-sep">
                                      <td colspan="2" style="height:1px;
                                        font-size:0;line-height:0;
                                        background:rgba(255,255,255,.05);"></td>
                                    </tr>

                                    <!-- ── Location ── -->
                                    <tr>
                                      <td class="sum-lbl"
                                        style="width:130px;padding:12px 13px 2px;
                                          font-family:Arial,Helvetica,sans-serif;
                                          font-size:9px;text-transform:uppercase;
                                          letter-spacing:0.09em;
                                          color:rgba(255,255,255,.38);
                                          font-weight:600;vertical-align:top;
                                          white-space:nowrap;">
                                        <table cellpadding="0" cellspacing="0"
                                          border="0"><tr>
                                          <td style="width:16px;
                                            text-align:center;font-size:12px;
                                            line-height:1;">&#128205;</td>
                                          <td style="padding-left:6px;
                                            vertical-align:middle;">Location</td>
                                        </tr></table>
                                      </td>
                                      <td class="sum-val"
                                        style="padding:0 13px 12px;
                                          font-family:Arial,Helvetica,sans-serif;
                                          font-size:13px;font-weight:700;
                                          color:#ffffff;vertical-align:bottom;
                                          word-break:break-word;">
                                        ${escapeHtml(p.location)}
                                      </td>
                                    </tr>
                                    <tr class="sum-sep">
                                      <td colspan="2" style="height:1px;
                                        font-size:0;line-height:0;
                                        background:rgba(255,255,255,.05);"></td>
                                    </tr>

                                    <!-- ── Package ── -->
                                    <tr>
                                      <td class="sum-lbl"
                                        style="width:130px;padding:12px 13px 2px;
                                          font-family:Arial,Helvetica,sans-serif;
                                          font-size:9px;text-transform:uppercase;
                                          letter-spacing:0.09em;
                                          color:rgba(255,255,255,.38);
                                          font-weight:600;vertical-align:top;
                                          white-space:nowrap;">
                                        <table cellpadding="0" cellspacing="0"
                                          border="0"><tr>
                                          <td style="width:16px;
                                            text-align:center;font-size:12px;
                                            line-height:1;">&#128230;</td>
                                          <td style="padding-left:6px;
                                            vertical-align:middle;">Package</td>
                                        </tr></table>
                                      </td>
                                      <td class="sum-val"
                                        style="padding:0 13px 12px;
                                          vertical-align:bottom;">
                                        <span style="display:inline-block;
                                          font-family:Arial,Helvetica,sans-serif;
                                          font-size:12px;font-weight:700;
                                          color:#C6A145;
                                          background:rgba(198,161,69,.1);
                                          border:1px solid rgba(198,161,69,.2);
                                          border-radius:7px;padding:4px 11px;
                                          line-height:1.35;">
                                          ${escapeHtml(p.selectedPackage)}
                                        </span>
                                      </td>
                                    </tr>

                                  </table>
                                </td>
                              </tr>
                            </table>

                            <!-- ADD-ONS -->
                            <table role="presentation" cellpadding="0"
                              cellspacing="0" border="0" width="100%"
                              class="sec"
                              style="margin-top:18px;
                                border-top:1px solid rgba(255,255,255,.055);
                                padding-top:18px;">
                              <tr>
                                <td>
                                  <table role="presentation" cellpadding="0"
                                    cellspacing="0" border="0">
                                    <tr>
                                      <td class="sec-bar"
                                        style="width:3px;min-width:3px;
                                          height:15px;
                                          background:linear-gradient(180deg,
                                            #C6A145,#E8C96A);
                                          border-radius:2px;
                                          vertical-align:top;"></td>
                                      <td class="sec-title"
                                        style="padding-left:8px;
                                          font-family:Arial,Helvetica,sans-serif;
                                          font-size:12px;font-weight:700;
                                          color:rgba(255,255,255,.88);
                                          vertical-align:middle;">
                                        Add-ons Included
                                      </td>
                                    </tr>
                                  </table>

                                  <table role="presentation" cellpadding="0"
                                    cellspacing="0" border="0" width="100%"
                                    style="margin-top:10px;">
                                    <tr>
                                      <td class="sr-card"
                                        style="background:rgba(255,255,255,.022);
                                          border-radius:10px;
                                          padding:12px 13px;">
                                        ${addonsHtml}
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>

                            <!-- SPECIAL REQUESTS -->
                            <table role="presentation" cellpadding="0"
                              cellspacing="0" border="0" width="100%"
                              class="sec"
                              style="margin-top:18px;
                                border-top:1px solid rgba(255,255,255,.055);
                                padding-top:18px;">
                              <tr>
                                <td>
                                  <table role="presentation" cellpadding="0"
                                    cellspacing="0" border="0">
                                    <tr>
                                      <td class="sec-bar"
                                        style="width:3px;min-width:3px;
                                          height:15px;
                                          background:linear-gradient(180deg,
                                            #C6A145,#E8C96A);
                                          border-radius:2px;
                                          vertical-align:top;"></td>
                                      <td class="sec-title"
                                        style="padding-left:8px;
                                          font-family:Arial,Helvetica,sans-serif;
                                          font-size:12px;font-weight:700;
                                          color:rgba(255,255,255,.88);
                                          vertical-align:middle;">
                                        Special Requests
                                      </td>
                                    </tr>
                                  </table>

                                  <table role="presentation" cellpadding="0"
                                    cellspacing="0" border="0" width="100%"
                                    style="margin-top:10px;">
                                    <tr>
                                      <td class="sr-card"
                                        style="background:rgba(255,255,255,.022);
                                          border-radius:10px;
                                          padding:12px 13px;">
                                        ${specialRequestsHtml}
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>

                            <!-- WHAT HAPPENS NEXT -->
                            <table role="presentation" cellpadding="0"
                              cellspacing="0" border="0" width="100%"
                              class="sec"
                              style="margin-top:18px;
                                border-top:1px solid rgba(255,255,255,.055);
                                padding-top:18px;">
                              <tr>
                                <td>
                                  <table role="presentation" cellpadding="0"
                                    cellspacing="0" border="0">
                                    <tr>
                                      <td class="sec-bar"
                                        style="width:3px;min-width:3px;
                                          height:15px;
                                          background:linear-gradient(180deg,
                                            #C6A145,#E8C96A);
                                          border-radius:2px;
                                          vertical-align:top;"></td>
                                      <td class="sec-title"
                                        style="padding-left:8px;
                                          font-family:Arial,Helvetica,sans-serif;
                                          font-size:12px;font-weight:700;
                                          color:rgba(255,255,255,.88);
                                          vertical-align:middle;">
                                        What Happens Next
                                      </td>
                                    </tr>
                                  </table>

                                  <!-- Steps -->
                                  <table role="presentation" cellpadding="0"
                                    cellspacing="0" border="0" width="100%"
                                    style="margin-top:14px;">
                                    <tr>

                                      <!-- Step 1 -->
                                      <td class="steps-col"
                                        style="width:33%;text-align:center;
                                          vertical-align:top;padding:0 6px;">
                                        <div style="width:40px;height:40px;
                                          margin:0 auto;
                                          background:linear-gradient(135deg,
                                            rgba(198,161,69,.16),
                                            rgba(198,161,69,.05));
                                          border:1px solid rgba(198,161,69,.22);
                                          border-radius:50%;text-align:center;
                                          line-height:40px;font-size:17px;">
                                          &#128236;
                                        </div>
                                        <div style="margin-top:9px;
                                          font-family:Arial,Helvetica,sans-serif;
                                          font-size:11px;font-weight:700;
                                          color:#C6A145;">Confirmation</div>
                                        <div style="margin-top:3px;
                                          font-family:Arial,Helvetica,sans-serif;
                                          font-size:10px;
                                          color:rgba(255,255,255,.38);
                                          line-height:1.5;">
                                          Email within 15&nbsp;min
                                        </div>
                                      </td>

                                      <!-- Connector -->
                                      <td class="step-conn"
                                        style="width:16px;vertical-align:middle;
                                          text-align:center;">
                                        <div style="height:1px;
                                          background:linear-gradient(90deg,
                                            rgba(198,161,69,.35),
                                            rgba(198,161,69,.12));"></div>
                                      </td>

                                      <!-- Step 2 -->
                                      <td class="steps-col"
                                        style="width:33%;text-align:center;
                                          vertical-align:top;padding:0 6px;">
                                        <div style="width:40px;height:40px;
                                          margin:0 auto;
                                          background:linear-gradient(135deg,
                                            rgba(198,161,69,.16),
                                            rgba(198,161,69,.05));
                                          border:1px solid rgba(198,161,69,.22);
                                          border-radius:50%;text-align:center;
                                          line-height:40px;font-size:17px;">
                                          &#129309;
                                        </div>
                                        <div style="margin-top:9px;
                                          font-family:Arial,Helvetica,sans-serif;
                                          font-size:11px;font-weight:700;
                                          color:#C6A145;">Coordination</div>
                                        <div style="margin-top:3px;
                                          font-family:Arial,Helvetica,sans-serif;
                                          font-size:10px;
                                          color:rgba(255,255,255,.38);
                                          line-height:1.5;">
                                          Finalise setup
                                        </div>
                                      </td>

                                      <!-- Connector -->
                                      <td class="step-conn"
                                        style="width:16px;vertical-align:middle;
                                          text-align:center;">
                                        <div style="height:1px;
                                          background:linear-gradient(90deg,
                                            rgba(198,161,69,.12),
                                            rgba(198,161,69,.35));"></div>
                                      </td>

                                      <!-- Step 3 -->
                                      <td class="steps-col"
                                        style="width:33%;text-align:center;
                                          vertical-align:top;padding:0 6px;">
                                        <div style="width:40px;height:40px;
                                          margin:0 auto;
                                          background:linear-gradient(135deg,
                                            rgba(198,161,69,.16),
                                            rgba(198,161,69,.05));
                                          border:1px solid rgba(198,161,69,.22);
                                          border-radius:50%;text-align:center;
                                          line-height:40px;font-size:17px;">
                                          &#10024;
                                        </div>
                                        <div style="margin-top:9px;
                                          font-family:Arial,Helvetica,sans-serif;
                                          font-size:11px;font-weight:700;
                                          color:#C6A145;">Experience</div>
                                        <div style="margin-top:3px;
                                          font-family:Arial,Helvetica,sans-serif;
                                          font-size:10px;
                                          color:rgba(255,255,255,.38);
                                          line-height:1.5;">
                                          Enjoy your event!
                                        </div>
                                      </td>

                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>

                            <!-- WHATSAPP STRIP -->
                            <table role="presentation" cellpadding="0"
                              cellspacing="0" border="0" width="100%"
                              style="margin-top:18px;">
                              <tr>
                                <td class="wa-strip"
                                  style="background:linear-gradient(135deg,
                                    rgba(37,211,102,.07),
                                    rgba(37,211,102,.02));
                                    border:1px solid rgba(37,211,102,.15);
                                    border-radius:12px;padding:13px 12px;">
                                  <table role="presentation" cellpadding="0"
                                    cellspacing="0" border="0" width="100%">
                                    <tr>
                                      <td class="wa-icon-cell"
                                        style="width:38px;vertical-align:middle;">
                                        <div class="wa-icon"
                                          style="width:34px;height:34px;
                                            min-width:34px;
                                            background:rgba(37,211,102,.1);
                                            border-radius:50%;text-align:center;
                                            line-height:34px;font-size:17px;">
                                          &#128172;
                                        </div>
                                      </td>
                                      <td style="padding-left:10px;
                                        vertical-align:middle;">
                                        <div class="wa-title"
                                          style="font-family:Arial,Helvetica,
                                            sans-serif;font-size:12px;
                                            font-weight:700;
                                            color:rgba(37,211,102,.88);">
                                          Need a faster response?
                                        </div>
                                        <div class="wa-sub"
                                          style="margin-top:2px;font-family:
                                            Arial,Helvetica,sans-serif;
                                            font-size:11px;
                                            color:rgba(255,255,255,.4);
                                            line-height:1.45;">
                                          Message us on WhatsApp for an
                                          immediate reply.
                                        </div>
                                      </td>
                                      <!-- Desktop WA button -->
                                      <td class="wa-btn-cell"
                                        style="display:none;width:96px;
                                          vertical-align:middle;
                                          text-align:right;padding-left:10px;">
                                        <a href="https://wa.me/1234567890"
                                          target="_blank"
                                          style="display:inline-block;
                                            background:rgba(37,211,102,.12);
                                            border:1px solid
                                              rgba(37,211,102,.25);
                                            border-radius:9px;padding:8px 14px;
                                            font-family:Arial,Helvetica,
                                            sans-serif;font-size:11px;
                                            font-weight:700;
                                            color:rgba(37,211,102,.9);
                                            text-decoration:none;
                                            white-space:nowrap;">
                                          WhatsApp &#8594;
                                        </a>
                                      </td>
                                    </tr>
                                  </table>

                                  <!-- Mobile WA button -->
                                  <div class="wa-btn-row"
                                    style="display:block;margin-top:10px;">
                                    <table role="presentation" cellpadding="0"
                                      cellspacing="0" border="0" width="100%">
                                      <tr>
                                        <td align="center">
                                          <a href="https://wa.me/1234567890"
                                            target="_blank"
                                            style="display:block;width:100%;
                                              background:rgba(37,211,102,.12);
                                              border:1px solid
                                                rgba(37,211,102,.25);
                                              border-radius:9px;padding:10px 0;
                                              font-family:Arial,Helvetica,
                                              sans-serif;font-size:12px;
                                              font-weight:700;
                                              color:rgba(37,211,102,.9);
                                              text-decoration:none;
                                              text-align:center;">
                                            &#128172;&nbsp; WhatsApp Us
                                          </a>
                                        </td>
                                      </tr>
                                    </table>
                                  </div>

                                </td>
                              </tr>
                            </table>

                            <!-- CTA -->
                            <table class="cta-wrap" role="presentation"
                              cellpadding="0" cellspacing="0" border="0"
                              width="100%" style="margin-top:22px;">
                              <tr>
                                <td align="center">

                                  <!--[if mso]>
                                    <v:roundrect
                                      xmlns:v="urn:schemas-microsoft-com:vml"
                                      xmlns:w="urn:schemas-microsoft-com:office:word"
                                      href="#"
                                      style="height:46px;v-text-anchor:middle;
                                        width:230px;"
                                      arcsize="24%"
                                      fillcolor="#C6A145"
                                      stroke="f">
                                      <w:anchorlock/>
                                      <center style="font-family:Arial,
                                        sans-serif;font-size:13px;
                                        font-weight:bold;color:#070707;
                                        text-transform:uppercase;
                                        letter-spacing:2px;">
                                        View My Booking
                                      </center>
                                    </v:roundrect>
                                  <![endif]-->
                                  <!--[if !mso]><!-->
                                  <table role="presentation" cellpadding="0"
                                    cellspacing="0" border="0" width="100%">
                                    <tr>
                                      <td align="center"
                                        style="background:linear-gradient(135deg,
                                          #C6A145 0%,#D4AF5B 45%,#E8C96A 100%);
                                          border-radius:11px;">
                                        <a href="#" class="cta-btn"
                                          target="_blank"
                                          style="display:block;width:100%;
                                            padding:14px 0;font-family:Arial,
                                            Helvetica,sans-serif;font-size:12px;
                                            font-weight:800;color:#070707;
                                            text-decoration:none;
                                            letter-spacing:0.05em;
                                            text-transform:uppercase;
                                            text-align:center;
                                            border-radius:11px;
                                            line-height:1.2;">
                                          &#10003;&nbsp; View My Booking
                                        </a>
                                      </td>
                                    </tr>
                                  </table>
                                  <!--<![endif]-->

                                  <!-- Badge pill -->
                                  <table role="presentation" cellpadding="0"
                                    cellspacing="0" border="0" align="center"
                                    style="margin-top:12px;">
                                    <tr>
                                      <td class="badge-pill"
                                        style="background:rgba(198,161,69,.07);
                                          border:1px solid rgba(198,161,69,.17);
                                          border-radius:999px;padding:8px 12px;
                                          text-align:center;">
                                        <span class="badge-text"
                                          style="font-family:Arial,Helvetica,
                                            sans-serif;font-size:9px;
                                            font-weight:700;
                                            color:rgba(198,161,69,.72);
                                            letter-spacing:0.06em;">
                                          &#9733;&nbsp; Premium Gold &amp; Black
                                          &bull; 15-Min Response &nbsp;&#9733;
                                        </span>
                                      </td>
                                    </tr>
                                  </table>

                                  <div class="cta-helper"
                                    style="margin-top:8px;font-family:Arial,
                                      Helvetica,sans-serif;font-size:10px;
                                      color:rgba(255,255,255,.28);
                                      line-height:1.5;text-align:center;">
                                    or reply to this email to reach us
                                  </div>

                                </td>
                              </tr>
                            </table>

                          </td>
                        </tr>
                        <!-- end card body -->

                        <!-- Gold bottom line 2px -->
                        <tr>
                          <td style="height:2px;font-size:0;line-height:0;
                            background:linear-gradient(90deg,
                              rgba(198,161,69,.03) 0%,
                              rgba(198,161,69,.32) 50%,
                              rgba(198,161,69,.03) 100%);"></td>
                        </tr>

                      </table>
                      <!-- end .card -->
                    </td>
                  </tr>

                  <!-- FOOTER -->
                  <tr>
                    <td class="foot"
                      style="padding:16px 12px 12px;text-align:center;">

                      <div style="font-size:7px;color:rgba(198,161,69,.26);
                        letter-spacing:5px;margin-bottom:10px;">
                        &#9670;&nbsp;&#9670;&nbsp;&#9670;
                      </div>

                      <div class="foot-brand"
                        style="font-family:Arial,Helvetica,sans-serif;
                          font-size:9px;letter-spacing:0.24em;
                          text-transform:uppercase;
                          color:rgba(198,161,69,.36);font-weight:700;">
                        Hookah Rental
                      </div>

                      <div class="foot-tag"
                        style="margin-top:4px;
                          font-family:Arial,Helvetica,sans-serif;
                          font-size:10px;color:rgba(255,255,255,.2);
                          line-height:1.5;">
                        Luxury hookah experiences crafted in gold &amp; black
                      </div>

                      <div class="foot-links-wrap" style="margin-top:10px;">
                        <a href="#" class="foot-link"
                          style="font-family:Arial,Helvetica,sans-serif;
                            font-size:9px;color:rgba(255,255,255,.25);
                            text-decoration:none;margin:0 8px;">
                          Privacy
                        </a>
                        <span style="color:rgba(255,255,255,.12);">|</span>
                        <a href="#" class="foot-link"
                          style="font-family:Arial,Helvetica,sans-serif;
                            font-size:9px;color:rgba(255,255,255,.25);
                            text-decoration:none;margin:0 8px;">
                          Terms
                        </a>
                        <span style="color:rgba(255,255,255,.12);">|</span>
                        <a href="#" class="foot-link"
                          style="font-family:Arial,Helvetica,sans-serif;
                            font-size:9px;color:rgba(255,255,255,.25);
                            text-decoration:none;margin:0 8px;">
                          Unsubscribe
                        </a>
                      </div>

                      <div class="foot-copy"
                        style="margin-top:10px;
                          font-family:Arial,Helvetica,sans-serif;
                          font-size:9px;color:rgba(255,255,255,.13);">
                        &copy; ${currentYear} Hookah Rental. All rights reserved.
                      </div>

                    </td>
                  </tr>

                </table>
              </td>
            </tr>
            <!-- end wrap -->
          </table>
          <!-- end 600px container -->
        </td>
      </tr>
    </table>
    <!-- end shell -->

  </body>
</html>`;
}