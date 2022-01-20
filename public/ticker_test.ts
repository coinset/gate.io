import { fetchTicker } from "./ticker.ts";
import { anyNumber, anyString, expect, test } from "../dev_deps.ts";

test("fetchTicker", async () => {
  await expect(fetchTicker("BTC_USD")).resolves.toEqual({
    currency_pair: anyString(),
    last: anyNumber(),
    lowest_ask: anyNumber(),
    highest_bid: anyNumber(),
    change_percentage: anyNumber(),
    base_volume: anyNumber(),
    quote_volume: anyNumber(),
    high_24h: anyNumber(),
    low_24h: anyNumber(),
  });
});
