# FrankieOne OneSDK - iOS Sample App

A native iOS (SwiftUI) sample app demonstrating the FrankieOne OneSDK hosted verification flow.

## Prerequisites

- macOS with Xcode 15.0 or later installed
- iOS 16.0+ simulator or physical device
- FrankieOne API credentials (API Key, Customer ID)

## Getting Started

1. Clone this repository
2. Open the Xcode project:
   ```
   open OneSDKSample.xcodeproj
   ```
3. Select a simulator or connected device as the run destination
4. Build and run with **Cmd + R**

## Usage

### Credentials Screen

When the app launches you will see a form with the following fields:

- **Environment** - Toggle between UAT and Production
  - UAT: `https://api.uat.frankie.one`
  - Production: `https://api.frankie.one`
- **API Key** - Your FrankieOne API key (entered securely)
- **Customer ID** - Your FrankieOne Customer ID
- **Customer Child ID** - Optional child customer identifier
- **Flow ID** - The verification flow to run (defaults to `idv`)

All field values are persisted locally and restored when you reopen the app.

Tap **Start Verification** to proceed.

### Verification Screen

The app calls the FrankieOne onboarding URL API and loads the returned verification page in an embedded web view. Use the back button to return to the credentials screen.

## Switching Between UAT and Production

Use the segmented control at the top of the credentials form. UAT is selected by default and is recommended for testing. Switch to Production only when using live credentials.

## Project Structure

```
OneSDKSample/
  OneSDKSampleApp.swift   - App entry point
  CredentialsView.swift   - Credentials input form
  WebViewScreen.swift     - API call and WKWebView wrapper
  Info.plist              - App configuration
OneSDKSample.xcodeproj/
  project.pbxproj         - Xcode project definition
```

## Notes

- This sample is intended for local development and testing only (no CI configuration included).
- API credentials are stored in UserDefaults on the device. Do not use this in a production distribution.
- The app requires network access to reach the FrankieOne API and load the hosted verification page.
