import { jsonFetch } from "./_utils.ts";
import { BASE_URL } from "./constants.ts";

export type CurrenciesResponse = {
  /** Currency name */
  currency: string;

  /** Whether currency is de-listed */
  delisted: boolean;

  /** Whether currency's withdrawal is disabled */
  withdraw_disabled: boolean;

  /** Whether currency's withdrawal is delayed */
  withdraw_delayed: boolean;

  /** Whether currency's deposit is disabled */
  deposit_disabled: boolean;

  /** Whether currency's trading is disabled */
  trade_disabled: boolean;
}[];

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
