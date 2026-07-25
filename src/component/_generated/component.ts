/* eslint-disable */
/**
 * Generated `ComponentApi` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type { FunctionReference } from "convex/server";

/**
 * A utility for referencing a Convex component's exposed API.
 *
 * Useful when expecting a parameter like `components.myComponent`.
 * Usage:
 * ```ts
 * async function myFunction(ctx: QueryCtx, component: ComponentApi) {
 *   return ctx.runQuery(component.someFile.someQuery, { ...args });
 * }
 * ```
 */
export type ComponentApi<Name extends string | undefined = string | undefined> =
  {
    actions: {
      createRoom: FunctionReference<
        "action",
        "internal",
        {
          apiBaseUrl?: string;
          apiKey?: string;
          orgHint?: string;
          roomId: string;
        },
        any,
        Name
      >;
      destroy: FunctionReference<
        "action",
        "internal",
        { apiBaseUrl?: string; apiKey?: string; roomId: string },
        any,
        Name
      >;
      driveWrite: FunctionReference<
        "action",
        "internal",
        {
          apiBaseUrl?: string;
          apiKey?: string;
          content: string;
          path: string;
          roomId: string;
        },
        any,
        Name
      >;
      exec: FunctionReference<
        "action",
        "internal",
        {
          agentId: string;
          apiBaseUrl?: string;
          apiKey?: string;
          argv: Array<string>;
          cwd?: string;
          roomId: string;
          timeoutMs?: number;
        },
        any,
        Name
      >;
      runFleet: FunctionReference<
        "action",
        "internal",
        {
          agentIds: Array<string>;
          apiBaseUrl?: string;
          apiKey?: string;
          destroyAfter?: boolean;
          driveContent?: string;
          drivePath?: string;
          execAgentId?: string;
          execArgv?: Array<string>;
          roomId: string;
        },
        any,
        Name
      >;
      spawn: FunctionReference<
        "action",
        "internal",
        {
          agentId: string;
          apiBaseUrl?: string;
          apiKey?: string;
          guestCid?: number;
          memoryMib?: number;
          roomId: string;
          templateId?: string;
        },
        any,
        Name
      >;
      spawnMany: FunctionReference<
        "action",
        "internal",
        {
          agentIds: Array<string>;
          apiBaseUrl?: string;
          apiKey?: string;
          memoryMib?: number;
          roomId: string;
          templateId?: string;
        },
        any,
        Name
      >;
    };
    lib: {
      listRooms: FunctionReference<
        "query",
        "internal",
        { limit?: number },
        Array<{
          _creationTime: number;
          _id: string;
          createdAt: number;
          lastAgentIds: Array<string>;
          orgHint?: string;
          roomId: string;
        }>,
        Name
      >;
    };
  };
