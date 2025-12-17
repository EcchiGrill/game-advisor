import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, MinLength, IsEmail } from 'class-validator';

@InputType()
export class SubmitFeedbackInput {
  @Field()
  @IsEmail()
  @IsNotEmpty()
  recipient: string;

  @Field()
  @IsNotEmpty()
  @MinLength(10)
  content: string;
}
