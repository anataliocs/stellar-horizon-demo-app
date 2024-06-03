import { AccountResponse } from '@stellar/stellar-sdk/lib/horizon';
import create from 'zustand';

interface StoreState {
  walletConnectionAttempted: boolean;
  isAuthenticated: boolean;
  haveAccountDetails: boolean;
  errorMessage?: boolean;
  walletAddress?: string;
  account?: AccountResponse;
}

const useStore = create<StoreState>(() => {
  return {
    walletConnectionAttempted: false,
    isAuthenticated: false,
    haveAccountDetails: false
  };
});

export default useStore;
