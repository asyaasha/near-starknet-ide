# NEAR Discovery based IDE with Starknet.js support

## Using Starknet custom Components

- Starknet.js docs https://www.starknetjs.com/docs/guides/intro
- Near BOS docs https://docs.near.org/bos/components/widgets


- use default "StConnect" component to integrate a staknet compadable wallet ( Argent X or Braavos ). Example of usecase deployed at "devtestst.testnet/widget/ArgentWallet" ( accessible by adding src address to default Widget component ie.
`<Widget src="devtestst.testnet/widget/ArgentWallet" />`

  
<img width="1010" alt="Screen Shot 2023-10-05 at 2 36 26 AM" src="https://github.com/asyaasha/near-starknet-ide/assets/20131841/94a91612-5c78-4e7d-98af-5377bcb527d8">


Starknet.js methods can be accessed by using starknet.st prefix on regular Starknet.js syntax. Ie.

- starknet.stContract to create a new starknet based contract object
  
```
const myTestContract = new starknet.stContract(
  abi.abi,
  state.address,
  provider
);

vs  Starknet.js

const myTestContract = new Contract(compiledTest.abi, deployResponse.deploy.contract_address, provider);
```


starknet.stProvider to create a provider

```
// initialize provider
const provider = new starknet.stProvider({
  sequencer: { network: starknet.stConstants.NetworkName.SN_GOERLI },
});

vs Starknet.js

// connect provider
const provider = new Provider({ sequencer: { baseUrl: "http://127.0.0.1:5050" } });
```

Example of font end component that does contract call at /devtestst.testnet/widget/StarknetContract

## Setup & Development

Initialize repo:

```
pnpm i
```

Start development version:

```
pnpm dev
```

## Local Component Development

1. Run an instance of a component server like [near/bos-loader](https://github.com/near/bos-loader) which serves component code in the following format

   ```json
   {
     "components": {
       "<component path 1>": {
         "code": "<component 1 code>"
       },
       "<component path 2>": {
         "code": "<component 2 code>"
       }
     }
   }
   ```

   this will be used as a `redirectMap` in `ViewPage`

2. Open the `/flags` route of your viewer and set the BOS Loader URL e.g. `http://127.0.0.1:3030`

Note: there is no hot reload, you must refresh the page to see component changes

## Local VM Development

> This section needs testing since switch to pnpm

If you need to make changes to the VM and test locally, you can easily link your local copy of the VM:

1. Clone the VM repo as a sibling of `near-discovery`:

```
git clone git@github.com:NearSocial/VM.git
```

Folder Structure:

```
/near-discovery
/VM
```

2. Run `pnpm link ../VM`

3. Any time you make changes to the `VM`, run `pnpm build` inside the `VM` project in order for the viewer project to pick up the changes
<img width="1256" alt="Screen Shot 2023-10-05 at 2 18 16 AM" src="https://github.com/asyaasha/near-starknet-ide/assets/20131841/c285a851-218c-4353-b6d6-3ceda78fad37">
<img width="1387" alt="Screen Shot 2023-10-05 at 2 39 25 AM" src="https://github.com/asyaasha/near-starknet-ide/assets/20131841/e530712e-3f5b-440f-8d21-eccc944a3cfd">


