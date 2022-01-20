import { jsonFetch } from "./_utils.ts";
import { BASE_URL } from "./constants.ts";
import { isNumber, isString } from "../deps.ts";

export type CandlestickOptions = {
  /** Maximum recent data points to return. `limit` is conflicted with `from` and `to`. If either `from` or `to` is specified, request will be rejected. */
  limit: number;

  /** Interval time between data points */
  interval:
    | "10s"
    | "1m"
    | "5m"
    | "15m"
    | "30m"
    | "1h"
    | "4h"
    | "8h"
    | "1d"
    | "7d";

  /** Start time of candlesticks, formatted in Unix timestamp in seconds. */
  from: number;

  /** End time of candlesticks, formatted in Unix timestamp in seconds. Default to current time */
  to: number;
};

export type CandlesticksResponse = {
  /** Unix timestamp in seconds */
  timestamp: number;

  /** Trading volume, in quote currency */
  volume: number;

  /** Open price */
  open: number;

  /** Highest price */
  high: number;

  /** Lowest price */
  low: number;

  /** Close price */
  close: number;
}[];

/** Market candlesticks.
 * Maximum of 1000 points can be returned in a query. Be sure not to exceed the limit when specifying from, to and interval.
 * ```ts
 * import { fetchCandlesticks } from "https://deno.land/x/gate_io@$VERSION/mod.ts";
 * await fetchCandlesticks("BTC_USD");
 * ```
 * @see https://www.gate.io/docs/developers/apiv4/en/#market-candlesticks
 */
export async function fetchCandlesticks(
  /** Currency pair */
  pair: `${string}_${string}`,
  { limit, from, to, interval }: Partial<CandlestickOptions> = {},
  init?: RequestInit,
): Promise<CandlesticksResponse> {
  const url = new URL(`spot/candlesticks`, BASE_URL);

  url.searchParams.set("currency_pair", pair);

  if (isNumber(limit)) {
    url.searchParams.set("limit", String(limit));
  }

  if (isNumber(from)) {
    url.searchParams.set("from", String(from));
  }

  if (isNumber(to)) {
    url.searchParams.set("to", String(to));
  }

  if (isString(interval)) {
    url.searchParams.set("interval", interval);
  }

  const res = await jsonFetch<
    [string, string, string, string, string, string][]
  >(
    url,
    init,
  );

  return res.map(([timestamp, volume, close, high, low, open]) => {
    return {
      timestamp: Number(timestamp),
      volume: Number(volume),
      close: Number(close),
      high: Number(high),
      low: Number(low),
      open: Number(open),
    };
  });
}
