export const throwIfNotApiToken = (token: string | null | undefined) => {
  if (token === process.env.API_TOKEN_INBOUND) {
    return;
  }

  throw new Error(`Inbound API token mismatch (Received: ${token})`);
};
