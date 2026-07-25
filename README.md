# @fystash_ai/convex

Convex component for the [Fystash](https://fystash.ai) multi-agent sandbox —
create a room, spawn agents, write the shared drive, exec, destroy.

Uses shared [`FystashSession`](../../typescript/src/session.ts) from `@fystash_ai/sdk`.

## Install

```bash
npm i @fystash_ai/convex @fystash_ai/sdk
```

```ts
// convex/convex.config.ts
import { defineApp } from "convex/server";
import { v } from "convex/values";
import fystash from "@fystash_ai/convex/convex.config.js";

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
```

Set in the Convex dashboard (or `.env.local` for `convex dev`):

```
FYSTASH_API=https://api.fystash.ai
FYSTASH_API_KEY=key-…
```

Components are isolated from app env — pass `FYSTASH_*` through `app.use` as above.

## Use

```ts
// convex/fleet.ts
import { action } from "./_generated/server";
import { components } from "./_generated/api";
import { Fystash } from "@fystash_ai/convex";
import { v } from "convex/values";

const fystash = new Fystash(components.fystash);

export const helloFleet = action({
  args: { roomId: v.string() },
  handler: async (ctx, { roomId }) => {
    return await fystash.runFleet(ctx, {
      roomId,
      agentIds: ["scout", "drafter"],
      drivePath: "hello.txt",
      driveContent: "many agents, one workspace",
      execAgentId: "scout",
      execArgv: ["/bin/cat", "hello.txt"],
      destroyAfter: true,
    });
  },
});
```

Or call steps individually: `createRoom` → `spawn` / `spawnMany` → `driveWrite` → `exec` → `destroy`.

## Develop (this repo)

```bash
cd sdk/typescript && npm i && npm run build
cd ../components/convex && npm i && npm run build
```

Cookbook: [docs/cookbook/12-convex-component.md](../../../docs/cookbook/12-convex-component.md).
