
# Stellar Horizon SDK Demonstration

__Goal:__ Get account details using Stellar Horizon API Javascript SDK

Uses the Stellar Horizon SDK

## Tech Stack

- [Next.js](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/)
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

## Components

`pages/index.tsx`
  - Home page Component
  - imports Message.tsx and Button.tsx components

`pages/api/auth.ts`
  - Next.js API file
  - Making a `POST` request to `http://localhost:3000/api/account` using the Stellar SDK to get account details

`helpers/store.ts`
  - This file sets up our zustand store. [Zustand](https://github.com/pmndrs/zustand) is a "small, fast and scalable bearbones state-management solution using simplified flux principles."

`components/Button.tsx`
  - Button component that changes depending on the users actions
  - Button onClick functions for each state of the button

`components/Message.tsx`
  - Message component displays the primary text to the user, which changes depending on the users actions
