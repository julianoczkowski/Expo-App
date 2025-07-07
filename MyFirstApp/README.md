# Material 3 Expressive Theme Implementation

## Getting Started

Follow these instructions to set up the project on your local machine.

### Prerequisites

Ensure you have Git and Node.js (LTS) installed. For running on an Android device or emulator, you'll need the Android SDK. Refer to `../Docs/setup_pc.md` for a complete guide.

### 1. Clone the Repository

Clone the project from GitHub. Replace `<repository-url>` with the actual URL.

```bash
git clone <repository-url>
```

Navigate into the cloned directory:

```bash
cd <repository-directory>
```

### 2. Install Dependencies

The project's dependencies are managed with npm. Navigate to the app's folder and install them.

```bash
cd MyFirstApp
```

```bash
npm install
```

### 3. Run the Application

You can run the app using Expo's command-line tools.

#### Run with Expo Go

To start the Metro bundler and get a QR code to run the app on your physical device with Expo Go:

```bash
npx expo start
```

#### Run on Android

To run the app directly on a connected Android emulator or device:

```bash
npx expo start --android
```

This app demonstrates the implementation of Material 3 Expressive design system in an Expo React Native application, featuring a custom yellow-based brand theme.

## Theme Implementation

### Custom Brand Colors

The app uses a custom yellow seed color (`#FFDE3F`) to generate a complete Material 3 color system:

```
seed: "#FFDE3F"
```

The theme is defined in `assets/material-theme.json` and includes:

- Complete tonal palette for primary, secondary, and tertiary colors
- Surface and background colors
- Proper contrast colors for accessibility
- Light and dark theme variants

### Theme Integration

The theme is integrated in `app/_layout.tsx` with these key features:

- **Dynamic Color System**: Adapts to light/dark mode
- **Typography**: Roboto font family with appropriate weights
- **Roundness**: 16dp corner radius for the Expressive style
- **Navigation Theme**: Properly adapted for consistent experience

## App Features

### Components Showcase

The app demonstrates Material 3 components with proper styling:

- **Cards**: Both elevated and outlined variants
- **Buttons**: Text, outlined, and contained variants
- **Surface**: Multiple elevation levels
- **FAB**: Floating action button with proper elevation
- **Lists**: With icons and proper typography
- **Chips**: For selection and filtering
- **Avatars**: With proper sizing and colors

### Motion & Animation

Material 3 Expressive motion is implemented using Moti:

- Staggered animations for content loading
- Spring physics for natural movement
- Proper timing for transitions

### Screens

- **Home Screen**: Showcases cards, surfaces, and content layouts
- **Modal Screen**: Demonstrates additional Material 3 components

## Material 3 Design Principles Applied

- **Color Usage**: Proper application of color roles (primary on onPrimary, etc.)
- **Elevation**: Consistent elevation system with appropriate shadows
- **Typography**: Proper text hierarchy and styling
- **Shape**: Consistent corner radius across components
- **Accessibility**: Proper contrast ratios between text and backgrounds

## Resources

- [Material 3 Documentation](https://m3.material.io/)
- [Material Theme Builder](https://m3.material.io/theme-builder)
- [React Native Paper](https://callstack.github.io/react-native-paper/)
