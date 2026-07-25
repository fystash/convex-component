import { v } from "convex/values";
import { internalMutation, query } from "./_generated/server.js";

export const listRooms = query({
  args: { limit: v.optional(v.number()) },
  returns: v.array(
    v.object({
      _id: v.id("rooms"),
      _creationTime: v.number(),
      roomId: v.string(),
      orgHint: v.optional(v.string()),
      createdAt: v.number(),
      lastAgentIds: v.array(v.string()),
    }),
  ),
  handler: async (ctx, args) => {
    return await ctx.db.query("rooms").order("desc").take(args.limit ?? 50);
  },
});

export const rememberRoom = internalMutation({
  args: {
    roomId: v.string(),
    agentIds: v.array(v.string()),
    orgHint: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("rooms")
      .withIndex("by_roomId", (q) => q.eq("roomId", args.roomId))
      .unique();
    if (existing) {
      await ctx.db.patch(existing._id, {
        lastAgentIds: args.agentIds,
      });
      return existing._id;
    }
    return await ctx.db.insert("rooms", {
      roomId: args.roomId,
      orgHint: args.orgHint,
      createdAt: Date.now(),
      lastAgentIds: args.agentIds,
    });
  },
});

export const forgetRoom = internalMutation({
  args: { roomId: v.string() },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("rooms")
      .withIndex("by_roomId", (q) => q.eq("roomId", args.roomId))
      .unique();
    if (existing) await ctx.db.delete(existing._id);
  },
});
