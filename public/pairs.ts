import { jsonFetch } from "./_utils.ts";
import { BASE_URL } from "./constants.ts";
import { PairResponse, reviver } from "./pair.ts";

export type PairsResponse = PairResponse[];

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
