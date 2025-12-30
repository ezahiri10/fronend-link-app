import { createAuthClient } from "better-auth/react";

const baseURL = "https://backend-link-app-production.up.railway.app";

export const authClient = createAuthClient({
  baseURL: baseURL,
  fetchOptions: {
    credentials: "include",
  },
});

export const { signIn, signUp, signOut, useSession } = authClient;
