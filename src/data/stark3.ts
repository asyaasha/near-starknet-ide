import { connect, disconnect } from "@argent/get-starknet"
import { useEffect, useState } from 'react';
import { singletonHook } from 'react-singleton-hook';



const defaultStProviderContext = { disconnect, arConnect: connect, arProvider: null, account: null };

export const useStProviderContext = singletonHook(defaultStProviderContext, () => {
  const initial:any = null;
  const [argent, setAgent] = useState(initial);
  const [stProvider, setStProvider] = useState(defaultStProviderContext);

  useEffect(() => {
    (async () => {
      if (typeof localStorage === 'undefined') return;
            try{
              const res = await connect()
              setAgent(res)
              await res?.enable({ starknetVersion: "v4" })

              // set account to an account state
              localStorage.setItem('starknetKey', JSON.stringify(res));
          }   
        catch(error:any){
            console.log(error.message)
        }
    })();
  }, []);

  useEffect(() => {
    console.log("argent -> in update")
    console.log(argent)
    if (!argent) return;

    setStProvider({
      disconnect: disconnect,
      account: argent?.account,
      arProvider: argent?.provider,
      arConnect: connect,
    });
  }, [argent]);

  return stProvider;
});
