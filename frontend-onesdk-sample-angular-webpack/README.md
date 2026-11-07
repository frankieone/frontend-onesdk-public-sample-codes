# frontend-onesdk-sample-angular-webpack
FrankieOne OneSDK integration sample using Angular with webpack

> [!WARNING]
> **Local development only: never put your API key in a browser or app.**
> This sample creates the OneSDK session in the browser with your API key so it can run without a backend.
> Anyone who opens a page built this way can read the key and use your account.
> In production, create the individual and the OneSDK session on your server (with the entity's `entityId`)
> and pass only the session token to the browser. See [Production integration](../README.md#production-integration-create-the-session-on-your-server).

<!-- onesdk-key-warning -->

## How to run
- Install dependencies `npm i`
- Update environment variables located at `src/environments/environment.ts`, if you need to run locally, you need to update development variables too at `src/environments/environment.development.ts`
- Start the app `npm run start` or `ng serve`