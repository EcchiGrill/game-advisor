import { Module } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { FeedbackResolver } from './graphql/feedback.resolver';
import { FeedbackController } from './rest/feedback.controller';
import { MailModule } from '../../mail/mail.module';

@Module({
  imports: [MailModule],
  controllers: [FeedbackController],
  providers: [FeedbackResolver, FeedbackService],
})
export class FeedbackModule {}
