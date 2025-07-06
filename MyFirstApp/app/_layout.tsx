import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { useColorScheme } from "react-native";
import {
  MD3LightTheme,
  MD3DarkTheme,
  PaperProvider,
  adaptNavigationTheme,
  configureFonts,
} from "react-native-paper";
import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

// Import custom brand colors
import customTheme from "../assets/material-theme.json";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Define font configuration for Material 3 typography
const fontConfig = {
  fontFamily: "Roboto_400Regular",
  headingFontFamily: "Roboto_700Bold",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  // Use custom brand colors from material-theme.json
  // But merge with the base theme to ensure all required properties exist
  const brandLightColors = {
    ...MD3LightTheme.colors,
    ...customTheme.schemes.light,
  };

  const brandDarkColors = {
    ...MD3DarkTheme.colors,
    ...customTheme.schemes.dark,
  };

  // Configure fonts for Material 3 typography
  const fonts = configureFonts({
    config: {
      ...fontConfig,
    },
  });

  // Create Material 3 theme with brand colors and typography
  const paperTheme =
    colorScheme === "dark"
      ? {
          ...MD3DarkTheme,
          colors: brandDarkColors,
          fonts,
          roundness: 12,
          animation: {
            scale: 1.0,
          },
        }
      : {
          ...MD3LightTheme,
          colors: brandLightColors,
          fonts,
          roundness: 12,
          animation: {
            scale: 1.0,
          },
        };

  // Adapt navigation theme to match Paper theme
  const { LightTheme, DarkTheme: NavigationDarkTheme } = adaptNavigationTheme({
    reactNavigationLight: DefaultTheme,
    reactNavigationDark: DarkTheme,
  });

  // Merge navigation theme with our custom colors
  const combinedLightTheme = {
    ...LightTheme,
    colors: {
      ...LightTheme.colors,
      primary: brandLightColors.primary,
      background: brandLightColors.background,
      card: brandLightColors.surfaceContainer,
      text: brandLightColors.onSurface,
      border: brandLightColors.outline,
      notification: brandLightColors.error,
    },
  };

  const combinedDarkTheme = {
    ...NavigationDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      primary: brandDarkColors.primary,
      background: brandDarkColors.background,
      card: brandDarkColors.surfaceContainer,
      text: brandDarkColors.onSurface,
      border: brandDarkColors.outline,
      notification: brandDarkColors.error,
    },
  };

  const navigationTheme =
    colorScheme === "dark" ? combinedDarkTheme : combinedLightTheme;

  return (
    <PaperProvider theme={paperTheme}>
      <ThemeProvider value={navigationTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: "modal" }} />
        </Stack>
      </ThemeProvider>
    </PaperProvider>
  );
}
