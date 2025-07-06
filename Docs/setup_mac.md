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
npm i -g eas-cli

#This is where you start creating your app, change the name MyFirstApp.
# 3 – Create & run app --------------------------------------------------------
npx create-expo-app MyFirstApp --template tabs
cd MyFirstApp
npx expo install react-native-paper react-native-vector-icons \
             react-native-safe-area-context react-native-gesture-handler \
             react-native-reanimated react-native-screens \
             @pchmn/expo-material3-theme
npx expo start --ios                      # launches on iOS Simulator
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

### 2.1 iOS Simulator (Fastest)

```bash
npx expo start --ios
```

### 2.2 Android Emulator

```bash
# start Pixel 8 (API 35) from Android Studio or `emulator @Pixel_8_API_35`
npx expo start --android
```

### Setting Up an Android Emulator

If you see an error like `No Android connected device found, and no emulators could be started automatically`, follow these steps:

1. **Open Android Studio**

2. **Open the AVD Manager**:

   - Click on "More Actions" or the three dots in the top-right corner
   - Select "Virtual Device Manager" or "AVD Manager"

3. **Create a New Virtual Device**:

   - Click "Create Virtual Device" button
   - Select a phone definition (Pixel 8 is recommended)
   - Click "Next"

4. **Select a System Image**:

   - Choose a system image (API 33 or 34 is recommended for best compatibility)
   - If you don't have the system image downloaded, click "Download" next to it
   - Click "Next" and then "Finish"

5. **Start the Emulator**:

   - In the AVD Manager, click the play button (▶️) next to your virtual device
   - Wait for the emulator to fully boot up (you'll see the Android home screen)

6. **Run Expo Again**:
   - Once the emulator is running, try again:
   ```
   npx expo start --android
   ```

### Using a Physical Android Device

To use a physical Android device for development:

1. **Enable Developer Options** on your device:

   - Go to Settings > About Phone
   - Tap "Build Number" 7 times until you see "You are now a developer"

2. **Enable USB Debugging**:

   - Go to Settings > System > Developer Options
   - Turn on "USB Debugging"

3. **Connect your device** to your computer with a USB cable

4. **Accept the USB debugging prompt** on your device

5. **Verify connection** in Terminal:

   ```bash
   adb devices
   # Should list your connected device
   ```

6. **Run Expo**:
   ```
   npx expo start --android
   ```

### 2.3 Real Device (Local Network)

```bash
npx expo start   # scan QR with Expo Go (iOS or Android)
# Your device must be on the same local network as your computer
```

## 3. Adding Material 3 Expressive

### 3.1 Install Libraries

```bash
npx expo install react-native-paper react-native-vector-icons \
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
npx expo install expo-font @expo-google-fonts/roboto
```

Load `Roboto_400Regular` / `Roboto_500Medium` and map them onto Paper's MD3 text styles.

### 3.5 Motion & Shapes

```bash
npx expo install moti
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

### 4.1 Context7 MCP for Up-to-Date Documentation

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
