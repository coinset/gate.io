import { fetchCurrencies } from "./currencies.ts";
import { anyArray, anyBoolean, anyString, expect, test } from "../dev_deps.ts";

test("fetchCurrencies", async () => {
  await expect(fetchCurrencies()).resolves.toEqual(anyArray({
    currency: anyString(),
    delisted: anyBoolean(),
    withdraw_disabled: anyBoolean(),
    withdraw_delayed: anyBoolean(),
    deposit_disabled: anyBoolean(),
    trade_disabled: anyBoolean(),
  }));
});
