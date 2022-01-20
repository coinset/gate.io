# @coinset/gate.io

Universal gate.io API client

:children_crossing: This is not official

## Public API

A request for an entry point that does not require authentication.

### fetchCurrencies

List all currencies'
details.[Docs](https://www.gate.io/docs/developers/apiv4/en/#list-all-currencies-details)

#### example

```ts
import { fetchCurrencies } from "https://deno.land/x/gate_io@$VERSION/mod.ts";
await fetchCurrencies();
```

#### returns

```ts
type CurrenciesResponse = {
  currency: string;
  delisted: boolean;
  withdraw_disabled: boolean;
  withdraw_delayed: boolean;
  deposit_disabled: boolean;
  trade_disabled: boolean;
}[];
```

### fetchCurrency

Get details of a specific
currency.[Docs](https://www.gate.io/docs/developers/apiv4/en/#get-details-of-a-specific-currency)

#### example

```ts
import { fetchCurrency } from "https://deno.land/x/gate_io@$VERSION/mod.ts";
await fetchCurrency("GT");
```

#### returns

```ts
type CurrencyResponse = {
  currency: string;
  delisted: boolean;
  withdraw_disabled: boolean;
  withdraw_delayed: boolean;
  deposit_disabled: boolean;
  trade_disabled: boolean;
}[];
```

### fetchPairs

List all currency pairs
supported.[Docs](https://www.gate.io/docs/developers/apiv4/en/#list-all-currency-pairs-supported)

#### example

```ts
import { fetchPairs } from "https://deno.land/x/gate_io@$VERSION/mod.ts";
await fetchPairs();
```

#### returns

```ts
type PairsResponse = {
  id: `${string}_${string}`;
  base: string;
  quote: string;
  fee: number;
  min_base_amount?: number | undefined;
  min_quote_amount?: number | undefined;
  amount_precision: number;
  precision: number;
  trade_status: "tradable" | "untradable" | "sellable";
  sell_start: number;
  buy_start: number;
}[];
```

### fetchPair

Get details of a specific
order.[Docs](https://www.gate.io/docs/developers/apiv4/en/#get-details-of-a-specifc-order)

#### example

```ts
import { fetchPair } from "https://deno.land/x/gate_io@$VERSION/mod.ts";
await fetchPair("BTC_USD");
```

#### parameters

| name | type                  | description   |
| ---- | --------------------- | ------------- |
| pair | `${string}_${string}` | Currency pair |

#### returns

```ts
type PairResponse = {
  id: `${string}_${string}`;
  base: string;
  quote: string;
  fee: number;
  min_base_amount?: number | undefined;
  min_quote_amount?: number | undefined;
  amount_precision: number;
  precision: number;
  trade_status: "tradable" | "untradable" | "sellable";
  sell_start: number;
  buy_start: number;
};
```

### fetchTicker

Retrieve ticker
information.[Docs](https://www.gate.io/docs/developers/apiv4/en/#retrieve-ticker-information)

#### example

```ts
import { fetchTicker } from "https://deno.land/x/gate_io@$VERSION/mod.ts";
await fetchTicker("BTC_USD");
```

#### parameters

| name | type                  | description   |
| ---- | --------------------- | ------------- |
| pair | `${string}_${string}` | Currency pair |

#### returns

```ts
type TickerResponse = {
  currency_pair: `${string}_${string}`;
  last: number;
  lowest_ask: number;
  highest_bid: number;
  change_percentage: number;
  base_volume: number;
  quote_volume: number;
  high_24h: number;
  low_24h: number;
};
```
