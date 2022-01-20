import { fetchTrades } from "./trades.ts";
import {
  anyArray,
  anyNumber,
  anyOf,
  anyString,
  expect,
  test,
} from "../dev_deps.ts";

test("fetchTrades", async () => {
  await expect(fetchTrades("BTC_USD")).resolves.toEqual(anyArray({
    id: anyString(),
    create_time: anyNumber(),
    create_time_ms: anyNumber(),
    currency_pair: anyString((v) => /\w_\w/.test(v)),
    side: anyOf(["sell", "buy"]),
    amount: anyNumber(),
    price: anyNumber(),
  }));
});
