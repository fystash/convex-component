import { defineComponent } from "convex/server";
import { v } from "convex/values";

export default defineComponent("fystash", {
  env: {
    FYSTASH_API: v.optional(v.string()),
    FYSTASH_API_KEY: v.optional(v.string()),
  },
});
