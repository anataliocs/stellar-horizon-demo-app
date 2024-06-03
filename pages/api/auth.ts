import type { NextApiRequest, NextApiResponse } from 'next';
import { Horizon, Keypair } from '@stellar/stellar-sdk';
import { AccountResponse } from '@stellar/stellar-sdk/lib/horizon';
require('dotenv').config();

interface Data {
  isAuthenticated: boolean;
  accountData: string;
  account: AccountResponse;
}

interface ResponseError {
  message: string;
}

const issuerKeypair = Keypair.fromPublicKey("GBDZDOGVYFIHTQYUEX43HSG4OMFZZWTLSBCTY7JVV4LQM33VLNAGCIEO"); 
const server = new Horizon.Server("https://horizon-testnet.stellar.org");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ResponseError>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      message: 'Only POST requests allowed',
    });
  }

  const account: AccountResponse = await server.loadAccount(issuerKeypair.publicKey());

  console.log("Account: ");
  console.log(account.accountId);

  const accountId:string = account.account_id;

  return res.status(200).json({
    accountData: account.account_id,
    isAuthenticated: account != null && account != undefined,
    account: account
  });
}
