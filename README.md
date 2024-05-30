
# NFTs as Authorization for Access to Content Demonstration

__Goal:__ Limit access to exclusive content only to owners of a specified NFT.

Uses the Audius Fetch NFT client to retrieve NFTs held by a wallet.

## Tech Stack

- [Next.js](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [Audius Fetch-NFT Library](https://github.com/AudiusProject/fetch-nft)
- Zustand


## Run Locally

Install dependencies

```bash
  yarn
```

### Run the Project

```bash
  yarn dev
```
Go to http://localhost:3000

### 2. Environment Variables
Create environment variables file
```bash
  touch .env
```

### Wallet with NFTs(Successful Auth)

GrWNH9qfwrvoCEoTm65hmnSh4z3CD96SfhtfQY6ZKUfY

Use this `.env` config to successfully authorize: 
```
SOL_WALLET_ADDRESS=GrWNH9qfwrvoCEoTm65hmnSh4z3CD96SfhtfQY6ZKUfY
```

### Empty Wallet(Fail Auth)

CgEZcNoj98ZW3xN7m6FooiCxfN7nQ69KBHPFejbxe3dW

Use this `.env` config to fail auth: 
```
SOL_WALLET_ADDRESS=CgEZcNoj98ZW3xN7m6FooiCxfN7nQ69KBHPFejbxe3dW
```

Or leaving the env param empty will also fail.

## Component Breakdown

`pages/index.tsx`
  - Home page Component
  - imports Message.tsx and Button.tsx components
  - has useEffect that checks on page load if the user has already connected their wallet, and checks for account changes (disconnect wallet, change accounts within wallet)

`pages/api/auth.ts`
  - Next.js API file
  - Making a `POST` request to `http://localhost:3000/api/auth` will call the Audius Fetch NFT client

`helpers/store.ts`
  - This file sets up our zustand store. [Zustand](https://github.com/pmndrs/zustand) is a "small, fast and scalable bearbones state-management solution using simplified flux principles."

`components/Button.tsx`
  - Button component that changes depending on the users actions
  - Button onClick functions for each state of the button

`components/Message.tsx`
  - Message component displays the primary text to the user, which changes depending on the users actions
