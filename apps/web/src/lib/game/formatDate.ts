export const formatDate = (dateString: string) => {
  const date = new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  return date;
};
