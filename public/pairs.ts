import { jsonFetch, Reviver } from "./_utils.ts";
import { BASE_URL } from "./constants.ts";
import { isString } from "../deps.ts";

export type PairsResponse = {
  id: `${string}_${string}`;
  base: string;
  quote: string;
  fee: number;
  min_base_amount?: number;
  min_quote_amount?: number;
  amount_precision: number;
  precision: number;
  trade_status: "tradable" | "untradable" | "sellable";
  sell_start: number;
  buy_start: number;
}[];

const reviver: Reviver = (key, value) => {
  if (
    ["fee", "min_base_amount", "min_quote_amount"].includes(key) &&
    isString(value)
  ) {
    return Number(value);
  }
  return value;
};

/** List all currency pairs supported.
 * ```ts
 * import { fetchPairs } from "https://deno.land/x/gate_io@$VERSION/mod.ts";
 * await fetchPairs();
 * ```
 * @see https://www.gate.io/docs/developers/apiv4/en/#list-all-currency-pairs-supported
 */
export function fetchPairs(init?: RequestInit): Promise<PairsResponse> {
  const url = new URL("spot/currency_pairs", BASE_URL);
  return jsonFetch(url, init, {
    parseJson: reviver,
  });
}
