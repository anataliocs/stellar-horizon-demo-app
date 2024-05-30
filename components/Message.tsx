import { Collectible } from '@audius/fetch-nft';
import useStore from '../helpers/store';
import styles from '../styles/Message.module.css';

interface MessageBoxProps {
  title: string;
  errorState?: boolean;
  solCollectibleArray?: Collectible[];
  children: React.ReactNode;
}

const MessageBox = ({ title, errorState, solCollectibleArray, children }: MessageBoxProps) => {
  return (
    <div
      className={`${styles.outerBox} ${errorState ? 'bg-gradient-border-error-to-t' : 'bg-gradient-border-to-t'
        }`}
    >
      <div
        className={`${styles.innerBox} ${errorState
          ? 'bg-gradient-border-error-to-b'
          : 'bg-gradient-border-to-b'
          }`}
      >
        <h1 className={`${styles.title} ${errorState ? 'text-primary' : ''}`}>
          {title}
        </h1>
        {solCollectibleArray ? (
          solCollectibleArray.map(nft =>
          (
            <div className={styles.accessBox}>
              <span><h5>Access granted to exclusive content: </h5><strong>{nft.name}</strong></span>
              <img className={styles.nftImage} src={nft.imageUrl} />
              <span className='text-[8px]'>NFT ID:{nft.id}</span>
            </div>
          )
          )) : null
        }
        <div className={styles.text}>{children}</div>
      </div>
    </div>
  );
};

const Message = () => {
  const walletConnectionAttempted = useStore(
    (state) => state.walletConnectionAttempted
  );
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  const solCollectibles: Collectible[] = useStore<Collectible[]>((state) => state.solCollectibles);

  if (walletConnectionAttempted) {
    if (isAuthenticated) {
      return (
        <MessageBox title="Exclusive Content Unlocked!" errorState={false} solCollectibleArray={solCollectibles}>
        </MessageBox>
      );
    }
    return (
      <MessageBox title="Access Denied" errorState={true}>
        <p>
          You don't have the authorized NFT in your MetaMask Wallet to enable
          entry. Please check your account for an NFT with the following
          contract address:
        </p>
        <a
          className="block mt-4 font-mono text-2xl w-auto rounded-lg outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-[#473F42]"
          href={`https://etherscan.io/address/${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}`}
          target="blank"
        >
          {process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}
        </a>
      </MessageBox>
    );
  }
  return (
    <MessageBox title="Unlock with NFT">
      <span>
        Welcome to the <span className="font-normal">Audius Exclusive Content Section</span>, 
        where holding specific NFTs grants you special access to exclusive content.
      </span>
    </MessageBox>
  );
};

export default Message;
