import nodemailer from 'nodemailer';

const SMTP_HOST = process.env.GMAIL_SMTP_HOST ?? 'smtp.gmail.com';
const SMTP_PORT = Number(process.env.GMAIL_SMTP_PORT ?? '465');

const SMTP_USER = process.env.GMAIL_SMTP_USER; // Gmail address
const SMTP_PASS = process.env.GMAIL_SMTP_PASS; // App password

if (!SMTP_USER || !SMTP_PASS) {
  // Fail fast at server start (still safe: doesn't leak credentials)
  throw new Error('Missing Gmail SMTP credentials. Set GMAIL_SMTP_USER and GMAIL_SMTP_PASS.');
}

export function createTransporter() {
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: true,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
}
