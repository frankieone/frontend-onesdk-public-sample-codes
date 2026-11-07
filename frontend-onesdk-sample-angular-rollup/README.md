# frontend-onesdk-sample-angular-rollup

FrankieOne OneSDK integration sample using Angular with rollup

> [!WARNING]
> **Local development only: never put your API key in a browser or app.**
> Your FrankieOne API key is a server-side secret. Anyone who opens a page or app that contains it can read it and use your account.
> In production, create the individual and the OneSDK session on your server (with the entity's `entityId`)
> and pass only the session token to the browser. See [Production integration](../README.md#production-integration-create-the-session-on-your-server).
<!-- onesdk-key-warning -->

<sub>This readme was generated using the Github repository provisioning pipeline.</sub>

[as vite using rollup bundler under the hood](https://vitejs.dev/config/build-options#build-rollupoptions), please refer to the [angular + vite repo](https://github.com/frankieone/frontend-onesdk-public-sample-codes/frontend-onesdk-sample-angular-vite) for the implementation of one-sdk package