# Windows → Expo → Material 3 Expressive

## 🚀 30-Second Overview

| Component         | Choice                                                                              |
| ----------------- | ----------------------------------------------------------------------------------- |
| **Runtime**       | **Node 22 LTS "Jod"** – Active LTS until Apr 2027 ([nodejs.org][1])                 |
| **Mobile stack**  | **Expo SDK 53** (React Native 0.79, New Architecture default) ([expo.dev][2])       |
| **Design system** | **Material 3 Expressive** (Paper v5 + `expo-material3-theme`) ([m3.material.io][6]) |
| **Cloud build**   | **EAS Build** – ships iOS & Android binaries from the cloud                         |

## 1. Quick Start: Bootstrap Script (Windows)

Paste this script into PowerShell to have a live **Material 3 Expressive** app in under an hour—from a Windows PC, no Xcode required.

```bash
# You have to do this only once (step 0-1)
# 0. Prereqs -------------------------------------------------
winget install --id Git.Git -e
winget install --id OpenJS.NodeJS.LTS -e
winget install -e --id Azul.Zulu.17.JDK # If you get any errors run: winget source update
# Close and reopen the Powershell, run: java -version to check if the install was successful.
winget install --id Google.AndroidStudio -e

# 1. CLIs ----------------------------------------------------
npm i -g eas-cli

# This is where you create your app change the name MyFirstApp.
# 2. App -----------------------------------------------------
npx create-expo-app MyFirstApp --template tabs
cd MyFirstApp
npx expo install react-native-paper react-native-vector-icons \
             react-native-safe-area-context react-native-gesture-handler \
             react-native-reanimated react-native-screens \
             @pchmn/expo-material3-theme
npx expo start
```

## 2. Running Your App

### 2.1 Android Emulator

```bash
# make sure Pixel 8 (API 35) AVD is running
npx expo start --android
```

### Android SDK PATH Setup

If you encounter errors related to Android tools not being found, you need to add Android SDK to your PATH:

1. **Open PowerShell as Administrator** (right-click on PowerShell and select "Run as Administrator")

2. **Set the Android SDK environment variables**:

   ```powershell
   [Environment]::SetEnvironmentVariable("ANDROID_HOME", "$env:USERPROFILE\AppData\Local\Android\Sdk", "User")
   [Environment]::SetEnvironmentVariable("PATH", "$env:PATH;$env:USERPROFILE\AppData\Local\Android\Sdk\platform-tools;$env:USERPROFILE\AppData\Local\Android\Sdk\emulator", "User")
   ```

3. **Restart PowerShell** and verify the setup:

   ```powershell
   echo $env:ANDROID_HOME
   # Should display the path to your Android SDK

   adb --version
   # Should display the Android Debug Bridge version
   ```

4. **Restart your computer** if the changes don't take effect immediately

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

5. **Verify connection** in PowerShell:

   ```powershell
   adb devices
   # Should list your connected device
   ```

6. **Run Expo**:
   ```
   npx expo start --android
   ```

### 2.2 Real Device (Local Network)

```bash
npx expo start
# Scan the QR code with Expo Go app (Play Store / App Store)
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

Paper v5 provides a full MD3 component kit; `expo-material3-theme` injects dynamic-color palettes (Android 12+) ([m3.material.io][6])

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

  return (
    <PaperProvider theme={paperTheme}>
      {/* your navigation stack / router */}
    </PaperProvider>
  );
}
```

Dynamic color now powers every Paper component out-of-the-box. For devices < Android 12 or on iOS, `sysTheme` provides a sensible fallback palette.

### 3.3 Brand Palette (Optional)

1. Open **Material Theme Builder** → pick your **seed color**
2. Export the **JSON** for _light_ & _dark_
3. Replace `sysTheme.light` / `sysTheme.dark` with the exported objects

### 3.4 Typography

```bash
npx expo install expo-font @expo-google-fonts/roboto
```

```tsx
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
} from "@expo-google-fonts/roboto";
const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_500Medium });

const paperTheme = {
  ...MD3LightTheme,
  fonts: {
    ...MD3LightTheme.fonts,
    bodyMedium: {
      ...MD3LightTheme.fonts.bodyMedium,
      fontFamily: "Roboto_400Regular",
    },
    titleMedium: {
      ...MD3LightTheme.fonts.titleMedium,
      fontFamily: "Roboto_500Medium",
    },
  },
};
```

### 3.5 Motion & Shapes

```bash
npx expo install moti       # spring-based shared-element & choreographed transitions
```

- Increase `roundness` to `16` for the softer Expressive radius
- Use `<MotiView>` / `<MotiImage>` for Expressive animations

### 3.6 Icons

```tsx
import { MaterialCommunityIcons } from "@expo/vector-icons";
<MaterialCommunityIcons name="palette-swatch" size={28} />;
```

Use **Filled** icons for primary actions, **Outlined** for secondary.

### 3.7 Navigation Colors

```tsx
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { adaptNavigationTheme } from "react-native-paper";
const { LightTheme } = adaptNavigationTheme({
  reactNavigationLight: DefaultTheme,
});

<NavigationContainer theme={LightTheme}> … </NavigationContainer>;
```

## 4. Recommended IDE Extensions

| Extension                  | Purpose                 |
| -------------------------- | ----------------------- |
| **React Native Tools**     | Run / attach debugger   |
| **Radon IDE**              | In-editor AVD / iOS sim |
| **ESLint** + **Prettier**  | Auto-format & lint      |
| **ES7+ React/TS Snippets** | Boilerplate shortcuts   |

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
eas build:configure          # creates eas.json
eas build -p ios --profile development     # .ipa from macOS worker
eas build -p android --profile preview     # universal .apk
```

Roll out OTA fixes any time:

```bash
eas update --branch main -m "Fix splash jitter"
```

## 6. Everyday Workflow

```text
🛠  code .         # edit in Cursor (TS, Figma API, etc.)
🔥  npx expo start # hot-reload on emulator / phone
✅  git commit     # keep history
📦  eas build      # cloud .ipa / .apk when you need testers
🚀  eas update     # instant bug-fixes after launch
```

## 7. Troubleshooting

| Problem                   | Solution                                                  |
| ------------------------- | --------------------------------------------------------- |
| Metro stuck at 99%        | `adb reverse tcp:8081 tcp:8081` then reload               |
| "SDK mismatch" in Expo Go | Update Expo Go **or** run `npx expo prebuild`             |
| Blank emulator screen     | _AVD Manager → Wipe Data_; ensure **64-bit** system image |
| Device can't connect      | Ensure device is on same WiFi network as your computer    |

## 8. Upgrade Cadence

- Expo ships a new SDK every ~3 months; upgrade one version at a time ([docs.expo.dev][8])
- Node 22 is safe through April 2027 ([nodejs.org][1])

## 9. If you get stuck

Just copy this entire content to Cursor or other LLM and ask it to set the Expo app for you.

---

[1]: https://nodejs.org/en/about/previous-releases?utm_source=chatgpt.com "Node.js Releases"
[2]: https://expo.dev/changelog/sdk-53?utm_source=chatgpt.com "Expo SDK 53 - Expo Changelog"
[3]: https://developer.android.com/studio/releases?utm_source=chatgpt.com "Android Studio Narwhal | 2025.1.1 - Android Developers"
[4]: https://github.com/callstack/react-native-paper/releases?utm_source=chatgpt.com "Releases · callstack/react-native-paper - GitHub"
[5]: https://github.com/pchmn/expo-material3-theme?utm_source=chatgpt.com "pchmn/expo-material3-theme: Manage Material 3 theme in ... - GitHub"
[6]: https://m3.material.io/blog/building-with-m3-expressive?utm_source=chatgpt.com "Start building with Material 3 Expressive"
[7]: https://m3.material.io/?utm_source=chatgpt.com "Material Design 3 - Google's latest open source design system"
[8]: https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/?utm_source=chatgpt.com "Upgrade Expo SDK - Expo Documentation"
[9]: https://github.com/upstash/context7 "Context7 MCP - Up-to-date Code Documentation For Any Prompt"
