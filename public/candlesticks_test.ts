import { fetchCandlesticks } from "./candlesticks.ts";
import { anyArray, anyNumber, expect, test } from "../dev_deps.ts";

test("fetchCandlesticks", async () => {
  await expect(fetchCandlesticks("BTC_USD")).resolves.toEqual(anyArray({
    timestamp: anyNumber(),
    volume: anyNumber(),
    close: anyNumber(),
    high: anyNumber(),
    low: anyNumber(),
    open: anyNumber(),
  }));
});
