# OneSDK Sample - React Native

A React Native sample app demonstrating the FrankieOne OneSDK hosted verification flow using a WebView.

## Prerequisites

- Node.js 18+
- React Native CLI
- Android Studio (for Android builds)
- Xcode (for iOS builds, macOS only)
- A valid FrankieOne API key and Customer ID

## Quick Start

### Install Dependencies

```bash
npm install
```

### Run on Android

```bash
# Start Metro bundler
npm start

# In a separate terminal
npm run android
```

Or build directly:

```bash
cd android && ./gradlew assembleDebug
```

### Run on iOS

```bash
cd ios && pod install && cd ..
npm run ios
```

## Configuration

When the app launches, you will see a credentials form:

1. **Environment Toggle** - Switch between UAT and Production environments
   - **UAT**: `https://api.uat.frankie.one` (for testing)
   - **Production**: `https://api.frankie.one` (for live use)
2. **API Key** - Your FrankieOne API key (entered securely)
3. **Customer ID** - Your FrankieOne Customer ID
4. **Customer Child ID** - Optional child customer identifier
5. **Flow ID** - The verification flow to use (defaults to `idv`)

All credentials are persisted locally using AsyncStorage and will be pre-filled on subsequent launches.

## Expected Behavior

1. Enter your credentials and tap **Start Verification**
2. The app fetches an onboarding URL from the FrankieOne API
3. A WebView loads the hosted verification flow
4. The user completes the identity verification process within the WebView
5. Use the back button to return to the credentials screen

## Project Structure

```
src/
  App.tsx              - Navigation setup
  CredentialsScreen.tsx - Credentials form with persistence
  WebViewScreen.tsx     - WebView loading the verification flow
android/               - Android native project
```
