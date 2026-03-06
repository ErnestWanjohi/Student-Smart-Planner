import Resolver from "@forge/resolver";
import { kvs } from "@forge/kvs";

const resolver = new Resolver();
const STORAGE_KEY = "tasks";

resolver.define("getTasks", async () => {
  const stored = await kvs.get(STORAGE_KEY);
  return stored || [];
});

resolver.define("saveTasks", async ({ tasks }) => {
  await kvs.set(STORAGE_KEY, tasks);
  return tasks;
});

export const handler = resolver.getDefinitions();