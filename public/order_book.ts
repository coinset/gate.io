import { jsonFetch, Reviver } from "./_utils.ts";
import { BASE_URL } from "./constants.ts";
import { isBoolean, isNumber, isString } from "../deps.ts";

export type OrderBookOptions = {
  /** Order depth. `0` means no aggregation is applied. default to `0` */
  interval: number;

  /** Maximum number of order depth data in asks or bids */
  limit: number;

  /** Return order book ID */
  with_id: boolean;
};

export type OrderBookResponse = {
  /** Order book ID, which is updated whenever the order book is changed. Valid only when `with_id` is set to `true` */
  id?: number;

  /** The timestamp of the response data being generated (in milliseconds) */
  current: number;

  /** The timestamp of when the orderbook last changed (in milliseconds) */
  update: number;

  /** Asks order depth */
  asks: [number, number][];

  /** Bids order depth */
  bids: [number, number][];
};

const reviver: Reviver = (key, value) => {
  if (["asks", "bids"].includes(key) && Array.isArray(value)) {
    return value.map((v) =>
      Array.isArray(v) ? v.map((x) => isString(x) ? Number(x) : x) : v
    );
  }
  return value;
};

/** Retrieve order book.
 * ```ts
 * import { fetchOrderBook } from "https://deno.land/x/gate_io@$VERSION/mod.ts";
 * await fetchOrderBook("BTC_USD");
 * ```
 * @see https://www.gate.io/docs/developers/apiv4/en/#retrieve-order-book
 */
export function fetchOrderBook(
  /** Currency pair */
  pair: `${string}_${string}`,
  { interval, limit, with_id }: Partial<OrderBookOptions> = {},
  init?: RequestInit,
): Promise<OrderBookResponse> {
  const url = new URL("spot/order_book", BASE_URL);

  url.searchParams.set("currency_pair", pair);

  if (isNumber(interval)) {
    url.searchParams.set("interval", String(interval));
  }

  if (isNumber(limit)) {
    url.searchParams.set("limit", String(limit));
  }

  if (isBoolean(with_id)) {
    url.searchParams.set("with_id", String(with_id));
  }

  return jsonFetch(url, init, {
    parseJson: reviver,
  });
}
