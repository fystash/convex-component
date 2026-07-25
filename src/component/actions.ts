import { v } from "convex/values";
import { FystashSession } from "@fystash_ai/sdk/session";
import { action } from "./_generated/server.js";
import { internal } from "./_generated/api.js";

function sessionFromArgs(args: {
  roomId: string;
  apiBaseUrl?: string;
  apiKey?: string;
}): FystashSession {
  return new FystashSession(args.roomId, {
    baseUrl: args.apiBaseUrl ?? process.env.FYSTASH_API ?? "https://api.fystash.ai",
    apiKey: args.apiKey ?? process.env.FYSTASH_API_KEY ?? "",
  });
}

export const createRoom = action({
  args: {
    roomId: v.string(),
    apiBaseUrl: v.optional(v.string()),
    apiKey: v.optional(v.string()),
    orgHint: v.optional(v.string()),
  },
  returns: v.any(),
  handler: async (ctx, args) => {
    const session = sessionFromArgs(args);
    const result = await session.create();
    await ctx.runMutation(internal.lib.rememberRoom, {
      roomId: args.roomId,
      agentIds: [],
      orgHint: args.orgHint,
    });
    return result;
  },
});

export const spawn = action({
  args: {
    roomId: v.string(),
    agentId: v.string(),
    guestCid: v.optional(v.number()),
    templateId: v.optional(v.string()),
    memoryMib: v.optional(v.number()),
    apiBaseUrl: v.optional(v.string()),
    apiKey: v.optional(v.string()),
  },
  returns: v.any(),
  handler: async (ctx, args) => {
    const session = sessionFromArgs(args);
    const result = await session.spawn({
      agentId: args.agentId,
      guestCid: args.guestCid,
      templateId: args.templateId,
      memoryMib: args.memoryMib,
    });
    await ctx.runMutation(internal.lib.rememberRoom, {
      roomId: args.roomId,
      agentIds: [args.agentId],
    });
    return result;
  },
});

export const spawnMany = action({
  args: {
    roomId: v.string(),
    agentIds: v.array(v.string()),
    templateId: v.optional(v.string()),
    memoryMib: v.optional(v.number()),
    apiBaseUrl: v.optional(v.string()),
    apiKey: v.optional(v.string()),
  },
  returns: v.any(),
  handler: async (ctx, args) => {
    const session = sessionFromArgs(args);
    const result = await session.spawnMany(args.agentIds, {
      templateId: args.templateId,
      memoryMib: args.memoryMib,
    });
    await ctx.runMutation(internal.lib.rememberRoom, {
      roomId: args.roomId,
      agentIds: args.agentIds,
    });
    return result;
  },
});

export const driveWrite = action({
  args: {
    roomId: v.string(),
    path: v.string(),
    content: v.string(),
    apiBaseUrl: v.optional(v.string()),
    apiKey: v.optional(v.string()),
  },
  returns: v.any(),
  handler: async (_ctx, args) => {
    const session = sessionFromArgs(args);
    return await session.driveWrite(args.path, args.content);
  },
});

export const exec = action({
  args: {
    roomId: v.string(),
    agentId: v.string(),
    argv: v.array(v.string()),
    cwd: v.optional(v.string()),
    timeoutMs: v.optional(v.number()),
    apiBaseUrl: v.optional(v.string()),
    apiKey: v.optional(v.string()),
  },
  returns: v.any(),
  handler: async (_ctx, args) => {
    const session = sessionFromArgs(args);
    return await session.exec(args.agentId, args.argv, {
      cwd: args.cwd,
      timeoutMs: args.timeoutMs,
    });
  },
});

export const destroy = action({
  args: {
    roomId: v.string(),
    apiBaseUrl: v.optional(v.string()),
    apiKey: v.optional(v.string()),
  },
  returns: v.any(),
  handler: async (ctx, args) => {
    const session = sessionFromArgs(args);
    const result = await session.destroy();
    await ctx.runMutation(internal.lib.forgetRoom, { roomId: args.roomId });
    return result;
  },
});

/** One-shot: create room, spawn agents, optional drive write + exec. */
export const runFleet = action({
  args: {
    roomId: v.string(),
    agentIds: v.array(v.string()),
    drivePath: v.optional(v.string()),
    driveContent: v.optional(v.string()),
    execAgentId: v.optional(v.string()),
    execArgv: v.optional(v.array(v.string())),
    destroyAfter: v.optional(v.boolean()),
    apiBaseUrl: v.optional(v.string()),
    apiKey: v.optional(v.string()),
  },
  returns: v.any(),
  handler: async (ctx, args) => {
    const session = sessionFromArgs(args);
    await session.create();
    const spawned = await session.spawnMany(args.agentIds);
    let drive = null;
    if (args.drivePath != null && args.driveContent != null) {
      drive = await session.driveWrite(args.drivePath, args.driveContent);
    }
    let execResult = null;
    if (args.execAgentId && args.execArgv) {
      execResult = await session.exec(args.execAgentId, args.execArgv);
    }
    await ctx.runMutation(internal.lib.rememberRoom, {
      roomId: args.roomId,
      agentIds: args.agentIds,
    });
    let destroyed = null;
    if (args.destroyAfter) {
      destroyed = await session.destroy();
      await ctx.runMutation(internal.lib.forgetRoom, { roomId: args.roomId });
    }
    return { spawned, drive, exec: execResult, destroyed };
  },
});
