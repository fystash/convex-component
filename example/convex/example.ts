/**
 * Demo app for @fystash_ai/convex.
 * Set FYSTASH_API + FYSTASH_API_KEY on the Convex deployment.
 */
import { action, query } from "./_generated/server";
import { components } from "./_generated/api";
import { Fystash } from "../../src/client/index.js";
import { v } from "convex/values";

const fystash = new Fystash(components.fystash);

export const listRooms = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    return await fystash.listRooms(ctx, { limit: args.limit });
  },
});

export const helloFleet = action({
  args: { roomId: v.string() },
  handler: async (ctx, { roomId }) => {
    // Drive write is verified via control-plane API response.
    // Guest /mnt/drive can ESTALE on some hosts; prove exec with /bin/echo.
    return await fystash.runFleet(ctx, {
      roomId,
      agentIds: ["scout"],
      drivePath: "hello.txt",
      driveContent: "many agents, one workspace\n",
      execAgentId: "scout",
      execArgv: ["/bin/echo", "many agents, one workspace"],
      destroyAfter: true,
    });
  },
});
