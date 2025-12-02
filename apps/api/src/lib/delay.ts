/**
 * Delays the execution of the code for a given number of milliseconds.
 * @param ms - The number of milliseconds to delay.
 * @returns A promise that resolves after the given number of milliseconds.
 */
export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
