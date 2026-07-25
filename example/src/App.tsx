import "./App.css";
import { useAction, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { useMemo, useState } from "react";

export default function App() {
  const rooms = useQuery(api.example.listRooms, { limit: 10 });
  const runFleet = useAction(api.example.helloFleet);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<unknown>(null);
  const [error, setError] = useState<string | null>(null);
  const roomId = useMemo(
    () => `convex-demo-${Math.random().toString(36).slice(2, 8)}`,
    [],
  );

  async function onRun() {
    setBusy(true);
    setError(null);
    setResult(null);
    try {
      const out = await runFleet({ roomId });
      setResult(out);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  }

  return (
    <main style={{ maxWidth: 720, margin: "2rem auto", padding: "0 1rem", fontFamily: "ui-sans-serif, system-ui" }}>
      <p style={{ letterSpacing: "0.08em", textTransform: "uppercase", fontSize: 12, opacity: 0.7 }}>
        @fystash_ai/convex
      </p>
      <h1 style={{ marginTop: 8 }}>Fystash multi-agent rooms in Convex</h1>
      <p style={{ lineHeight: 1.5, opacity: 0.85 }}>
        One click creates a room, spawns two agents, writes a shared drive file,
        execs <code>/bin/cat</code> inside a sandbox, then destroys the room.
      </p>
      <button
        onClick={onRun}
        disabled={busy}
        style={{
          marginTop: 12,
          padding: "0.75rem 1.25rem",
          border: "none",
          borderRadius: 8,
          background: busy ? "#888" : "#111",
          color: "white",
          cursor: busy ? "default" : "pointer",
          fontSize: 16,
        }}
      >
        {busy ? "Running fleet…" : "Run helloFleet"}
      </button>
      <p style={{ fontSize: 13, opacity: 0.7 }}>room: <code>{roomId}</code></p>
      {error && (
        <pre style={{ background: "#fee", padding: 12, borderRadius: 8, overflow: "auto" }}>{error}</pre>
      )}
      {result != null && (
        <pre style={{ background: "#f4f4f5", padding: 12, borderRadius: 8, overflow: "auto" }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
      <h2 style={{ marginTop: 32, fontSize: 18 }}>Recent rooms (component table)</h2>
      <ul>
        {(rooms ?? []).map((r) => (
          <li key={r._id}>
            <code>{r.roomId}</code> — agents: {r.lastAgentIds.join(", ") || "—"}
          </li>
        ))}
        {rooms?.length === 0 && <li>No rooms recorded yet.</li>}
      </ul>
      <p style={{ marginTop: 32, fontSize: 13, opacity: 0.7 }}>
        npm i @fystash_ai/convex ·{" "}
        <a href="https://fystash.ai">fystash.ai</a>
      </p>
    </main>
  );
}
