// @ts-ignore: allow missing nodemailer type declarations
import nodemailer from 'nodemailer';

const SMTP_HOST = process.env.GMAIL_SMTP_HOST ?? 'smtp.gmail.com';
const SMTP_PORT = Number(process.env.GMAIL_SMTP_PORT ?? '465');

const SMTP_USER = process.env.GMAIL_SMTP_USER; // Gmail address
const SMTP_PASS = process.env.GMAIL_SMTP_PASS; // App password

export function createTransporter() {
  if (!SMTP_USER || !SMTP_PASS) {
    console.warn('[email] SMTP credentials are not configured. Set GMAIL_SMTP_USER and GMAIL_SMTP_PASS.');
    return null;
  }

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
