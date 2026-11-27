This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

```bash
npm i
```
## ENV

create .env.local file in root project. copy content of .env.example into it. fill out the credential with credentials you acquired from frankie one


run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

> [!WARNING]
> **Local development only: never put your API key in a browser or app.**
> This sample creates the OneSDK session in the browser with your API key so it can run without a backend.
> Anyone who opens a page built this way can read the key and use your account.
> In production, create the individual and the OneSDK session on your server (with the entity's `entityId`)
> and pass only the session token to the browser. See [Production integration](../README.md#production-integration-create-the-session-on-your-server).

<!-- onesdk-key-warning -->

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.


## Package manager

The `npm` commands above are for you, and so is `npm install` if you copy this sample into your own project; leave out the `packageManager` field of `package.json` when you do. Contributors to this repository use pnpm 11 (Node 22.13 or later; `brew install pnpm` or `npm install -g pnpm@11.28.13`): `pnpm install`, then `pnpm run <script>`. See the [repository README](../README.md#package-managers).
