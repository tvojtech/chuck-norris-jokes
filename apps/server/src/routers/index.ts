import type { Joke } from "@/types";
import { publicProcedure, router } from "../lib/trpc";
import { env } from "@/env";
import z from "zod";
import { delay } from "@/utils";

export const appRouter = router({
  jokeCategories: publicProcedure.query(async () => {
    await delay();
    const apiBase = env.API_BASE;
    const response = await fetch(`${apiBase}/jokes/categories`);
    if (response.ok) {
      return (await response.json()) as string[];
    }
    throw Error(response.statusText, { cause: response.status });
  }),
  joke: publicProcedure
    .input(
      z.object({
        search: z.string().optional(),
        category: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      await delay();
      const apiBase = env.API_BASE;
      const params = new URLSearchParams();

      if (input.search) {
        input.search && params.append("query", input.search);
        const response = await fetch(
          `${apiBase}/jokes/search?${params.toString()}`
        );
        if (response.ok) {
          const body = (await response.json()).result as Joke[];
          return body.length ? body[0] : null;
        }
        throw Error(response.statusText, { cause: response.status });
      } else {
        input.category && params.append("category", input.category);
        const response = await fetch(
          `${apiBase}/jokes/random?${params.toString()}`
        );
        if (response.ok) {
          return (await response.json()) as Joke;
        }
        throw Error(response.statusText, { cause: response.status });
      }
    }),
});
export type AppRouter = typeof appRouter;
