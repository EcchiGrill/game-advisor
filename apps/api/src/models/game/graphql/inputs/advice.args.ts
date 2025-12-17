import { ArgsType, Field, registerEnumType } from '@nestjs/graphql';
import { AIValue } from '../../rest/dtos/advice.body.dto';

registerEnumType(AIValue, {
  name: 'AIValue',
  description: 'AI provider to use for game advice',
});

@ArgsType()
export class AdviceGameArgs {
  @Field(() => String)
  prompt: string;

  @Field(() => AIValue, { nullable: true })
  ai?: AIValue;
}
