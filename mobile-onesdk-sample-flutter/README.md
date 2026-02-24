# FrankieOne OneSDK Flutter Sample

A Flutter sample app demonstrating the FrankieOne OneSDK hosted verification flow.

## Prerequisites

- [Flutter SDK](https://docs.flutter.dev/get-started/install) (3.16.0 or later)
- Android Studio or VS Code with Flutter extensions
- An Android device or emulator (API 21+)

## Getting Started

1. Install dependencies:

```bash
flutter pub get
```

2. Build the debug APK:

```bash
flutter build apk --debug
```

3. Install on a connected device:

```bash
flutter install
```

Or run directly:

```bash
flutter run
```

## Configuration

On the credentials screen, fill in:

- **Environment**: Select UAT for testing or Production for live.
- **API Key**: Your FrankieOne API key.
- **Customer ID**: Your FrankieOne customer ID.
- **Customer Child ID** (optional): Your customer child ID, if applicable.
- **Flow ID**: The verification flow to use (defaults to `idv`).

All fields are saved locally and restored on next launch.

## Switching Between UAT and Production

Use the Environment dropdown on the credentials screen:

- **UAT** connects to `https://api.uat.frankie.one`
- **Production** connects to `https://api.frankie.one`

## Expected Behavior

1. Enter your credentials and tap **Start Verification**.
2. The app calls the FrankieOne onboarding URL API.
3. A WebView loads the hosted verification flow.
4. Complete the verification steps within the WebView.
5. Use the back button to return to the credentials screen.
