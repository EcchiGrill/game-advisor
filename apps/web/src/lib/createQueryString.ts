export const createQueryString = (
  name: string,
  value: string,
  searchParams?: URLSearchParams | string | null
) => {
  const params = new URLSearchParams(searchParams?.toString());
  params.set(name, value);
  return params.toString();
};
