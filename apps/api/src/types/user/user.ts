import { Preferences, RawPreferences } from './preferences';
import { User } from '@prisma/client';

export interface UserWithPreferences
  extends Omit<
    User,
    | 'password'
    | 'passwordResetToken'
    | 'passwordResetExpiry'
    | 'emailConfirmToken'
    | 'tokenVersion'
    | 'avatarUrl'
  > {
  avatarUrl?: string;
  preferences: Preferences;
}

export interface UserToSanitize
  extends Omit<
    User,
    | 'password'
    | 'passwordResetToken'
    | 'passwordResetExpiry'
    | 'emailConfirmToken'
    | 'tokenVersion'
  > {
  password?: string;
  passwordResetToken?: string;
  passwordResetExpiry?: Date;
  emailConfirmToken?: string;
  preferences: RawPreferences;
}
