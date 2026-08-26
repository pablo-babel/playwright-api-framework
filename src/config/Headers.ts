export const Headers = {
  json: {
    "Content-Type": "application/json",
  },

  auth: (token: string) => ({
    Cookie: `token=${token}`,
  }),
};
