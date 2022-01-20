import { fetchPair } from "./pair.ts";
import {
  anyNumber,
  anyOf,
  anyString,
  expect,
  objectContaining,
  test,
} from "../dev_deps.ts";

const baseEquality = {
  id: anyString((v) => /\w_\w/.test(v)),
  base: anyString(),
  quote: anyString(),
  fee: anyNumber(),
  min_base_amount: anyNumber(),
  min_quote_amount: anyNumber(),
  amount_precision: anyNumber(),
  precision: anyNumber(),
  trade_status: anyOf(["tradable", "untradable", "sellable"]),
  sell_start: anyNumber(),
  buy_start: anyNumber(),
};

export const equality = anyOf(
  [
    baseEquality,
    objectContaining({
      id: anyString((v) => /\w_\w/.test(v)),
      base: anyString(),
      quote: anyString(),
      fee: anyNumber(),
      amount_precision: anyNumber(),
      precision: anyNumber(),
      trade_status: anyOf(["tradable", "untradable", "sellable"]),
      sell_start: anyNumber(),
      buy_start: anyNumber(),
    }),
  ],
);

test("fetchPair", async () => {
  await expect(fetchPair("BTC_USD")).resolves.toEqual(
    equality,
  );
});
