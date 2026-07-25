import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

/** Lightweight room bookkeeping inside the host Convex app. */
export default defineSchema({
  rooms: defineTable({
    roomId: v.string(),
    orgHint: v.optional(v.string()),
    createdAt: v.number(),
    lastAgentIds: v.array(v.string()),
  }).index("by_roomId", ["roomId"]),
});
