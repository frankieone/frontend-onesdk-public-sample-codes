# frontend-onesdk-sample-vue-vite

FrankieOne OneSDK integration sample using Vue with vite

> [!WARNING]
> **Local development only: never put your API key in a browser or app.**
> This sample creates the OneSDK session in the browser with your API key so it can run without a backend.
> Anyone who opens a page built this way can read the key and use your account.
> In production, create the individual and the OneSDK session on your server (with the entity's `entityId`)
> and pass only the session token to the browser. See [Production integration](../README.md#production-integration-create-the-session-on-your-server).

<!-- onesdk-key-warning -->

## How to run
- Install dependencies `npm i`
- Create `.env` file in root project and copy the provided keys from `.env.example`. Fill with credentials.
- Start the app `npm run dev`