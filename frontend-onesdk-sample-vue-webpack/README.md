# frontend-onesdk-sample-vue-webpack
FrankieOne OneSDK integration sample using Vue with webpack

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
  - VUE_APP_BASE_API_URL is FrankieOne's backend URL. IF you are on UAT environment, set it as https://backend.kycaml.uat.frankiefinancial.io. If you are on Production environment, set it as https://backend.kycaml.frankiefinancial.io
  - Set VUE_APP_API_LOGIN_PATH as FrankieOne's machine session generator path, "/auth/v2/machine-session"
  - Set your Customer ID / Customer Child ID (if exist) / Google API Key (Optional) and your OneSDK API Key
- Start the app `npm run serve`