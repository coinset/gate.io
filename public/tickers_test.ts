import { fetchTickers } from "./tickers.ts";
import {
  anyArray,
  anyNumber,
  anyOf,
  anyString,
  expect,
  test,
} from "../dev_deps.ts";

const baseEquality = {
  currency_pair: anyString(),
  last: anyNumber(),
  lowest_ask: anyNumber(),
  highest_bid: anyNumber(),
  change_percentage: anyNumber(),
  base_volume: anyNumber(),
  quote_volume: anyNumber(),
  high_24h: anyNumber(),
  low_24h: anyNumber(),
};

test("fetchTickers", async () => {
  await expect(fetchTickers()).resolves.toEqual(anyArray(anyOf([baseEquality, {
    ...baseEquality,
    etf_net_value: anyNumber(),
    etf_pre_net_value: anyNumber(),
    etf_pre_timestamp: anyNumber(),
    etf_leverage: anyNumber(),
  }])));
});
