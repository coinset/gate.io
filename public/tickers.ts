import { jsonFetch } from "./_utils.ts";
import { BASE_URL } from "./constants.ts";
import { reviver, TickerResponse } from "./ticker.ts";

/** Retrieve tickers information.
 * ```ts
 * import { fetchTickers } from "https://deno.land/x/gate_io@$VERSION/mod.ts";
 * await fetchTickers();
 * ```
 * @see https://www.gate.io/docs/developers/apiv4/en/#retrieve-ticker-information
 */
export function fetchTickers(
  init?: RequestInit,
): Promise<TickerResponse[]> {
  const url = new URL(`spot/tickers`, BASE_URL);

  return jsonFetch(url, init, {
    parseJson: reviver,
  });
}

export { reviver };
