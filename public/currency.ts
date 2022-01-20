import { jsonFetch } from "./_utils.ts";
import { BASE_URL } from "./constants.ts";

export type CurrencyResponse = {
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
};

/** Get details of a specific currency.
 * ```ts
 * import { fetchCurrency } from "https://deno.land/x/gate_io@$VERSION/mod.ts";
 * await fetchCurrency("GT");
 * ```
 * @see https://www.gate.io/docs/developers/apiv4/en/#get-details-of-a-specific-currency
 */
export function fetchCurrency(currency: string): Promise<CurrencyResponse> {
  const url = new URL(`spot/currencies/${currency}`, BASE_URL);
  return jsonFetch(url);
}
