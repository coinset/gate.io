import { fetchCurrencies } from "./currencies.ts";
import { equality } from "./currency_test.ts";
import { anyArray, expect, test } from "../dev_deps.ts";

test("fetchCurrencies", async () => {
  await expect(fetchCurrencies()).resolves.toEqual(anyArray(equality));
});
