# Initialize the project

to initialize the project, do <code>npm install</code>

> [!WARNING]
> **Local development only: never put your API key in a browser or app.**
> This sample creates the OneSDK session in the browser with your API key so it can run without a backend.
> Anyone who opens a page built this way can read the key and use your account.
> In production, create the individual and the OneSDK session on your server (with the entity's `entityId`)
> and pass only the session token to the browser. See [Production integration](../README.md#production-integration-create-the-session-on-your-server).

<!-- onesdk-key-warning -->

# .ENV credential

create <code>.env</code> file on the root directory
and copy the content of <code>.env.example</code> into your .env file. fill all the required key with your frankieone credentials

# Start the project

<code>npm start</code> to start the project
OneSDK Sample Demo