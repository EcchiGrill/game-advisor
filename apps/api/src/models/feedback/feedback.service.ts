import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { MailService } from '../../mail/mail.service';

@Injectable()
export class FeedbackService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailService: MailService
  ) {}

  async submitFeedback(
    recipient: string,
    content: string
  ): Promise<{ message: string }> {
    await this.prisma.feedback.create({
      data: {
        recipient,
        content,
      },
    });

    await this.mailService.sendFeedbackEmail(recipient, content);

    return { message: 'Feedback submitted successfully' };
  }

  async getFeedbacks() {
    const feedbacks = this.prisma.feedback.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return feedbacks;
  }
}
