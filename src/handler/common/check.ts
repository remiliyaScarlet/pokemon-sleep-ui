export const throwIfNotInboundApiToken = (token: string | null | undefined) => {
  if (token === process.env.API_TOKEN_INBOUND) {
    return;
  }

  throw new Error(`Inbound API token mismatch (Received: ${token})`);
};

export const throwIfNotOutboundApiToken = (token: string | null | undefined) => {
  if (token === process.env.API_TOKEN_OUTBOUND) {
    return;
  }

  throw new Error(`Outbound API token mismatch (Received: ${token})`);
};
