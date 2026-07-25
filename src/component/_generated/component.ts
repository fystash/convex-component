/* eslint-disable */
/**
 * Generated `ComponentApi` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex codegen --component-dir ./src/component`.
 * @module
 */

import type { FunctionReference } from "convex/server";

export type ComponentApi<Name extends string | undefined = string | undefined> =
  {
    lib: {
      listRooms: FunctionReference<
        "query",
        "public",
        { limit?: number },
        Array<{
          _creationTime: number;
          _id: string;
          roomId: string;
          orgHint?: string;
          createdAt: number;
          lastAgentIds: Array<string>;
        }>,
        Name
      >;
      rememberRoom: FunctionReference<
        "mutation",
        "internal",
        { roomId: string; agentIds: Array<string>; orgHint?: string },
        string,
        Name
      >;
      forgetRoom: FunctionReference<
        "mutation",
        "internal",
        { roomId: string },
        null,
        Name
      >;
    };
    actions: {
      createRoom: FunctionReference<
        "action",
        "public",
        {
          roomId: string;
          apiBaseUrl?: string;
          apiKey?: string;
          orgHint?: string;
        },
        any,
        Name
      >;
      spawn: FunctionReference<
        "action",
        "public",
        {
          roomId: string;
          agentId: string;
          guestCid?: number;
          templateId?: string;
          memoryMib?: number;
          apiBaseUrl?: string;
          apiKey?: string;
        },
        any,
        Name
      >;
      spawnMany: FunctionReference<
        "action",
        "public",
        {
          roomId: string;
          agentIds: Array<string>;
          templateId?: string;
          memoryMib?: number;
          apiBaseUrl?: string;
          apiKey?: string;
        },
        any,
        Name
      >;
      driveWrite: FunctionReference<
        "action",
        "public",
        {
          roomId: string;
          path: string;
          content: string;
          apiBaseUrl?: string;
          apiKey?: string;
        },
        any,
        Name
      >;
      exec: FunctionReference<
        "action",
        "public",
        {
          roomId: string;
          agentId: string;
          argv: Array<string>;
          cwd?: string;
          timeoutMs?: number;
          apiBaseUrl?: string;
          apiKey?: string;
        },
        any,
        Name
      >;
      destroy: FunctionReference<
        "action",
        "public",
        { roomId: string; apiBaseUrl?: string; apiKey?: string },
        any,
        Name
      >;
      runFleet: FunctionReference<
        "action",
        "public",
        {
          roomId: string;
          agentIds: Array<string>;
          drivePath?: string;
          driveContent?: string;
          execAgentId?: string;
          execArgv?: Array<string>;
          destroyAfter?: boolean;
          apiBaseUrl?: string;
          apiKey?: string;
        },
        any,
        Name
      >;
    };
  };
