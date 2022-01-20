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
