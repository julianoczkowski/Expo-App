# macOS → Expo → Material 3 Expressive

## 🚀 30-Second Overview

| Component         | Choice                                                                                            |
| ----------------- | ------------------------------------------------------------------------------------------------- |
| **Runtime**       | **Node 22 LTS "Jod"** – Active LTS until Apr 2027 ([nodejs.org][1])                               |
| **Mobile stack**  | **Expo SDK 53** (React Native 0.79, New Architecture default) ([expo.dev][2], [docs.expo.dev][3]) |
| **Design system** | **Material 3 Expressive** (Paper v5 + `expo-material3-theme`) ([m3.material.io][4])               |
| **Cloud build**   | **EAS Build** – ships iOS & Android binaries from the cloud                                       |

## 1. Quick Start: Bootstrap Script (macOS)

Paste these commands into Terminal to have a live **Material 3 Expressive** Expo app running on your Mac in under an hour.

_You only have to install the prerequisites (steps 0-1) once._

### 0. Install Homebrew

If you don't have [Homebrew](https://brew.sh/) installed, run this command first:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### 1. Core Tooling

Install Node.js, Git, and other essential development tools.

```bash
brew update
```

```bash
brew install node@22 git watchman cocoapods
```

```bash
brew install --cask android-studio
```

> **Note**: The following commands might be needed on Apple Silicon (M1/M2/M3) Macs or for a fresh Xcode setup.

```bash
softwareupdate --install-rosetta --agree-to-license || true
```

```bash
xcode-select --install || true
```

```bash
sudo xcodebuild -runFirstLaunch
```

### 2. Global CLIs

Install the Expo Application Services (EAS) CLI.

```bash
npm i -g eas-cli
```

### 3. Create & Run App

This is where you create your app. You can change `MyFirstApp` to your project's name.

```bash
npx create-expo-app MyFirstApp --template tabs
```

```bash
cd MyFirstApp
```

```bash
npx expo install react-native-paper react-native-vector-icons \
             react-native-safe-area-context react-native-gesture-handler \
             react-native-reanimated react-native-screens \
             @pchmn/expo-material3-theme
```

```bash
npx expo start --ios
```

### Android Setup

If you get any errors with Android Studio, set Android environment variables by adding to `~/.zprofile`:

```zsh
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH="$PATH:$ANDROID_HOME/emulator:$ANDROID_HOME/platform-tools"
```

After adding these lines, reload your profile by running:

```zsh
source ~/.zprofile
```

Verify the setup:

```zsh
echo $ANDROID_HOME
# Should display the path to your Android SDK

adb --version
# Should display the Android Debug Bridge version
```

## 2. Running Your App

There are four primary ways to run your Expo app during development.

### 2.1 iOS Simulator (macOS Only)

This is the fastest and most common method for macOS users.

```bash
npx expo start --ios
```

### 2.2 Android Emulator

You can also run a virtualized Android device directly on your Mac.

1.  **Open Android Studio** and navigate to the **Virtual Device Manager** (AVD Manager).
2.  **Create a Virtual Device** (Pixel 8 with API 33 or 34 is recommended).
3.  **Start the Emulator** from the AVD Manager.
4.  Once the emulator is running, start the app on it from your terminal:

```bash
# Make sure the emulator is running before executing the command
npx expo start --android
```

### 2.3 Physical Device (USB)

You can connect a physical device directly to your Mac via USB.

**For Android:**

1.  **Enable Developer Options** and **USB Debugging** on your device.
2.  **Connect your device** with a USB cable and accept the debugging prompt.
3.  **Verify the connection** by running `adb devices` in your terminal.
4.  Run `npx expo start --android`.

**For iOS:**
Running on a physical iOS device requires a paid Apple Developer account for code signing. Once set up, you can select your device in Xcode or use EAS Build for development builds. The iOS Simulator is the recommended free alternative.

### 2.4 Physical Device (Local Network with Expo Go)

Run the app on any physical device (Android or iOS) using the **Expo Go** app, as long as it's on the same Wi-Fi network as your computer.

```bash
npx expo start
# Scan the QR code with the Expo Go app (Play Store / App Store)
```

## 3. Material 3 Expressive Theme

The project is pre-configured with a sophisticated Material 3 theme system that supports dynamic colors, brand customization, and unified styling across the app and navigation components.

The entire theme is configured in **`MyFirstApp/app/_layout.tsx`**, which serves as the root layout for the application.

### 3.1 Theme Providers

In `_layout.tsx`, the app is wrapped with two providers:

1.  **`PaperProvider`**: This is from `react-native-paper` and applies the Material 3 theme to all Paper components (buttons, cards, etc.).
2.  **`ThemeProvider`**: This is from `@react-navigation/native` and applies a compatible theme to the navigation elements (like the header bar and screen backgrounds).

This ensures a consistent look and feel across the entire application.

### 3.2 Brand Palette & Customization

The theme uses custom brand colors defined in **`MyFirstApp/assets/material-theme.json`**. This file is generated by the [Material Theme Builder](https://m3.material.io/theme-builder) and contains palettes for both light and dark modes.

To change the app's primary color and overall theme:

1.  Open the **Material Theme Builder** and pick a new seed color.
2.  Export the theme as a **JSON** file.
3.  Replace the contents of `material-theme.json` with the new data.

The app will automatically pick up the new colors.

### 3.3 Typography

The project uses the **Roboto** font family, which is pre-loaded in `_layout.tsx`. The theme is configured to use different weights for body text and headlines, following Material 3 guidelines. You can adjust the font configuration in the `fontConfig` object within `_layout.tsx`.

### 3.4 Navigation Colors

To ensure UI consistency, the navigation theme is adapted from the main `react-native-paper` theme using the `adaptNavigationTheme` function. This function creates navigation-compatible themes from your Material 3 colors, so your app's header, tab bar, and background will always match the component theme.

### 3.5 Icons

```tsx
import { MaterialCommunityIcons } from "@expo/vector-icons";
<MaterialCommunityIcons name="palette-swatch" size={28} />;
```

Use **Filled** icons for primary actions and **Outlined** for secondary ones to align with Material Design guidance.

## 4. Recommended IDE Extensions

| Extension                 | Purpose               |
| ------------------------- | --------------------- |
| **React Native Tools**    | Run / attach debugger |
| **ESLint + Prettier**     | Auto-format & lint    |
| **ES7 React/TS Snippets** | Faster boilerplate    |

### 4.1 Context7 MCP for Up-to-Date Documentation

To stay current with the rapidly evolving React Native and Expo ecosystems, this project recommends using the **Context7 MCP** extension in Cursor. It provides a conversational interface to fetch the latest official documentation, code examples, and API references without leaving your editor.

Install [Context7 MCP](https://github.com/upstash/context7) in Cursor to get instant access to the latest Expo and React Native documentation:

1. Open Cursor and go to **Settings** (⚙️)
2. Navigate to **Tools&Integrations** > **MCP Servers**
3. Click **New MCP Server**
4. Add the following configuration:

```json
{
  "mcpServers": {
    "context7": {
      "url": "https://mcp.context7.com/mcp"
    }
  }
}
```

5. Click **Save**

Now you can access up-to-date documentation by typing:

- `use context7` followed by your Expo or React Native question

This gives you instant access to:

- Latest API references
- Component documentation
- Best practices
- Code examples
- Troubleshooting guides

## 5. Cloud Builds with EAS

```bash
eas login
eas build:configure              # generates eas.json
eas build -p ios --profile dev   # local .ipa & TestFlight
eas build -p android --profile dev
```

Roll out OTA fixes any time:

```bash
eas update --branch main -m "Dark-mode typography tweak"
```

## 6. Everyday Workflow

```text
✍️  code .             # edit in Cursor
⚡  npx expo start      # hot-reload on sim / device
✅  git commit & push   # keep history
📦  eas build          # cloud .ipa / .apk for testers
🚀  eas update         # instant bug-fixes post-launch
```

## 7. Troubleshooting

| Problem                              | Solution                                                                                               |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| Metro stuck at 99%                   | `adb reverse tcp:8081 tcp:8081` then reload                                                            |
| iOS build fails "pods not installed" | `cd ios && pod install && cd ..`                                                                       |
| "New Architecture" crash             | Add `"expo": { "jsEngine": "hermes", "android": { "useLegacyPackage": true } }` to `app.json`, rebuild |
| `require.context` error              | Run `npx expo prebuild --clean` if Metro bundler fails                                                 |
| Device can't connect                 | Ensure device is on same WiFi network as your computer                                                 |

## 8. Upgrade Cadence

- Expo ships a new SDK every ~3 months; upgrade one version at a time ([docs.expo.dev][5])
- Node 22 is safe through April 2027 ([nodejs.org][1])

## 9. If you get stuck

Just copy this entire content to Cursor or other LLM and ask it to set the Expo app for you.

---

[1]: https://nodejs.org/en/about/previous-releases?utm_source=chatgpt.com "Node.js Releases"
[2]: https://expo.dev/changelog/sdk-53?utm_source=chatgpt.com "Expo SDK 53 - Expo Changelog"
[3]: https://docs.expo.dev/guides/new-architecture/?utm_source=chatgpt.com "React Native's New Architecture - Expo Documentation"
[4]: https://m3.material.io/blog/building-with-m3-expressive?utm_source=chatgpt.com "Start building with Material 3 Expressive"
[5]: https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/?utm_source=chatgpt.com "Upgrade Expo SDK - Expo Documentation"
[6]: https://github.com/upstash/context7 "Context7 MCP - Up-to-date Code Documentation For Any Prompt"
