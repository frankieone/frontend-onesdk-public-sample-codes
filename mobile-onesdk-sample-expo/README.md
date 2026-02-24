# FrankieOne OneSDK - Expo Sample App

A sample Expo application demonstrating the FrankieOne OneSDK hosted verification flow.

## Prerequisites

- Node.js 18+
- npm or yarn
- Android Studio (for Android builds) or Xcode (for iOS builds)

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npx expo start
```

### Android Debug Build

```bash
npx expo prebuild --platform android --no-install
cd android && ./gradlew assembleDebug
```

The APK will be at `android/app/build/outputs/apk/debug/app-debug.apk`.

### iOS Build

```bash
npx expo prebuild --platform ios --no-install
cd ios && pod install
```

Then open the `.xcworkspace` file in Xcode and build.

## Usage

1. Launch the app.
2. Select the **Environment** (UAT or Production).
3. Enter your **API Key**, **Customer ID**, and optionally a **Customer Child ID**.
4. Set the **Flow ID** (defaults to `idv`).
5. Tap **Start Verification** to begin the hosted verification flow in a WebView.

All credentials are persisted locally so you don't need to re-enter them each time.

## Environment URLs

| Environment | Base URL                        |
|-------------|---------------------------------|
| UAT         | `https://api.uat.frankie.one`   |
| Production  | `https://api.frankie.one`       |

## Project Structure

```
mobile-onesdk-sample-expo/
  App.tsx                 # Navigation setup
  src/
    CredentialsScreen.tsx # Credential input form
    WebViewScreen.tsx     # WebView with hosted verification
  app.json                # Expo configuration
  package.json            # Dependencies
```
