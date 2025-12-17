import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Preferences } from './preferences.entity';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  avatarUrl?: string;

  @Field()
  isEmailConfirmed: boolean;

  @Field(() => Preferences)
  preferences: Preferences;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
