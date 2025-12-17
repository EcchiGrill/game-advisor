import { Preferences } from 'src/types/user/preferences';
import { normalizeGame } from '../game/normalizeGame';
import { UserToSanitize, UserWithPreferences } from 'src/types/user/user';

export const normalizeUser = (user: UserToSanitize): UserWithPreferences => {
  const normalizedPreferences: Preferences = {
    platforms: user.preferences.platforms.map((platform) => platform.name),
    favoriteGames: user.preferences.favoriteGames.map(normalizeGame),
    completedGames: user.preferences.completedGames.map(normalizeGame),
    chosenGames: user.preferences.chosenGames.map(normalizeGame),
    bannedGames: user.preferences.bannedGames.map(normalizeGame),
  };

  const {
    password: _password,
    passwordResetToken: _resetToken,
    passwordResetExpiry: _resetExpiry,
    emailConfirmToken: _confirmToken,
    ...sanitized
  } = user;

  return {
    ...sanitized,
    preferences: normalizedPreferences,
  };
};
