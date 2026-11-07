# OneSDK Public Sample Codes

Welcome to the OneSDK Public Sample Codes repository. This repository contains a collection of sample projects demonstrating how to integrate OneSDK into various frontend frameworks and build tools. **Read [Security](#security-api-keys-never-go-in-a-browser-or-app) before you start:** the samples create sessions in the browser for local development only.

## Security: API keys never go in a browser or app

> [!WARNING]
> **Your FrankieOne API key is a server-side secret.** Never put it in browser JavaScript, a mobile app, front-end environment variables (`VITE_*`, `REACT_APP_*`, `NEXT_PUBLIC_*`, `VUE_APP_*`, Angular `environment.ts`) or anything else shipped to a device. Anyone who opens a page built that way can read the key from the page source or the network tab, then call FrankieOne as you.

The samples in this repository create the OneSDK session **in the browser** with your API key. They do this only so they can run on your machine without a backend. **This is for local development only.** Do not copy the session code into a production app, and do not deploy a sample with a real key in it.

FrankieOne can refuse sessions that are created from a browser with an API key on your account. If that is switched on, a browser-created session fails with `Machine sessions must be created by your server with your API key`.

## Production integration: create the session on your server

For each person you verify:

1. **Create the individual on your server** with the KYC v2 API, `POST /v2/individuals`, and keep the returned `entityId`.
2. **Create the OneSDK session on your server** for that entity: `POST /auth/v2/machine-session` with `permissions: { preset: "one-sdk", entityId }`. The session is then locked to that one entity.
3. **Send only the session `token` to the browser or app**, and pass it to OneSDK as `session: { token }`.

Your API key stays on your server, and a session token can only be used for the entity it was created for.

| Environment | KYC v2 API | Session API |
|---|---|---|
| UAT | `https://api.uat.frankie.one` | `https://backend.kycaml.uat.frankiefinancial.io` |
| Production | `https://api.frankie.one` | `https://backend.kycaml.frankiefinancial.io` |

### Example: curl

```bash
# 1. Create the individual (server-side only)
curl -s https://api.uat.frankie.one/v2/individuals \
  -H "api_key: $FRANKIE_API_KEY" \
  -H "X-Frankie-CustomerID: $FRANKIE_CUSTOMER_ID" \
  -H "Content-Type: application/json" \
  -d '{"individual": {"name": {"givenName": "Jane", "familyName": "Citizen"}}}'
# -> { "individual": { "entityId": "…", … } }

# 2. Create a OneSDK session for that entity (server-side only)
#    Credentials are customerId:apiKey, or customerId:customerChildId:apiKey, base64-encoded.
curl -s https://backend.kycaml.uat.frankiefinancial.io/auth/v2/machine-session \
  -H "Authorization: machine $(printf '%s:%s' "$FRANKIE_CUSTOMER_ID" "$FRANKIE_API_KEY" | base64 -w0)" \
  -H "Content-Type: application/json" \
  -d '{"permissions": {"preset": "one-sdk", "entityId": "<entityId from step 1>"}}'
# -> { "token": "…", … }   Send only the token to the browser.
```

### Example: Node.js (Express) endpoint

```js
// server.js: runs on YOUR server. FRANKIE_API_KEY is never sent to the browser.
import express from 'express'

const app = express()
app.use(express.json())

const KYC_API = 'https://api.uat.frankie.one'
const SESSION_API = 'https://backend.kycaml.uat.frankiefinancial.io'
const { FRANKIE_CUSTOMER_ID, FRANKIE_API_KEY } = process.env

// Called by your front end once your own user is signed in to your app.
app.post('/api/onesdk-session', async (req, res) => {
  // 1. Create the individual (or look up the entityId you stored for this user).
  const created = await fetch(`${KYC_API}/v2/individuals`, {
    method: 'POST',
    headers: {
      api_key: FRANKIE_API_KEY,
      'X-Frankie-CustomerID': FRANKIE_CUSTOMER_ID,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      individual: { name: { givenName: req.body.givenName, familyName: req.body.familyName } },
    }),
  }).then(r => r.json())
  const entityId = created.individual.entityId

  // 2. Create a OneSDK session locked to that entity.
  const credentials = Buffer.from(`${FRANKIE_CUSTOMER_ID}:${FRANKIE_API_KEY}`).toString('base64')
  const session = await fetch(`${SESSION_API}/auth/v2/machine-session`, {
    method: 'POST',
    headers: { Authorization: `machine ${credentials}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ permissions: { preset: 'one-sdk', entityId } }),
  }).then(r => r.json())

  // 3. Return only the token.
  res.json({ token: session.token })
})

app.listen(3001)
```

In the browser:

```js
const { token } = await fetch('/api/onesdk-session', { method: 'POST' }).then(r => r.json())
const oneSdk = await OneSDK({ session: { token }, mode: 'production' })
```

Store the `entityId` against your own user record, so a returning user gets a session for the same entity instead of a new one.

## Available Samples

The following samples are included in this repository, each representing a different integration approach:

1. **Vanilla React with Webpack**
   - Directory: `frontend-onesdk-sample-vanilla-react-webpack`
   - Description: A basic React setup using vanilla JavaScript and Webpack.

2. **React with Webpack**
   - Directory: `frontend-onesdk-sample-react-webpack`
   - Description: A React project using Webpack as the module bundler.

3. **Angular with Webpack**
   - Directory: `frontend-onesdk-sample-angular-webpack`
   - Description: An Angular application configured with Webpack.

4. **Next.js with Webpack**
   - Directory: `frontend-onesdk-sample-nextjs-webpack`
   - Description: A Next.js project using Webpack as the build tool.

5. **Vue with Webpack**
   - Directory: `frontend-onesdk-sample-vue-webpack`
   - Description: A Vue.js project bundled with Webpack.

6. **React with Rollup**
   - Directory: `frontend-onesdk-sample-react-rollup`
   - Description: A React project using Rollup as the module bundler.

7. **Angular with Rollup**
   - Directory: `frontend-onesdk-sample-angular-rollup`
   - Description: An Angular application configured with Rollup.

8. **Next.js with Rollup**
   - Directory: `frontend-onesdk-sample-nextjs-rollup`
   - Description: A Next.js project using Rollup as the build tool.

9. **Vue with Rollup**
   - Directory: `frontend-onesdk-sample-vue-rollup`
   - Description: A Vue.js project bundled with Rollup.

10. **React with Vite**
    - Directory: `frontend-onesdk-sample-react-vite`
    - Description: A React project using Vite for a fast development experience.

11. **Angular with Vite**
    - Directory: `frontend-onesdk-sample-angular-vite`
    - Description: An Angular application configured with Vite.

12. **Next.js with Vite**
    - Directory: `frontend-onesdk-sample-nextjs-vite`
    - Description: A Next.js project using Vite as the build tool.

13. **Vue with Vite**
    - Directory: `frontend-onesdk-sample-vue-vite`
    - Description: A Vue.js project bundled with Vite.

## Getting Started

1. **Clone the Repository**

   Clone this repository to your local machine:

   ```bash
   git clone https://github.com/frankieone/one-sdk-samples.git

2. **Navigate to a Sample Directory**
   ```bash
    cd frontend-onesdk-sample-react-vite

3. **Running the samples**

   Follow the README.md file for sample specific instructions. Mostly it will ask you to just fill in .env file with your creds and call npm install followed by npm run start/dev 
