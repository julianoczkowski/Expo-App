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
import { useMaterial3Theme } from "@pchmn/expo-material3-theme";
import {
  MD3LightTheme,
  MD3DarkTheme,
  PaperProvider,
  adaptNavigationTheme,
} from "react-native-paper";
import { Roboto_400Regular, Roboto_500Medium } from "@expo-google-fonts/roboto";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
    Roboto_400Regular,
    Roboto_500Medium,
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
  const { theme: sysTheme } = useMaterial3Theme();

  // Create Material 3 theme with dynamic color
  const paperTheme =
    colorScheme === "dark"
      ? {
          ...MD3DarkTheme,
          colors: sysTheme.dark,
          fonts: {
            ...MD3DarkTheme.fonts,
            bodyMedium: {
              ...MD3DarkTheme.fonts.bodyMedium,
              fontFamily: "Roboto_400Regular",
            },
            titleMedium: {
              ...MD3DarkTheme.fonts.titleMedium,
              fontFamily: "Roboto_500Medium",
            },
          },
          roundness: 16, // Expressive style uses more rounded corners
        }
      : {
          ...MD3LightTheme,
          colors: sysTheme.light,
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
          roundness: 16, // Expressive style uses more rounded corners
        };

  // Adapt navigation theme to match Paper theme
  const { LightTheme, DarkTheme: NavigationDarkTheme } = adaptNavigationTheme({
    reactNavigationLight: DefaultTheme,
    reactNavigationDark: DarkTheme,
    materialLight: paperTheme,
    materialDark: paperTheme,
  });

  const navigationTheme =
    colorScheme === "dark" ? NavigationDarkTheme : LightTheme;

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
