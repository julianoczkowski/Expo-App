import { StyleSheet } from "react-native";
import { Button, Card, Text, useTheme, Surface } from "react-native-paper";
import { View } from "@/components/Themed";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MotiView } from "moti";

export default function HomeScreen() {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Material 3 Expressive
      </Text>

      <MotiView
        from={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "timing", duration: 500 }}
        style={styles.cardContainer}
      >
        <Card style={styles.card}>
          <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
          <Card.Title
            title="Material Design"
            subtitle="Beautiful, animated interfaces"
            left={(props) => (
              <MaterialCommunityIcons
                {...props}
                name="palette-swatch"
                size={30}
                color={theme.colors.primary}
              />
            )}
          />
          <Card.Content>
            <Text variant="bodyMedium">
              Material 3 Expressive combines the best of Material You with
              expressive motion and rounded shapes.
            </Text>
          </Card.Content>
          <Card.Actions>
            <Button>Cancel</Button>
            <Button mode="contained">Ok</Button>
          </Card.Actions>
        </Card>
      </MotiView>

      <MotiView
        from={{ translateY: 20, opacity: 0 }}
        animate={{ translateY: 0, opacity: 1 }}
        transition={{ type: "timing", delay: 300, duration: 500 }}
      >
        <Surface style={styles.surface} elevation={1}>
          <MaterialCommunityIcons
            name="theme-light-dark"
            size={24}
            color={theme.colors.primary}
          />
          <Text variant="bodyMedium" style={styles.surfaceText}>
            Dynamic color adapts to system theme
          </Text>
        </Surface>
      </MotiView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontFamily: "Roboto_500Medium",
    marginBottom: 24,
  },
  cardContainer: {
    width: "100%",
    maxWidth: 400,
    marginBottom: 24,
  },
  card: {
    marginHorizontal: 16,
  },
  surface: {
    padding: 16,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  surfaceText: {
    fontFamily: "Roboto_400Regular",
  },
});
