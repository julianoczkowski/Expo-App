import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, View, ScrollView } from "react-native";
import { useTheme } from "react-native-paper";
import { Text, Button, Card, Chip, Divider, List } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MotiView } from "moti";
import { useRouter } from "expo-router";
import BottomToolbar from "@/components/BottomToolbar";

export default function ModalScreen() {
  const theme = useTheme();
  const router = useRouter();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollContent: {
      padding: 20,
      paddingBottom: 100, // Extra padding at the bottom for the toolbar
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      marginBottom: 8,
      color: theme.colors.onBackground,
    },
    subtitle: {
      fontSize: 16,
      marginBottom: 24,
      color: theme.colors.onSurfaceVariant,
    },
    separator: {
      marginVertical: 24,
      height: 1,
      width: "100%",
      backgroundColor: theme.colors.outlineVariant,
    },
    card: {
      marginBottom: 24,
      borderRadius: theme.roundness,
      backgroundColor: theme.colors.surface,
      ...(theme.dark && {
        borderWidth: 1,
        borderColor: theme.colors.outline,
      }),
    },
    cardContent: {
      paddingHorizontal: 16,
      paddingTop: 8,
      paddingBottom: 16,
    },
    cardActions: {
      paddingHorizontal: 16,
      paddingBottom: 16,
      paddingTop: 8,
      justifyContent: "space-between", // Change to space-between to put buttons on opposite sides
    },
    cardIcon: {
      marginRight: 8,
      color: theme.colors.primary,
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: "500",
      color: theme.colors.onSurface,
    },
    cardSubtitle: {
      fontSize: 14,
      color: theme.colors.onSurfaceVariant,
    },
    chipContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
      marginTop: 16,
    },
    transparentBg: {
      backgroundColor: "transparent",
    },
    listItem: {
      backgroundColor: "transparent",
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 16,
      backgroundColor: "transparent",
    },
    button: {
      marginRight: 8,
    },
    cardElevated: {
      // Material 3 specs: Elevated cards have 1dp elevation in resting state
      elevation: 1,
      backgroundColor: theme.colors.surface,
    },
    cardFilled: {
      // Material 3 specs: Filled cards have 0dp elevation and use surfaceVariant color
      elevation: 0,
      backgroundColor: theme.colors.surfaceVariant,
    },
    cardOutlined: {
      // Material 3 specs: Outlined cards have 0dp elevation and a 1dp stroke
      elevation: 0,
      borderWidth: 1,
      borderColor: theme.colors.outline,
      backgroundColor: theme.colors.surface,
    },
  });

  // Handle toolbar actions
  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Animated header */}
        <MotiView
          from={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 500 }}
          style={styles.transparentBg}
        >
          <Text style={styles.title}>Material 3 Cards</Text>
          <Text style={styles.subtitle}>
            Showcasing different card types following Material 3 guidelines
          </Text>
        </MotiView>

        <Divider style={styles.separator} />

        {/* Elevated Card */}
        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "timing", delay: 200, duration: 500 }}
          style={styles.transparentBg}
        >
          <Card style={[styles.card, styles.cardElevated]} mode="elevated">
            <Card.Content style={styles.cardContent}>
              <View
                style={[
                  styles.row,
                  { marginBottom: 4, backgroundColor: "transparent" },
                ]}
              >
                <MaterialCommunityIcons
                  name="palette"
                  size={24}
                  style={styles.cardIcon}
                />
                <View style={{ backgroundColor: "transparent" }}>
                  <Text style={styles.cardTitle}>Elevated Card</Text>
                  <Text style={styles.cardSubtitle}>
                    With custom brand colors
                  </Text>
                </View>
              </View>
              <Text variant="bodyMedium">
                According to Material 3 guidelines, elevated cards have a
                default elevation of 1dp and cast a shadow. They're designed to
                stand out as interactive elements on the page.
              </Text>
            </Card.Content>
            <Card.Actions style={styles.cardActions}>
              <Button mode="text" style={styles.button}>
                Cancel
              </Button>
              <Button mode="contained" style={styles.button}>
                Ok
              </Button>
            </Card.Actions>
          </Card>
        </MotiView>

        {/* Filled Card */}
        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "timing", delay: 300, duration: 500 }}
          style={styles.transparentBg}
        >
          <Card style={[styles.card, styles.cardFilled]} mode="contained">
            <Card.Content style={styles.cardContent}>
              <View
                style={[
                  styles.row,
                  { marginBottom: 4, backgroundColor: "transparent" },
                ]}
              >
                <MaterialCommunityIcons
                  name="card"
                  size={24}
                  style={styles.cardIcon}
                />
                <View style={{ backgroundColor: "transparent" }}>
                  <Text style={styles.cardTitle}>Filled Card</Text>
                  <Text style={styles.cardSubtitle}>
                    With surfaceVariant color
                  </Text>
                </View>
              </View>
              <Text variant="bodyMedium">
                Filled cards use the surfaceVariant color and have no elevation.
                They're useful for presenting related content in a distinct
                grouping.
              </Text>

              <View style={[styles.chipContainer, styles.transparentBg]}>
                <Chip icon="palette" mode="outlined" onPress={() => {}}>
                  Primary
                </Chip>
                <Chip icon="palette-swatch" mode="outlined" onPress={() => {}}>
                  Secondary
                </Chip>
                <Chip
                  icon="palette-advanced"
                  mode="outlined"
                  onPress={() => {}}
                >
                  Tertiary
                </Chip>
              </View>
            </Card.Content>
          </Card>
        </MotiView>

        {/* Outlined Card */}
        <MotiView
          from={{ opacity: 0, translateX: -20 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ type: "timing", delay: 400, duration: 500 }}
          style={styles.transparentBg}
        >
          <Card style={[styles.card, styles.cardOutlined]} mode="outlined">
            <Card.Content style={styles.cardContent}>
              <View
                style={[
                  styles.row,
                  { marginBottom: 4, backgroundColor: "transparent" },
                ]}
              >
                <MaterialCommunityIcons
                  name="format-list-bulleted"
                  size={24}
                  style={styles.cardIcon}
                />
                <View style={{ backgroundColor: "transparent" }}>
                  <Text style={styles.cardTitle}>Outlined Card</Text>
                  <Text style={styles.cardSubtitle}>With List Components</Text>
                </View>
              </View>
              <List.Item
                title="First Item"
                description="Outlined cards have a border stroke but no elevation"
                left={(props) => <List.Icon {...props} icon="folder" />}
                style={styles.listItem}
              />
              <List.Item
                title="Second Item"
                description="They're ideal for secondary content that needs separation"
                left={(props) => <List.Icon {...props} icon="folder" />}
                style={styles.listItem}
              />
            </Card.Content>
          </Card>
        </MotiView>

        {/* Card with Image */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", delay: 500, duration: 500 }}
          style={styles.transparentBg}
        >
          <Card style={[styles.card, styles.cardElevated]} mode="elevated">
            <Card.Cover
              source={{ uri: "https://picsum.photos/700/400?random=2" }}
              style={{
                borderTopLeftRadius: theme.roundness,
                borderTopRightRadius: theme.roundness,
              }}
            />
            <Card.Content style={styles.cardContent}>
              <View
                style={[
                  styles.row,
                  { marginBottom: 4, backgroundColor: "transparent" },
                ]}
              >
                <MaterialCommunityIcons
                  name="image"
                  size={24}
                  style={styles.cardIcon}
                />
                <View style={{ backgroundColor: "transparent" }}>
                  <Text style={styles.cardTitle}>Card with Image</Text>
                  <Text style={styles.cardSubtitle}>
                    Images should have matching corner radius
                  </Text>
                </View>
              </View>
              <Text variant="bodyMedium">
                When using images in cards, ensure the top corners of the image
                match the card's corner radius. This creates a cohesive design
                that follows Material 3 guidelines.
              </Text>
            </Card.Content>
            <Card.Actions style={styles.cardActions}>
              <Button mode="text" style={styles.button}>
                Share
              </Button>
              <Button mode="contained" style={styles.button}>
                Explore
              </Button>
            </Card.Actions>
          </Card>
        </MotiView>
      </ScrollView>

      {/* Add the floating bottom toolbar */}
      <BottomToolbar
        onFabPress={() => console.log("Add pressed")}
        fabIcon="plus"
      />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}
