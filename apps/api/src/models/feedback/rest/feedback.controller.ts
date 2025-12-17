import {
  Controller,
  Get,
  Post,
  Body,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { FeedbackService } from '../feedback.service';
import { ApiOkResponse, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Feedback } from './entities/feedback.entity';
import { CreateFeedbackDto } from './dtos/create-feedback.dto';

@ApiTags('Feedback')
@Controller('feedback')
@UsePipes(new ValidationPipe())
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Get()
  @ApiOkResponse({
    description: 'Get all feedbacks',
    type: [Feedback],
  })
  async getFeedbacks() {
    return this.feedbackService.getFeedbacks();
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Submit feedback and send email notification',
    type: Object,
  })
  async submitFeedback(@Body() createFeedbackDto: CreateFeedbackDto) {
    return this.feedbackService.submitFeedback(
      createFeedbackDto.recipient,
      createFeedbackDto.content
    );
  }
}
