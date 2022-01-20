import { jsonFetch } from "./_utils.ts";
import { BASE_URL } from "./constants.ts";
import type { CurrencyResponse } from "./currency.ts";

export type CurrenciesResponse = CurrencyResponse[];

/** List all currencies' details.
 * ```ts
 * import { fetchCurrencies } from "https://deno.land/x/gate_io@$VERSION/mod.ts";
 * await fetchCurrencies();
 * ```
 * @see https://www.gate.io/docs/developers/apiv4/en/#list-all-currencies-details
 */
export function fetchCurrencies(): Promise<CurrenciesResponse> {
  const url = new URL("spot/currencies", BASE_URL);
  return jsonFetch(url);
}
