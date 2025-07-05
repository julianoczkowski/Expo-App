# macOS → Expo → Material 3 Expressive

## 🚀 30-Second Overview

| Component         | Choice                                                                                            |
| ----------------- | ------------------------------------------------------------------------------------------------- |
| **Runtime**       | **Node 22 LTS "Jod"** – Active LTS until Apr 2027 ([nodejs.org][1])                               |
| **Mobile stack**  | **Expo SDK 53** (React Native 0.79, New Architecture default) ([expo.dev][2], [docs.expo.dev][3]) |
| **Design system** | **Material 3 Expressive** (Paper v5 + `expo-material3-theme`) ([m3.material.io][4])               |
| **Cloud build**   | **EAS Build** – ships iOS & Android binaries from the cloud                                       |

## 1. Quick Start: Bootstrap Script (macOS)

Paste this script into Terminal to have a live **Material 3 Expressive** Expo app running on your Mac in under an hour—no guessing, no skipped steps.

```bash
#You need to do this only once (steps 0-2)!

# 0 – Install Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 1 – Core tooling ------------------------------------------------------------
brew update
brew install node@22 git watchman cocoapods
brew install --cask android-studio    # Android SDK + emulator
softwareupdate --install-rosetta --agree-to-license || true  # Intel libs on Apple Silicon
xcode-select --install || true        # Xcode CLI tools
sudo xcodebuild -runFirstLaunch       # accept license

# 2 – Global CLIs -------------------------------------------------------------
npm i -g expo-cli eas-cli

#This is where you start creating your app, change the name MyFirstApp.
# 3 – Create & run app --------------------------------------------------------
npx create-expo-app MyFirstApp --template tabs#53
cd MyFirstApp
expo install react-native-paper react-native-vector-icons \
             react-native-safe-area-context react-native-gesture-handler \
             react-native-reanimated react-native-screens \
             @pchmn/expo-material3-theme
expo start --ios                      # launches on iOS Simulator
```

### Android Setup

If you get any errors with Android Studio, set Android environment variables by adding to `~/.zprofile`:

```zsh
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH="$PATH:$ANDROID_HOME/emulator:$ANDROID_HOME/platform-tools"
```

## 2. Running Your App

### 2.1 iOS Simulator (Fastest)

```bash
expo start --ios
```

### 2.2 Android Emulator

```bash
# start Pixel 8 (API 35) from Android Studio or `emulator @Pixel_8_API_35`
expo start --android
```

### 2.3 Real Device

```bash
expo start --tunnel   # scan QR with Expo Go (iOS or Android)
```

## 3. Adding Material 3 Expressive

### 3.1 Install Libraries

```bash
expo install react-native-paper react-native-vector-icons \
             react-native-safe-area-context react-native-gesture-handler \
             react-native-reanimated react-native-screens \
             @pchmn/expo-material3-theme
```

Paper v5 provides a full MD3 component kit; `expo-material3-theme` injects dynamic-color palettes (Android 12+) ([m3.material.io][4])

### 3.2 Theme Setup

```tsx
// App.tsx
import React from "react";
import { useColorScheme } from "react-native";
import { useMaterial3Theme } from "@pchmn/expo-material3-theme";
import { MD3LightTheme, MD3DarkTheme, PaperProvider } from "react-native-paper";

export default function App() {
  const scheme = useColorScheme(); // 'light' | 'dark'
  const { theme: sysTheme } = useMaterial3Theme(); // dynamic palette

  const paperTheme =
    scheme === "dark"
      ? { ...MD3DarkTheme, colors: sysTheme.dark }
      : { ...MD3LightTheme, colors: sysTheme.light };

  return <PaperProvider theme={paperTheme}>{/* … */}</PaperProvider>;
}
```

Dynamic color now powers every Paper component out-of-the-box.

### 3.3 Brand Palette (Optional)

Export JSON from **Material Theme Builder** and drop into the `colors` block.

### 3.4 Typography

```bash
expo install expo-font @expo-google-fonts/roboto
```

Load `Roboto_400Regular` / `Roboto_500Medium` and map them onto Paper's MD3 text styles.

### 3.5 Motion & Shapes

```bash
expo install moti
```

- Increase `roundness` to `16` for the softer Expressive radius
- Use `<MotiView>` for MD3 spring animations

### 3.6 Icons

```tsx
import { MaterialCommunityIcons } from "@expo/vector-icons";
<MaterialCommunityIcons name="palette-swatch" size={28} />;
```

## 4. Recommended IDE Extensions

| Extension                 | Purpose               |
| ------------------------- | --------------------- |
| **React Native Tools**    | Run / attach debugger |
| **ESLint + Prettier**     | Auto-format & lint    |
| **ES7 React/TS Snippets** | Faster boilerplate    |

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
⚡  expo start          # hot-reload on sim / device
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
