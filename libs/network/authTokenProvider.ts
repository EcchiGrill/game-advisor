export type TokenProvider = () => Promise<string | null>;

let provider: TokenProvider | null = null;

export const setTokenProvider = (p: TokenProvider) => {
  provider = p;
};

export const getToken = async () => (provider ? provider() : null);
