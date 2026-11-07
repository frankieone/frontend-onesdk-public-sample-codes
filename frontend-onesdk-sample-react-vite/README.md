# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

> [!WARNING]
> **Local development only: never put your API key in a browser or app.**
> This sample creates the OneSDK session in the browser with your API key so it can run without a backend.
> Anyone who opens a page built this way can read the key and use your account.
> In production, create the individual and the OneSDK session on your server (with the entity's `entityId`)
> and pass only the session token to the browser. See [Production integration](../README.md#production-integration-create-the-session-on-your-server).
<!-- onesdk-key-warning -->

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Getting Started

first do

```bash
npm i
```

# env Credentials

create a <code>.env</code> file in root directory. copy the content of <code>.env.example</code> to .env . fill out the credentials in your .env file with the credentials you acqired from frankie one

# Start Demo

run

```bash
npm run dev
```
