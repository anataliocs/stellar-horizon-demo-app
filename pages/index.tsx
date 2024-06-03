import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import useStore from '../helpers/store';
import Button from '../components/Button';
import StellarLogo from '../components/icons/StellarLogo';
import Message from '../components/Message';
import { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingSpinner from '../components/icons/LoadingSpinner';
import { Collectible } from '@audius/fetch-nft';


const Home: NextPage = () => {
  const walletConnectionAttempted = useStore(
    (state) => state.walletConnectionAttempted
  );
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  const walletAddress = useStore((state) => state.walletAddress);
  const errorMessage = useStore((state) => state.errorMessage);
  const haveAccountDetails = useStore((state) => state.haveAccountDetails);
  const account = useStore((state) => state.account);
  
  const [isLoading, setIsLoading] = useState(true);
  useStore.setState({ isAuthenticated: true });
  useStore.setState({ walletConnectionAttempted: true });

  // check if wallet has already been connected and set isAuthenticated accordingly
  useEffect(() => {

    const authenticate = async () => {
      try {
        const [accountAddress] = [""]
        const { data } = await axios.post('/api/auth', { accountAddress });
        console.log(accountAddress);

        useStore.setState({ account: data.account });
        useStore.setState({ walletAddress: accountAddress });
        useStore.setState({ isAuthenticated: true });
        useStore.setState({ walletConnectionAttempted: true });
      } catch (error) {
        console.log(error);
      }

      setIsLoading(true);
    };

    return () => {
    };
  }, []);

  const mainContent = () => {
    return (
      <>
        <Message />
        <Button />
        {errorMessage && (
          <p className={styles.errorMessage}>
            We couldn't detect your wallet. Please click{' '}
            <a
              href="https://metamask.io"
              target="blank"
              className="underline underline-offset-1"
            >
              here
            </a>{' '}
            to download the MetaMask extension and set up a wallet.
          </p>
        )}
      </>
    );
  };

  return (
    <>
      <Head>
        <title>Stellar Account Lookup Example </title>
        <meta
          name="description"
          content="NFT as authentication example project"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={`${styles.container} ${
          walletConnectionAttempted && isAuthenticated ? styles.noblur : ''
        }`}
      >
        <header>
          <div className={styles.logo}>
            <StellarLogo className="h-8" />
          </div>
          {walletAddress && (
            <div className={styles.address}>{`${walletAddress.substring(
              0,
              5
            )}...${walletAddress.substring(
              walletAddress.length - 5,
              walletAddress.length
            )}`}</div>
          )}
        </header>
        <main className={styles.main}>
          { mainContent()}
        </main>
      </div>
    </>
  );
};

export default Home;
