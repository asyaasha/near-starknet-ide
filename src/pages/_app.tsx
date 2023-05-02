import '@/styles/globals.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@near-wallet-selector/modal-ui/styles.css';
import 'bootstrap/dist/js/bootstrap.bundle';

import { setupWalletSelector } from '@near-wallet-selector/core';
import { setupHereWallet } from '@near-wallet-selector/here-wallet';
import { setupMeteorWallet } from '@near-wallet-selector/meteor-wallet';
import type { WalletSelectorModal } from '@near-wallet-selector/modal-ui';
import { setupModal } from '@near-wallet-selector/modal-ui';
import { setupMyNearWallet } from '@near-wallet-selector/my-near-wallet';
import { setupNearWallet } from '@near-wallet-selector/near-wallet';
import { setupNeth } from '@near-wallet-selector/neth';
import { setupSender } from '@near-wallet-selector/sender';
import Big from 'big.js';
import { setupKeypom } from 'keypom-js';
import { EthersProviderContext, useAccount, useInitNear, useNear, utils } from 'near-social-vm';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import React, { useCallback, useEffect, useState } from 'react';
import { Toaster } from 'sonner';

import { useEthersProviderContext } from '@/data/web3';
import { NetworkId, signInContractId } from '@/data/widgets';
import { setupFastAuth } from '@/lib/selector/setup';
import { useAuthStore } from '@/stores/auth';
import { init as initializeSegment, recordWalletConnect, reset as resetSegment } from '@/utils/analytics';
import { KEYPOM_OPTIONS } from '@/utils/keypom-options';

export default function App({ Component, pageProps }: AppProps) {
  const [signedIn, setSignedIn] = useState(false);
  const [signedAccountId, setSignedAccountId] = useState(null);
  const [availableStorage, setAvailableStorage] = useState<Big | null>(null);
  const [walletModal, setWalletModal] = useState<WalletSelectorModal | null>(null);
  const ethersProviderContext = useEthersProviderContext();
  const router = useRouter();
  const { initNear } = useInitNear();
  const near = useNear();
  const account = useAccount();
  const accountId = account.accountId;
  const updateAuthStore = useAuthStore((state) => state.update);

  initializeSegment();

  useEffect(() => {
    initNear &&
      initNear({
        networkId: NetworkId,
        walletConnectCallback: recordWalletConnect,
        selector: setupWalletSelector({
          network: NetworkId,
          modules: [
            setupNearWallet(),
            setupMyNearWallet(),
            setupSender(),
            setupHereWallet(),
            setupMeteorWallet(),
            setupNeth({
              gas: '300000000000000',
              bundle: false,
            }),
            setupFastAuth({
              networkId: NetworkId,
              signInContractId,
              relayerUrl:
                NetworkId === 'testnet'
                  ? 'http://34.70.226.83:3030/relay'
                  : 'https://near-relayer-mainnet.api.pagoda.co/relay',
              hideModal: undefined, // TODO: Remove?
            }) as any, // TODO: Refactor setupFastAuth() to TS
            setupKeypom({
              trialBaseUrl:
                NetworkId == 'testnet' ? 'https://test.near.org/#trial-url/' : 'https://near.org/#trial-url/',
              networkId: NetworkId,
              trialSplitDelim: '/',
              signInContractId,
              modalOptions: KEYPOM_OPTIONS(NetworkId),
            }) as any, // TODO: Refactor setupKeypom() to TS
          ],
        }),
      });
  }, [initNear]);

  useEffect(() => {
    if (!near) {
      return;
    }
    near.selector.then((selector: any) => {
      setWalletModal(setupModal(selector, { contractId: near.config.contractName }));
    });
  }, [near]);

  const requestSignInWithWallet = useCallback(
    (event: any) => {
      event?.preventDefault();
      walletModal?.show();
      return false;
    },
    [walletModal],
  );

  const requestSignIn = useCallback(() => {
    router.push('/signin');
  }, [router]);

  const logOut = useCallback(async () => {
    if (!near) {
      return;
    }
    const wallet = await (await near.selector).wallet();
    wallet.signOut();
    near.accountId = null;
    setSignedIn(false);
    setSignedAccountId(null);
    resetSegment();
    localStorage.removeItem('accountId');
  }, [near]);

  const refreshAllowance = useCallback(async () => {
    alert("You're out of access key allowance. Need sign in again to refresh it");
    await logOut();
    requestSignIn();
  }, [logOut, requestSignIn]);

  useEffect(() => {
    if (!near) {
      return;
    }
    setSignedIn(!!accountId);
    setSignedAccountId(accountId);
  }, [near, accountId]);

  useEffect(() => {
    setAvailableStorage(
      account.storageBalance ? Big(account.storageBalance.available).div(utils.StorageCostPerByte) : Big(0),
    );
  }, [account]);

  useEffect(() => {
    if (navigator.userAgent !== 'ReactSnap') {
      const pageFlashPrevent = document.getElementById('page-flash-prevent');
      if (pageFlashPrevent) {
        pageFlashPrevent.remove();
      }
    }
  }, []);

  useEffect(() => {
    updateAuthStore({
      accountId: signedAccountId || '',
      availableStorage,
      logOut,
      refreshAllowance,
      requestSignIn,
      requestSignInWithWallet,
      signedIn,
    });
  }, [
    availableStorage,
    logOut,
    refreshAllowance,
    requestSignIn,
    requestSignInWithWallet,
    signedIn,
    signedAccountId,
    updateAuthStore,
  ]);

  const metaProps = {
    title: 'NEAR',
    description: "Let's build decentralized experiences.",
  };

  return (
    <>
      <Head>
        <title>{metaProps.title}</title>
        <meta property="og:title" content={metaProps.title} />
        <meta name="description" content={metaProps.description} />
        <meta property="og:description" content={metaProps.description} />

        <script src="https://unpkg.com/@phosphor-icons/web@2.0.3" async></script>
        <link href="https://neardiscovery.zendesk.com" rel="preconnect" />
        <script
          src="https://static.zdassets.com/ekr/snippet.js?key=1736c8d0-1d86-4080-b622-12accfdb74ca"
          id="ze-snippet"
          async
        ></script>
      </Head>

      <Script id="zendesk-config">
        {`
          window.zESettings = {
            webWidget: {
              color: { theme: '#2b2f31' },
              offset: {
                horizontal: '10px',
                vertical: '10px',
                mobile: { horizontal: '2px', vertical: '65px', from: 'right' },
              },
              contactForm: {
                attachments: true,
                title: { '*': 'Feedback and Support' },
                fields: [
                  {
                    id: 13149356989591,
                    prefill: { '*': localStorage.getItem('accountId') },
                  },
                ],
              },
              launcher: {
                label: { '*': ' ' },
              },
            },
          };
        `}
      </Script>

      <EthersProviderContext.Provider value={ethersProviderContext}>
        <Component {...pageProps} />

        <Toaster position="bottom-center" richColors />
      </EthersProviderContext.Provider>
    </>
  );
}