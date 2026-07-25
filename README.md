# @fystash_ai/convex

[Convex](https://convex.dev) component for [Fystash](https://fystash.ai) multi-agent sandboxes —
create a room, spawn agents, write the shared drive, exec, destroy.

## Install

```bash
npm i @fystash_ai/convex @fystash_ai/sdk
```

```ts
// convex/convex.config.ts
import { defineApp } from "convex/server";
import fystash from "@fystash_ai/convex/convex.config.js";

const app = defineApp();
app.use(fystash);
export default app;
```

Set on your Convex deployment:

```
FYSTASH_API=https://api.fystash.ai
FYSTASH_API_KEY=key-…
```

## Use

```ts
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
      execArgv: ["cat", "hello.txt"],
      destroyAfter: true,
    });
  },
});
```

Or call steps individually: `createRoom` → `spawn` / `spawnMany` → `driveWrite` → `exec` → `destroy`.

## Demo

Live demo: see the GitHub Pages / Vercel URL in the repo About section after deploy.

```bash
npm i
npx convex dev
npm run example
```

## License

Apache-2.0
