# Windows → Expo → Material 3 Expressive

### Project Components

| Component         | Choice                                                                              |
| ----------------- | ----------------------------------------------------------------------------------- |
| **Runtime**       | **Node 22 LTS "Jod"** – Active LTS until Apr 2027 ([nodejs.org][1])                 |
| **Mobile stack**  | **Expo SDK 53** (React Native 0.79, New Architecture default) ([expo.dev][2])       |
| **Design system** | **Material 3 Expressive** (Paper v5 + `expo-material3-theme`) ([m3.material.io][6]) |
| **Cloud build**   | **EAS Build** – ships iOS & Android binaries from the cloud                         |

## 1. Quick Start: Bootstrap Script (Windows)

Paste these commands into PowerShell to have a live **Material 3 Expressive** app in under an hour—from a Windows PC, no Xcode required.

_You only have to install the prerequisites (step 0) once._

### 0. Prerequisites

```powershell
winget install --id Git.Git -e
```

```powershell
winget install --id OpenJS.NodeJS.LTS -e
```

```powershell
winget install -e --id Azul.Zulu.17.JDK
```

> **Note**: After installing the JDK, close and reopen PowerShell. Run `java -version` to confirm it was successful. If you get any errors, try `winget source update`.

```powershell
winget install --id Google.AndroidStudio -e
```

### 1. CLIs

```powershell
npm i -g eas-cli
```

### 2. App

This is where you create your app. You can change `MyFirstApp` to your project's name.

```powershell
npx create-expo-app MyFirstApp --template tabs
```

```powershell
cd MyFirstApp
```

Install the core Material Design library and its icons.

```powershell
npx expo install react-native-paper react-native-vector-icons
```

Install the dependencies for navigation.

```powershell
npx expo install react-native-safe-area-context react-native-gesture-handler react-native-reanimated react-native-screens
```

Install the Material 3 theme helper.

```powershell
npx expo install '@pchmn/expo-material3-theme'
```

```powershell
npx expo start
```

## 2. Running Your App

There are three primary ways to run your Expo app during development.

### 2.1 Using the Android Emulator

The recommended method is to use an Android Emulator, which allows you to run a virtualized Android device directly on your PC.

1.  **Open Android Studio**

2.  **Open the AVD Manager**:

    - Click on "More Actions" or the three dots in the top-right corner.
    - Select "Virtual Device Manager" or "AVD Manager".

3.  **Create a New Virtual Device**:

    - Click the "Create Virtual Device" button.
    - Select a phone definition (Pixel 8 is recommended).
    - Click "Next".

4.  **Select a System Image**:

    - Choose a system image (API 33 or 34 is recommended for best compatibility).
    - If you don't have the system image downloaded, click "Download" next to it.
    - Click "Next" and then "Finish".

5.  **Start the Emulator**:

    - In the AVD Manager, click the play button (▶️) next to your virtual device.
    - Wait for the emulator to fully boot up (you'll see the Android home screen).

6.  **Run Expo on the Emulator**:
    - Once the emulator is running, start the server from your terminal:
    - `npx expo start --android`

### 2.2 Using a Physical Android Device (USB)

To use a physical Android device for development:

1.  **Enable Developer Options** on your device:

    - Go to **Settings > About Phone**.
    - Tap "Build Number" 7 times until you see "You are now a developer".

2.  **Enable USB Debugging**:

    - Go to **Settings > System > Developer Options**.
    - Turn on "USB Debugging".

3.  **Connect your device** to your computer with a USB cable.

4.  **Accept the USB debugging prompt** on your device.

5.  **Verify the connection** in PowerShell:

    ```powershell
    adb devices
    # Should list your connected device
    ```

6.  **Run Expo**:
    ```powershell
    npx expo start --android
    ```

### 2.3 Using a Real Device (Local Network)

You can also run the app on any physical device (Android or iOS) using the **Expo Go** app, as long as it's on the same Wi-Fi network as your computer.

```bash
npx expo start
# Scan the QR code with the Expo Go app (Play Store / App Store)
```

### 2.4 Android SDK PATH Setup (Troubleshooting)

If you encounter errors related to Android tools not being found (`adb` command not recognized), you may need to add the Android SDK to your PATH.

1.  **Open PowerShell as Administrator** (right-click on PowerShell and select "Run as Administrator").

2.  **Set the Android SDK environment variables**:

    ```powershell
    [Environment]::SetEnvironmentVariable("ANDROID_HOME", "$env:USERPROFILE\AppData\Local\Android\Sdk", "User")
    [Environment]::SetEnvironmentVariable("PATH", "$env:PATH;$env:USERPROFILE\AppData\Local\Android\Sdk\platform-tools;$env:USERPROFILE\AppData\Local\Android\Sdk\emulator", "User")
    ```

3.  **Restart PowerShell** and verify the setup:

    ```powershell
    echo $env:ANDROID_HOME
    # Should display the path to your Android SDK

    adb --version
    # Should display the Android Debug Bridge version
    ```

4.  **Restart your computer** if the changes don't take effect immediately.

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

| Extension                  | Purpose                 |
| -------------------------- | ----------------------- |
| **React Native Tools**     | Run / attach debugger   |
| **Radon IDE**              | In-editor AVD / iOS sim |
| **ESLint** + **Prettier**  | Auto-format & lint      |
| **ES7+ React/TS Snippets** | Boilerplate shortcuts   |

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
| `require.context` error   | Run `npx expo prebuild --clean` if Metro bundler fails    |
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
