import nodemailer from 'nodemailer'
import { getSmtpSettings, smtpIsComplete, type SmtpSettings } from '@/lib/settings'

/**
 * Outbound email through the owner's own SMTP credentials (saved in the admin).
 * A fresh transport per send keeps this stateless — password resets are rare, so
 * connection reuse isn't worth the lifecycle management on serverless.
 */

export class MailNotConfiguredError extends Error {
  constructor() {
    super(
      'Email sending is not configured yet. Taroon can add SMTP details in Admin → SMTP settings.',
    )
    this.name = 'MailNotConfiguredError'
  }
}

function transportFor(settings: SmtpSettings) {
  return nodemailer.createTransport({
    host: settings.host,
    port: settings.port,
    secure: settings.secure,
    auth: settings.user ? { user: settings.user, pass: settings.pass } : undefined,
    connectionTimeout: 12000,
    greetingTimeout: 8000,
    socketTimeout: 20000,
  })
}

export async function sendMail(message: {
  to: string
  subject: string
  text: string
  html?: string
}): Promise<void> {
  const settings = await getSmtpSettings()
  if (!smtpIsComplete(settings)) throw new MailNotConfiguredError()

  const transport = transportFor(settings!)
  const from = settings!.fromName
    ? `"${settings!.fromName}" <${settings!.fromEmail}>`
    : settings!.fromEmail

  await transport.sendMail({ from, ...message })
}
