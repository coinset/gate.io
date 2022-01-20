import { fetchCurrency } from "./currency.ts";
import { anyBoolean, anyString, expect, test } from "../dev_deps.ts";

export const equality = {
  currency: anyString(),
  delisted: anyBoolean(),
  withdraw_disabled: anyBoolean(),
  withdraw_delayed: anyBoolean(),
  deposit_disabled: anyBoolean(),
  trade_disabled: anyBoolean(),
};

test("fetchCurrency", async () => {
  await expect(fetchCurrency("GT")).resolves.toEqual(equality);
});
