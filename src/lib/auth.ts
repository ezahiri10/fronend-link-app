import { createAuthClient } from "better-auth/react";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000/trpc";
const baseURL = apiUrl.replace('/trpc', '');

export const authClient = createAuthClient({
  baseURL: baseURL,
});

export const { signIn, signUp, signOut, useSession } = authClient;
