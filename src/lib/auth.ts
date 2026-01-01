import { createAuthClient } from "better-auth/react";

const baseURL = import.meta.env.VITE_API_URL?.replace('/trpc', '') || "http://localhost:3000";

export const authClient = createAuthClient({
  baseURL: baseURL,
  fetchOptions: {
    credentials: "include",
  },
});

export const { signIn, signUp, signOut, useSession } = authClient;
