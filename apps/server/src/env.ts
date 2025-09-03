import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    CORS_ORIGIN: z.url(),
    API_BASE: z.httpUrl(),
  },

  runtimeEnv: process.env,

  emptyStringAsUndefined: true,
});
