import useStore from '../helpers/store';
import styles from '../styles/Message.module.css';
import { AccountResponse } from '@stellar/stellar-sdk/lib/horizon';

interface MessageBoxProps {
  title: string;
  errorState?: boolean;
  account?: AccountResponse;
  children: React.ReactNode;
}

const MessageBox = ({ title, errorState, account, children }: MessageBoxProps) => {
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
        {account ? (

          <div className={styles.accessBox}>
            <span><h5>Account ID: </h5><strong>{account.account_id}</strong></span>
            {
              account.balances && account.balances[0] && account.balances[0].balance ?
                <span><h5>Lumens Balance: </h5><strong>{account.balances[0].balance}</strong></span>
                : ''
            }

          </div>

        ) : null
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
  const haveAccountDetails = useStore((state) => state.haveAccountDetails);
  const account = useStore((state) => state.account);

  if (haveAccountDetails) {
    if (isAuthenticated) {
      return (
        <MessageBox title="Stellar Account" errorState={false} account={account}>
          <p>Account details retreived!</p>
        </MessageBox>
      );
    }
    return (
      <MessageBox title="Access Denied" errorState={true}>
        <p>
          You don't have access
        </p>
      </MessageBox>
    );
  }
  return (
    <MessageBox title="Account Details">
      <span>
        Click the button below to get <span className="font-normal">Account Details</span>
      </span>
    </MessageBox>
  );
};

export default Message;
