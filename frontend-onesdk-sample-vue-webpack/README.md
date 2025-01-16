# frontend-onesdk-sample-vue-webpack
FrankieOne OneSDK integration sample using Vue with webpack

## How to run
- Install dependencies `npm i`
- Create `.env` file in root project and copy the provided keys from `.env.example`. Fill with credentials.
  - VUE_APP_BASE_API_URL is FrankieOne's backend URL. IF you are on UAT environment, set it as https://backend.kycaml.uat.frankiefinancial.io. If you are on Production environment, set it as https://backend.kycaml.frankiefinancial.io
  - Set VUE_APP_API_LOGIN_PATH as FrankieOne's machine session generator path, "/auth/v2/machine-session"
  - Set your Customer ID / Customer Child ID (if exist) / Google API Key (Optional) and your OneSDK API Key
- Start the app `npm run serve`