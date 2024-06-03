import { useState } from 'react';
import axios from 'axios';
import useStore from '../helpers/store';
import LoadingSpinner from './icons/LoadingSpinner';
import JSConfetti from 'js-confetti';
import styles from '../styles/Button.module.css';

const Button = () => {
  const walletConnectionAttempted = useStore(
    (state) => state.walletConnectionAttempted
  );
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  const haveAccountDetails = useStore((state) => state.haveAccountDetails);

  const [isLoading, setIsLoading] = useState(false);

  const getAccountDetails = async () => {

    setIsLoading(true);

    useStore.setState({ errorMessage: false });
    try {
      const [accountAddress] = ["GBDZDOGVYFIHTQYUEX43HSG4OMFZZWTLSBCTY7JVV4LQM33VLNAGCIEO"];
      const { data } = await axios.post('/api/account', { accountAddress });

      console.log("Data: ");
      console.log(data);

      useStore.setState({ isAuthenticated: data.isAuthenticated });
      useStore.setState({ walletConnectionAttempted: true });
      useStore.setState({ haveAccountDetails: true });
      useStore.setState({ account: data.account });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  const handleBackButtonClick = () => {
    useStore.setState({ walletConnectionAttempted: false });
    useStore.setState({ isAuthenticated: false });
  };

  const handleSuccessButtonClick = () => {
    const jsConfetti = new JSConfetti();
    jsConfetti.addConfetti({
      emojis: ['🚀', '🔥'],
      // confettiNumber: 100,
    });
  };

  if (isLoading) {
    return (
      <button disabled className={styles.buttonLoading}>
        <LoadingSpinner />
      </button>
    );
  }

  if (haveAccountDetails) {
    if (isAuthenticated) {
      return (
        <button onClick={handleSuccessButtonClick} className={styles.button}>
          Celebrate!
        </button>
      );
    }
    return (
      <button onClick={handleBackButtonClick} className={styles.button}>
        Back
      </button>
    );
  }
  return (
    <button onClick={getAccountDetails} className={styles.button}>
      Get Account Details
    </button>
  );
};

export default Button;
