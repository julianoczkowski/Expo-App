import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, ScrollView } from "react-native";
import { Text, Card, Chip, Button, useTheme } from "react-native-paper";
import { View } from "@/components/Themed";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MotiView } from "moti";

export default function ModalScreen() {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <MotiView
          from={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 500 }}
          style={styles.header}
        >
          <Text variant="headlineMedium" style={styles.title}>
            About Material 3
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            Material 3 is the latest version of Google's Material Design system
          </Text>
        </MotiView>

        <MotiView
          from={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 200, duration: 500 }}
        >
          <Card style={styles.card}>
            <Card.Content>
              <Text variant="titleMedium" style={styles.cardTitle}>
                Key Features
              </Text>

              <View style={styles.chipContainer}>
                <Chip
                  icon="palette"
                  style={styles.chip}
                  textStyle={styles.chipText}
                >
                  Dynamic Color
                </Chip>
                <Chip
                  icon="animation"
                  style={styles.chip}
                  textStyle={styles.chipText}
                >
                  Motion
                </Chip>
                <Chip
                  icon="shape"
                  style={styles.chip}
                  textStyle={styles.chipText}
                >
                  Expressive Shapes
                </Chip>
              </View>

              <Text variant="bodyMedium" style={styles.paragraph}>
                Material 3 Expressive brings a more playful, vibrant design
                system with rounded corners, dynamic colors that adapt to your
                device theme, and fluid animations that make your app feel
                alive.
              </Text>

              <Text variant="bodyMedium" style={styles.paragraph}>
                This example showcases the Paper components library integrated
                with Expo's powerful tools.
              </Text>
            </Card.Content>
          </Card>
        </MotiView>

        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 400, duration: 500 }}
          style={styles.buttonContainer}
        >
          <Button
            mode="contained"
            icon={({ size, color }) => (
              <MaterialCommunityIcons name="web" size={size} color={color} />
            )}
            style={styles.button}
            onPress={() => console.log("Learn more")}
          >
            Learn More
          </Button>
        </MotiView>
      </ScrollView>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontFamily: "Roboto_500Medium",
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: "Roboto_400Regular",
    opacity: 0.7,
  },
  card: {
    marginBottom: 24,
    borderRadius: 16,
  },
  cardTitle: {
    fontFamily: "Roboto_500Medium",
    marginBottom: 16,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  chip: {
    marginBottom: 8,
  },
  chipText: {
    fontFamily: "Roboto_400Regular",
  },
  paragraph: {
    marginBottom: 12,
  },
  buttonContainer: {
    alignItems: "center",
  },
  button: {
    borderRadius: 16,
  },
});
