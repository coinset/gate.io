import { jsonFetch, Reviver } from "./_utils.ts";
import { BASE_URL } from "./constants.ts";
import { isBoolean, isNumber, isString } from "../deps.ts";

export type TradesOptions = {
  /** Maximum number of records to be returned in a single list */
  limit: number;

  /** Specify list staring point using the `id` of last record in previous list-query results */
  lastId: string;

  /** Whether the id of records to be retrieved should be smaller than the last_id specified- true: Retrieve records where id is smaller than the specified last_id- false: Retrieve records where id is larger than the specified last_idDefault to false. */
  reverse: boolean;

  /** Start timestamp of the query */
  from: number;

  /** Time range ending, default to current time */
  to: number;

  /** Page number */
  page: number;
};

export type TradesResponse = {
  /** Trade ID */
  id: string;

  /** Trading time */
  create_time: number;

  /** Trading time, with millisecond precision */
  create_time_ms: number;

  /** Related order ID. No value in public endpoints */
  order_id?: string;

  /** Order side */
  side: "buy" | "sell";

  /** Trade role */
  role?: "maker" | "taker";

  /** Trade amount */
  amount: number;

  /** Order price */
  price: number;

  /** Fee deducted. No value in public endpoints */
  fee?: number;

  /** Fee currency unit. No value in public endpoints */
  fee_currency?: string;

  /** Points used to deduct fee */
  point_fee?: number;

  /** GT used to deduct fee */
  gt_fee?: number;
}[];

const reviver: Reviver = (key, value) => {
  if (
    [
      "create_time",
      "create_time_ms",
      "min_quote_amount",
      "amount",
      "price",
      "fee",
      "point_fee",
      "gt_fee",
    ]
      .includes(
        key,
      ) &&
    isString(value)
  ) {
    return Number(value);
  }
  return value;
};

/** Retrieve market trades.
 * You can use `from` and `to` to query by time range, or use `last_id` by scrolling page. The default behavior is by time range.
 * Scrolling query using `last_id` is not recommended any more. If last_id is specified, time range query parameters will be ignored.
 * ```ts
 * import { fetchTrades } from "https://deno.land/x/gate_io@$VERSION/mod.ts";
 * await fetchTrades("BTC_USD");
 * ```
 * @see https://www.gate.io/docs/developers/apiv4/en/#retrieve-market-trades
 */
export function fetchTrades(
  /** Currency pair */
  pair: `${string}_${string}`,
  { limit, lastId, reverse, from, to, page }: Partial<TradesOptions> = {},
  init?: RequestInit,
): Promise<TradesResponse> {
  const url = new URL(`spot/trades`, BASE_URL);

  url.searchParams.set("currency_pair", pair);

  if (isNumber(limit)) {
    url.searchParams.set("limit", String(limit));
  }

  if (isString(lastId)) {
    url.searchParams.set("last_id", lastId);
  }

  if (isBoolean(reverse)) {
    url.searchParams.set("reverse", String(reverse));
  }

  if (isNumber(from)) {
    url.searchParams.set("from", String(from));
  }

  if (isNumber(to)) {
    url.searchParams.set("to", String(to));
  }

  if (isNumber(page)) {
    url.searchParams.set("page", String(page));
  }

  return jsonFetch(url, init, {
    parseJson: reviver,
  });
}
