import Resolver from "@forge/resolver";
import { kvs } from "@forge/kvs";

const resolver = new Resolver();
const STORAGE_KEY = "tasks";

// Get all tasks
resolver.define("getTasks", async () => {
  const stored = await kvs.get(STORAGE_KEY);
  return stored || [];
});

// Save tasks
resolver.define("saveTasks", async ({ payload }) => {
  await kvs.set(STORAGE_KEY, payload.tasks);
  return payload.tasks;
});

// Optional: temporary resolver
resolver.define("getText", async () => {
  return "Hello from backend!";
});

export const handler = resolver.getDefinitions();