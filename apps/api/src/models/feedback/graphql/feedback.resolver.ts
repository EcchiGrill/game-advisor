import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { FeedbackService } from '../feedback.service';
import { SubmitFeedbackInput } from './inputs/submit-feedback.input';
import { Feedback } from './entities/feedback.entity';

@Resolver()
export class FeedbackResolver {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Mutation(() => String)
  async submitFeedback(
    @Args('input') input: SubmitFeedbackInput
  ): Promise<string> {
    const result = await this.feedbackService.submitFeedback(
      input.recipient,
      input.content
    );
    return result.message;
  }

  @Query(() => [Feedback])
  async feedbacks() {
    return this.feedbackService.getFeedbacks();
  }
}
