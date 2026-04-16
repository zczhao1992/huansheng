import { createTRPCRouter } from "../init";
import { voicesRouter } from "./voices";
import { generationsRouter } from "./generations";

export const appRouter = createTRPCRouter({
  voices: voicesRouter,
  generations: generationsRouter,
});

export type AppRouter = typeof appRouter;
