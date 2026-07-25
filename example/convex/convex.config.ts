import { defineApp } from "convex/server";
import fystash from "../../src/component/convex.config.js";

const app = defineApp();
app.use(fystash);
export default app;
