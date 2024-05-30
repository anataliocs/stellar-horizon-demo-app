import { Collectible } from '@audius/fetch-nft';
import create from 'zustand';

interface StoreState {
  walletConnectionAttempted: boolean;
  isAuthenticated: boolean;
  errorMessage?: boolean;
  walletAddress?: string;
  solCollectibles: Collectible[];
}

const useStore = create<StoreState>(() => {
  return {
    walletConnectionAttempted: false,
    isAuthenticated: false,
    solCollectibles: []
  };
});

export default useStore;
