import { anyArray, anyNumber, expect, test } from "../dev_deps.ts";
import { fetchOrderBook } from "./order_book.ts";

test("fetchOrderBook", async () => {
  await expect(fetchOrderBook("BTC_USD")).resolves.toEqual({
    current: anyNumber(),
    update: anyNumber(),
    asks: anyArray([anyNumber(), anyNumber()]),
    bids: anyArray([anyNumber(), anyNumber()]),
  });
});
