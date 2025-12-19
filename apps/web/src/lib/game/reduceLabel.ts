export const reduceLabel = (label: string, maxLength: number) => {
  return label.length > maxLength ? label.slice(0, maxLength) + '...' : label;
};
