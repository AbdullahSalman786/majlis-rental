# Task Progress

## Fix "Please check your details and try again" error

### Steps

- [x] Create `server/.env` with `CONTACT_ADMIN_EMAIL` and SMTP credentials (completed earlier)
- [x] Improve error handling in `src/pages/ContactPage.tsx` to show specific error messages
  - [x] Detect when server is unreachable / returns non-JSON → shows "Cannot connect to the server. Please ensure the backend is running."
  - [x] Shows actual server error messages when available (e.g., "Mail recipient is not configured yet.")
  - [x] Shows field-level validation errors from the backend

## Fix email sending issues in templates.ts

### Steps

- [x] Fix incorrect regex in `sanitizeString` (`\\s+` → `\s+`) in `send-contact.ts`
- [x] Add `generateRefCode()` function to create unique reservation reference codes
- [x] Fix `renderClientConfirmationEmail()` call - was passing `OWNER_NAME` instead of `refCode`
- [x] Add reference code to admin email subject line and text body
- [x] Add reference code to client confirmation email subject and text body
- [x] Add `X-Ref-Code` header to admin email for tracking
