# FrankieOne OneSDK Sample - Android

A native Android (Kotlin) sample app demonstrating the FrankieOne OneSDK hosted verification flow.

## Prerequisites

- Android Studio Arctic Fox (2020.3.1) or later
- JDK 8 or later
- Android SDK with API level 34
- A FrankieOne account with API credentials

## Quick Start

1. Clone the repository and open the `mobile-onesdk-sample-android` directory in Android Studio.

2. If the Gradle wrapper JAR is missing, generate it by running from the project root:
   ```bash
   gradle wrapper --gradle-version 8.6
   ```

3. Build the project:
   ```bash
   ./gradlew assembleDebug
   ```

4. Install the APK on a connected device or emulator:
   ```bash
   ./gradlew installDebug
   ```

   Or simply click **Run** in Android Studio.

## Usage

1. **Select Environment**: Use the dropdown to choose between UAT (testing) and Production.

2. **Enter Credentials**: Fill in your API Key, Customer ID, and optionally Customer Child ID.

3. **Set Flow ID**: The default flow is `idv`. Change this if you have a custom flow configured.

4. **Start Verification**: Tap the button to launch the OneSDK verification flow in a WebView.

All credentials are saved locally using SharedPreferences and will be pre-filled on the next launch.

## Project Structure

```
app/src/main/
  java/com/frankieone/onesdk/sample/
    MainActivity.kt       - Credentials form screen
    WebViewActivity.kt    - WebView screen with API integration
  res/
    layout/
      activity_main.xml   - Form layout
      activity_webview.xml - WebView layout
    values/
      strings.xml         - String resources
  AndroidManifest.xml     - App manifest
```

## How It Works

1. The app collects API credentials from the user on the first screen.
2. On "Start Verification", it sends a POST request to the FrankieOne onboarding URL endpoint.
3. The API returns a URL which is loaded in a WebView to run the hosted verification flow.
4. The user completes the identity verification within the WebView.
