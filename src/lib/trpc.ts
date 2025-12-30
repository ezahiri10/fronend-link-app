import { createTRPCReact } from '@trpc/react-query';

// @ts-expect-error - AppRouter type will be resolved at runtime from deployed backend
export const trpc = createTRPCReact<any>();
