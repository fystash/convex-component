import { defineApp } from "convex/server";
import { v } from "convex/values";
import fystash from "../../src/component/convex.config.js";

const app = defineApp({
  env: {
    FYSTASH_API: v.optional(v.string()),
    FYSTASH_API_KEY: v.optional(v.string()),
  },
});

app.use(fystash, {
  env: {
    FYSTASH_API: app.env.FYSTASH_API,
    FYSTASH_API_KEY: app.env.FYSTASH_API_KEY,
  },
});

export default app;
