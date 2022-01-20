import { fetchTickers } from "./tickers.ts";
import { anyArray, expect, test } from "../dev_deps.ts";
import { equality } from "./ticker_test.ts";

test("fetchTickers", async () => {
  await expect(fetchTickers()).resolves.toEqual(anyArray(equality));
});
