import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name)
  private readonly fromEmail = process.env.SENDGRID_FROM_EMAIL ?? 'noreply@obraja.com.br'
  private readonly frontendUrl = process.env.FRONTEND_URL ?? 'https://divixstudio.io'

  async sendPasswordReset(to: string, name: string, rawToken: string): Promise<void> {
    const resetUrl = `${this.frontendUrl}/reset-password?token=${rawToken}`
    const subject = 'Recuperação de senha — ObraJá'
    const html = this.buildPasswordResetHtml(name, resetUrl)

    await this.send(to, subject, html)
  }

  async sendPasswordChanged(to: string, name: string): Promise<void> {
    const subject = 'Sua senha foi alterada — ObraJá'
    const html = `
      <p>Olá, <strong>${name}</strong></p>
      <p>Sua senha foi alterada com sucesso.</p>
      <p>Se você não realizou esta alteração, entre em contato imediatamente.</p>
      <p><a href="${this.frontendUrl}/login">Acessar minha conta</a></p>
    `
    await this.send(to, subject, html)
  }

  private async send(to: string, subject: string, html: string): Promise<void> {
    const apiKey = process.env.SENDGRID_API_KEY
    if (!apiKey) {
      this.logger.warn(`[EMAIL não enviado — SENDGRID_API_KEY não configurado]\nPara: ${to}\nAssunto: ${subject}`)
      return
    }

    try {
      const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalizations: [{ to: [{ email: to }] }],
          from: { email: this.fromEmail, name: 'ObraJá' },
          subject,
          content: [{ type: 'text/html', value: html }],
        }),
      })

      if (!res.ok) {
        const body = await res.text()
        this.logger.error(`[EmailService] SendGrid ${res.status}: ${body}`)
      }
    } catch (err) {
      this.logger.error('[EmailService] Falha ao enviar e-mail:', err)
    }
  }

  private buildPasswordResetHtml(name: string, resetUrl: string): string {
    return `
      <!DOCTYPE html>
      <html>
      <body style="font-family:Arial,sans-serif;background:#f5f5f5;padding:40px 0;">
        <div style="max-width:480px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
          <div style="background:#1A1A1A;padding:24px 32px;">
            <span style="font-size:22px;font-weight:900;color:#fff;">Obra<span style="color:#F05A28;">Já</span></span>
          </div>
          <div style="padding:32px;">
            <p style="color:#1A1A1A;margin:0 0 16px;">Olá, <strong>${name}</strong></p>
            <p style="color:#555;margin:0 0 24px;">Recebemos uma solicitação para redefinir sua senha. Clique no botão abaixo para criar uma nova senha:</p>
            <a href="${resetUrl}"
               style="display:inline-block;background:#F05A28;color:#fff;font-weight:700;text-decoration:none;padding:14px 28px;border-radius:12px;font-size:15px;">
              Redefinir minha senha
            </a>
            <p style="color:#9E9E9E;font-size:13px;margin:24px 0 0;">
              Este link expira em <strong>1 hora</strong> e pode ser utilizado apenas uma vez.<br>
              Se você não solicitou esta alteração, ignore este e-mail com segurança.
            </p>
          </div>
        </div>
      </body>
      </html>
    `
  }
}
