import { fetchPairs } from "./pairs.ts";
import { anyArray, expect, test } from "../dev_deps.ts";
import { equality } from "./pair_test.ts";

test("fetchPairs", async () => {
  await expect(fetchPairs()).resolves.toEqual(anyArray(equality));
});
