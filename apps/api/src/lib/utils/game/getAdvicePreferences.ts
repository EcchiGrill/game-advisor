interface GetAdvicePreferencesArgs {
  platforms?: string[];
  favoriteGames?: string[];
  completedGames?: string[];
  bannedGames?: string[];
}

export const getAdvicePreferences = ({
  platforms,
  favoriteGames,
  completedGames,
  bannedGames,
}: GetAdvicePreferencesArgs) => {
  const promptPreferences = `    
  ${platforms?.length > 0 ? `- Preferred Platforms: ${platforms.join(', ')}` : ''}
  ${favoriteGames?.length > 0 ? `- Favorite games: ${favoriteGames.join(', ')}` : ''}
  ${completedGames?.length > 0 ? `- Completed games: ${completedGames.join(', ')}` : ''}
  ${bannedGames?.length > 0 ? `- Banned games: ${bannedGames.join(', ')}` : ''}`;

  return promptPreferences;
};
