import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(private readonly configService: ConfigService) {}

  emailTransport() {
    const transport = nodemailer.createTransport({
      host: this.configService.get<string>('EMAIL_HOST'),
      port: this.configService.get<number>('EMAIL_PORT'),
      secure: false,
      logger: true,
      debug: true,

      auth: {
        user: this.configService.get<string>('GMAIL_USER'),
        pass: this.configService.get<string>('GMAIL_APP_PASSWORD'),
      },
    });

    return transport;
  }

  async sendEmailConfirmation(
    email: string,
    username: string,
    confirmToken: string
  ): Promise<void> {
    const confirmUrl = `${process.env.FRONTEND_URL}/confirm-email?token=${confirmToken}`;
    const messageId = `<${Date.now()}-@game-advisor>`;

    const mailOptions: nodemailer.SendMailOptions = {
      from: `"Game Advisor" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'Confirm Your Email - Game Advisor 🎮',
      messageId,
      headers: {
        'Message-ID': messageId,
        Precedence: 'bulk',
        'X-Mailer': 'Game Advisor',
        'X-Auto-Response-Suppress': 'All',
      },
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta name="color-scheme" content="dark">
          <meta name="supported-color-schemes" content="dark">
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0f0f0f; color: #ffffff; margin: 0; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px; padding: 40px; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4); }
            .header { text-align: center; margin-bottom: 30px; }
            .header h1 { color: #8b5cf6; margin: 0; font-size: 28px; }
            .content { line-height: 1.6; color: #ffffff; }
            .highlight { color: #8b5cf6; font-weight: 600; }
            .button { display: inline-block; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white !important; padding: 14px 32px; text-decoration: none !important; border-radius: 8px; font-weight: 600; margin: 20px 0; }
            .warning { background: rgba(251, 191, 36, 0.1); border-left: 4px solid #fbbf24; padding: 12px 16px; margin: 20px 0; border-radius: 0 8px 8px 0; color: #ffffff; }
          </style>
        </head>
        <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0f0f0f; color: #ffffff !important; margin: 0; padding: 20px;">
          <div class="container" style="max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px; padding: 40px; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);">
            <div class="header" style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #8b5cf6; margin: 0; font-size: 28px;">🎮 Game Advisor</h1>
            </div>
            <div class="content" style="line-height: 1.6; color: #ffffff !important;">
              <p style="color: #ffffff !important; margin: 0 0 16px 0;">Hey <span style="color: #8b5cf6 !important; font-weight: 600;">${username}</span>! 👋</p>
              <p style="color: #ffffff !important; margin: 0 0 16px 0;">Thanks for signing up for <strong style="color: #ffffff !important;">Game Advisor</strong>! Please confirm your email address to activate your account.</p>
              <p style="text-align: center; margin: 20px 0;">
                <a href="${confirmUrl}" class="button" style="display: inline-block; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: #ffffff !important; padding: 14px 32px; text-decoration: none !important; border-radius: 8px; font-weight: 600; margin: 20px 0; -webkit-text-fill-color: #ffffff !important;"><span style="color: #ffffff !important; -webkit-text-fill-color: #ffffff !important;">✓ Confirm Email</span></a>
              </p>
              <div class="warning" style="background: rgba(251, 191, 36, 0.1); border-left: 4px solid #fbbf24; padding: 12px 16px; margin: 20px 0; border-radius: 0 8px 8px 0; color: #ffffff !important;">
                <strong style="color: #ffffff !important;">⚠️ Note:</strong> <span style="color: #ffffff !important;">This link will expire in 24 hours. If you didn't create an account, you can safely ignore this email.</span>
              </div>
              <p style="color: #ffffff !important; margin: 16px 0;">If the button above doesn't work, copy and paste this link into your browser:</p>
              <p style="word-break: break-all; color: #10b981 !important; margin: 0;">${confirmUrl}</p>
            </div>
               <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-top:30px; width: 100%; min-height: 40px;">
              <tr>
                <td
                  align="center"
                  style="
                    padding:20px 0 10px 0;
                    border-top:1px solid #333;
                    font-size:12px;
                    color:#c0c0c0;
                    line-height:1.5;
                    -webkit-text-fill-color:#c0c0c0;
                  "
                >
                  <p style="margin:0; padding:0;">
                    © ${new Date().getFullYear()} Game Advisor. All rights reserved.
                  </p>
                </td>
              </tr>
            </table>
          </div>
        </body>
        </html>
      `,
    };

    await this.emailTransport().sendMail(mailOptions);
  }

  async sendPasswordResetEmail(
    email: string,
    resetToken: string
  ): Promise<void> {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
    const messageId = `<${Date.now()}-@game-advisor>`;

    const mailOptions: nodemailer.SendMailOptions = {
      from: `"Game Advisor" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'Password Reset Request',
      messageId,
      headers: {
        'Message-ID': messageId,
        Precedence: 'bulk',
        'X-Mailer': 'Game Advisor',
        'X-Auto-Response-Suppress': 'All',
      },
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta name="color-scheme" content="dark">
          <meta name="supported-color-schemes" content="dark">
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0f0f0f; color: #ffffff; margin: 0; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px; padding: 40px; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4); }
            .header { text-align: center; margin-bottom: 30px; }
            .header h1 { color: #8b5cf6; margin: 0; font-size: 28px; }
            .content { line-height: 1.6; color: #ffffff; }
            .button { display: inline-block; background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%); color: white !important; padding: 14px 32px; text-decoration: none !important; border-radius: 8px; font-weight: 600; margin: 20px 0; transition: transform 0.2s; }
            .button:hover { transform: translateY(-2px); }
            .warning { background: rgba(251, 191, 36, 0.1); border-left: 4px solid #fbbf24; padding: 12px 16px; margin: 20px 0; border-radius: 0 8px 8px 0; color: #ffffff; }
          </style>
        </head>
        <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0f0f0f; color: #ffffff !important; margin: 0; padding: 20px;">
          <div class="container" style="max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px; padding: 40px; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);">
            <div class="header" style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #8b5cf6; margin: 0; font-size: 28px;">🎮 Game Advisor</h1>
            </div>
            <div class="content" style="line-height: 1.6; color: #ffffff !important;">
              <p style="color: #ffffff !important; margin: 0 0 16px 0;">Hello,</p>
              <p style="color: #ffffff !important; margin: 0 0 16px 0;">We received a request to reset your password for your Game Advisor account.</p>
              <p style="text-align: center; margin: 20px 0;">
                <a href="${resetUrl}" class="button" style="display: inline-block; background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%); color: #ffffff !important; padding: 14px 32px; text-decoration: none !important; border-radius: 8px; font-weight: 600; margin: 20px 0; -webkit-text-fill-color: #ffffff !important;"><span style="color: #ffffff !important; -webkit-text-fill-color: #ffffff !important;">Reset Password</span></a>
              </p>
              <div class="warning" style="background: rgba(251, 191, 36, 0.1); border-left: 4px solid #fbbf24; padding: 12px 16px; margin: 20px 0; border-radius: 0 8px 8px 0; color: #ffffff !important;">
                <strong style="color: #ffffff !important;">⚠️ Important:</strong> <span style="color: #ffffff !important;">This link will expire in 1 hour. If you didn't request this password reset, please ignore this email.</span>
              </div>
              <p style="color: #ffffff !important; margin: 16px 0;">If the button above doesn't work, copy and paste this link into your browser:</p>
              <p style="word-break: break-all; color: #8b5cf6 !important; margin: 0;">${resetUrl}</p>
            </div>
             <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-top:30px; width: 100%; min-height: 40px;">
              <tr>
                <td
                  align="center"
                  style="
                    padding:20px 0 10px 0;
                    border-top:1px solid #333;
                    font-size:12px;
                    color:#c0c0c0;
                    line-height:1.5;
                    -webkit-text-fill-color:#c0c0c0;
                  "
                >
                  <p style="margin:0; padding:0;">
                    © ${new Date().getFullYear()} Game Advisor. All rights reserved.
                  </p>
                </td>
              </tr>
            </table>
          </div>
        </body>
        </html>
      `,
    };

    await this.emailTransport().sendMail(mailOptions);
  }

  async sendWelcomeEmail(email: string, username: string): Promise<void> {
    const messageId = `<${Date.now()}-@game-advisor>`;

    const mailOptions: nodemailer.SendMailOptions = {
      from: `"Game Advisor" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'Welcome to Game Advisor! 🎮',
      messageId,
      headers: {
        'Message-ID': messageId,
        Precedence: 'bulk',
        'X-Mailer': 'Game Advisor',
        'X-Auto-Response-Suppress': 'All',
      },
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta name="color-scheme" content="dark">
          <meta name="supported-color-schemes" content="dark">
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0f0f0f; color: #ffffff; margin: 0; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px; padding: 40px; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4); }
            .header { text-align: center; margin-bottom: 30px; }
            .header h1 { color: #8b5cf6; margin: 0; font-size: 28px; }
            .content { line-height: 1.6; color: #ffffff; }
            .highlight { color: #8b5cf6; font-weight: 600; }
            .features { background: rgba(139, 92, 246, 0.1); border-radius: 8px; padding: 20px; margin: 20px 0; color: #ffffff; }
            .features ul { margin: 0; padding-left: 20px; }
            .features li { margin: 8px 0, color: #ffffff !important; }
            .button { display: inline-block; background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%); color: #ffffff !important; padding: 14px 32px; text-decoration: none !important; border-radius: 8px; font-weight: 600; margin: 20px 0; }
          </style>
        </head>
        <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0f0f0f; color: #ffffff; margin: 0; padding: 20px;">
          <div class="container" style="max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px; padding: 40px; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);">
            <div class="header" style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #8b5cf6; margin: 0; font-size: 28px;">🎮 Game Advisor</h1>
            </div>
            <div class="content" style="line-height: 1.6; color: #ffffff !important;">
              <p style="color: #ffffff margin: 0 0 16px 0;">Hey <span style="color: #8b5cf6 font-weight: 600;">${username}</span>! 👋</p>
              <p style="color: #ffffff margin: 0 0 16px 0;">Welcome to <strong style="color: #ffffff">Game Advisor</strong> — your AI-powered companion for discovering the perfect games!</p>
              <div class="features" style="background: rgba(139, 92, 246, 0.1); border-radius: 8px; padding: 20px; margin: 20px 0; color: #ffffff">
                <p style="color: #ffffff !important; margin: 0 0 12px 0;"><strong style="color: #ffffff">What you can do:</strong></p>
                <ul style="margin: 0; padding-left: 20px; color: #ffffff">
                  <li>🤖 Get personalized game recommendations powered by AI</li>
                  <li>📚 Browse our extensive game catalog</li>
                  <li>⭐ Save your favorite games</li>
                  <li>🎯 Track your completed games</li>
                </ul>
              </div>
              <p style="text-align: center; margin: 20px 0;">
                <a href="${process.env.FRONTEND_URL}" class="button" style="display: inline-block; background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%); color: #ffffff !important; padding: 14px 32px; text-decoration: none !important; border-radius: 8px; font-weight: 600; margin: 20px 0; -webkit-text-fill-color: #ffffff !important;"><span style="color: #ffffff !important; -webkit-text-fill-color: #ffffff !important;">Start Exploring</span></a>
              </p>
              <p style="color: #ffffff margin: 16px 0 0 0;">Happy gaming! 🚀</p>
            </div>
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-top:30px; width: 100%; min-height: 40px;">
              <tr>
                <td
                  align="center"
                  style="
                    padding:20px 0 10px 0;
                    border-top:1px solid #333;
                    font-size:12px;
                    color:#c0c0c0;
                    line-height:1.5;
                    -webkit-text-fill-color:#c0c0c0;
                  "
                >
                  <p style="margin:0; padding:0;">
                    © ${new Date().getFullYear()} Game Advisor. All rights reserved.
                  </p>
                </td>
              </tr>
            </table>
          </div>
        </body>
        </html>
      `,
    };

    await this.emailTransport().sendMail(mailOptions);
  }

  async sendFeedbackEmail(recipient: string, content: string): Promise<void> {
    const messageId = `<${Date.now()}-feedback-@game-advisor>`;

    const mailOptions: nodemailer.SendMailOptions = {
      from: `"Game Advisor" <${process.env.GMAIL_USER}>`,
      to: process.env.FEEDBACK_RECEIVER,
      subject: 'New Feedback Received - Game Advisor 📝',
      messageId,
      headers: {
        'Message-ID': messageId,
        Precedence: 'bulk',
        'X-Mailer': 'Game Advisor',
        'X-Auto-Response-Suppress': 'All',
      },
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta name="color-scheme" content="dark">
          <meta name="supported-color-schemes" content="dark">
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0f0f0f; color: #ffffff; margin: 0; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px; padding: 40px; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4); }
            .header { text-align: center; margin-bottom: 30px; }
            .header h1 { color: #8b5cf6; margin: 0; font-size: 28px; }
            .content { line-height: 1.6; color: #ffffff; }
            .highlight { color: #8b5cf6; font-weight: 600; }
            .feedback-box { background: rgba(139, 92, 246, 0.1); border-radius: 8px; padding: 20px; margin: 20px 0; border-left: 4px solid #8b5cf6; }
            .recipient { color: #10b981; font-weight: 600; }
            .timestamp { color: #c0c0c0; font-size: 12px; margin-top: 10px; }
          </style>
        </head>
        <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0f0f0f; color: #ffffff !important; margin: 0; padding: 20px;">
          <div class="container" style="max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px; padding: 40px; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);">
            <div class="header" style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #8b5cf6; margin: 0; font-size: 28px;">🎮 Game Advisor</h1>
              <p style="color: #c0c0c0; margin: 5px 0 0 0; font-size: 14px;">New Feedback Received</p>
            </div>
            <div class="content" style="line-height: 1.6; color: #ffffff !important;">
              <p style="color: #ffffff !important; margin: 0 0 16px 0;">You have received new feedback from a user:</p>

              <div class="feedback-box" style="background: rgba(139, 92, 246, 0.1); border-radius: 8px; padding: 20px; margin: 20px 0; border-left: 4px solid #8b5cf6;">
                <p style="color: #ffffff !important; margin: 0 0 12px 0;"><strong style="color: #ffffff">From:</strong> <span class="recipient" style="color: #10b981; font-weight: 600;">${recipient}</span></p>
                <p style="color: #ffffff !important; margin: 0 0 12px 0;"><strong style="color: #ffffff">Message:</strong></p>
                <p style="color: #ffffff !important; margin: 0; white-space: pre-wrap;">${content}</p>
              </div>

              <div class="timestamp" style="color: #c0c0c0; font-size: 12px; margin-top: 10px;">
                Received at: ${new Date().toLocaleString()}
              </div>
            </div>
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-top:30px; width: 100%; min-height: 40px;">
              <tr>
                <td
                  align="center"
                  style="
                    padding:20px 0 10px 0;
                    border-top:1px solid #333;
                    font-size:12px;
                    color:#c0c0c0;
                    line-height:1.5;
                    -webkit-text-fill-color:#c0c0c0;
                  "
                >
                  <p style="margin:0; padding:0;">
                    © ${new Date().getFullYear()} Game Advisor. All rights reserved.
                  </p>
                </td>
              </tr>
            </table>
          </div>
        </body>
        </html>
      `,
    };

    await this.emailTransport().sendMail(mailOptions);
  }
}
