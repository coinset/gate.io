import { jsonFetch, Reviver } from "./_utils.ts";
import { BASE_URL } from "./constants.ts";
import { isString } from "../deps.ts";

export type TickerResponse = {
  /** Currency pair */
  currency_pair: `${string}_${string}`;

  /** Last trading price */
  last: number;

  /** Lowest ask */
  lowest_ask: number;

  /** Highest bid */
  highest_bid: number;

  /** Change percentage. */
  change_percentage: number;

  /** Base currency trade volume */
  base_volume: number;

  /** Quote currency trade volume */
  quote_volume: number;

  /** Highest price in 24h */
  high_24h: number;

  /** Lowest price in 24h */
  low_24h: number;

  /** ETF net value */
  etf_net_value?: number;

  /** ETF previous net value at re-balancing time */
  etf_pre_net_value?: number;

  /** ETF previous re-balancing time */
  etf_pre_timestamp?: number;

  /** ETF current leverage */
  etf_leverage?: number;
};

const reviver: Reviver = (key, value) => {
  if (
    [
      "last",
      "lowest_ask",
      "highest_bid",
      "change_percentage",
      "base_volume",
      "quote_volume",
      "high_24h",
      "low_24h",
      "etf_net_value",
      "etf_pre_net_value",
      "etf_pre_timestamp",
      "etf_leverage",
    ]
      .includes(key) &&
    isString(value)
  ) {
    return Number(value);
  }
  return value;
};

/** Retrieve ticker information.
 * ```ts
 * import { fetchTicker } from "https://deno.land/x/gate_io@$VERSION/mod.ts";
 * await fetchTicker("BTC_USD");
 * ```
 * @see https://www.gate.io/docs/developers/apiv4/en/#retrieve-ticker-information
 */
export async function fetchTicker(
  pair: `${string}_${string}`,
  init?: RequestInit,
): Promise<TickerResponse> {
  const url = new URL(`spot/tickers`, BASE_URL);

  url.searchParams.set("currency_pair", pair);
  const [data] = await jsonFetch<[TickerResponse]>(url, init, {
    parseJson: reviver,
  });

  return data;
}

export { reviver };
