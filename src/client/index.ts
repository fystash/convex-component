import type {
  GenericActionCtx,
  GenericDataModel,
} from "convex/server";
import type { ComponentApi } from "../component/_generated/component.js";

export type { ComponentApi };

type ActionCtx = Pick<GenericActionCtx<GenericDataModel>, "runAction" | "runQuery">;

/**
 * Typed client for the Fystash Convex component.
 *
 * ```ts
 * import { Fystash } from "@fystash_ai/convex";
 * import { components } from "./_generated/api";
 *
 * const fystash = new Fystash(components.fystash);
 * await fystash.runFleet(ctx, {
 *   roomId: "room-demo",
 *   agentIds: ["scout", "drafter"],
 *   drivePath: "brief.md",
 *   driveContent: "# hello",
 *   execAgentId: "scout",
 *   execArgv: ["cat", "brief.md"],
 *   destroyAfter: true,
 * });
 * ```
 *
 * Set `FYSTASH_API` + `FYSTASH_API_KEY` in the Convex dashboard (or pass per call).
 */
export class Fystash {
  constructor(public component: ComponentApi) {}

  createRoom(
    ctx: ActionCtx,
    args: {
      roomId: string;
      apiBaseUrl?: string;
      apiKey?: string;
      orgHint?: string;
    },
  ) {
    return ctx.runAction(this.component.actions.createRoom, args);
  }

  spawn(
    ctx: ActionCtx,
    args: {
      roomId: string;
      agentId: string;
      guestCid?: number;
      templateId?: string;
      memoryMib?: number;
      apiBaseUrl?: string;
      apiKey?: string;
    },
  ) {
    return ctx.runAction(this.component.actions.spawn, args);
  }

  spawnMany(
    ctx: ActionCtx,
    args: {
      roomId: string;
      agentIds: string[];
      templateId?: string;
      memoryMib?: number;
      apiBaseUrl?: string;
      apiKey?: string;
    },
  ) {
    return ctx.runAction(this.component.actions.spawnMany, args);
  }

  driveWrite(
    ctx: ActionCtx,
    args: {
      roomId: string;
      path: string;
      content: string;
      apiBaseUrl?: string;
      apiKey?: string;
    },
  ) {
    return ctx.runAction(this.component.actions.driveWrite, args);
  }

  exec(
    ctx: ActionCtx,
    args: {
      roomId: string;
      agentId: string;
      argv: string[];
      cwd?: string;
      timeoutMs?: number;
      apiBaseUrl?: string;
      apiKey?: string;
    },
  ) {
    return ctx.runAction(this.component.actions.exec, args);
  }

  destroy(
    ctx: ActionCtx,
    args: { roomId: string; apiBaseUrl?: string; apiKey?: string },
  ) {
    return ctx.runAction(this.component.actions.destroy, args);
  }

  runFleet(
    ctx: ActionCtx,
    args: {
      roomId: string;
      agentIds: string[];
      drivePath?: string;
      driveContent?: string;
      execAgentId?: string;
      execArgv?: string[];
      destroyAfter?: boolean;
      apiBaseUrl?: string;
      apiKey?: string;
    },
  ) {
    return ctx.runAction(this.component.actions.runFleet, args);
  }

  listRooms(ctx: { runQuery: ActionCtx["runQuery"] }, args?: { limit?: number }) {
    return ctx.runQuery(this.component.lib.listRooms, args ?? {});
  }
}

export default Fystash;
