# Next JS + vite

since vite only support SPA, it is incompatible with Next JS SSR features.

> [!WARNING]
> **Local development only: never put your API key in a browser or app.**
> Your FrankieOne API key is a server-side secret. Anyone who opens a page or app that contains it can read it and use your account.
> In production, create the individual and the OneSDK session on your server (with the entity's `entityId`)
> and pass only the session token to the browser. See [Production integration](../README.md#production-integration-create-the-session-on-your-server).

<!-- onesdk-key-warning -->

please refer to this next js [link](https://nextjs.org/docs/app/building-your-application/upgrading/from-vite)

for more info
