import { StyleSheet, ScrollView } from "react-native";
import {
  Text,
  Card,
  Button,
  useTheme,
  Surface,
  Avatar,
  Divider,
} from "react-native-paper";
import { MotiView } from "moti";
import { Link, useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from "@/components/Themed";
import BottomToolbar from "@/components/BottomToolbar";

export default function TabOneScreen() {
  const theme = useTheme();
  const router = useRouter();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollContent: {
      padding: 20,
      paddingTop: 60, // Increased top padding for more space above the title
      paddingBottom: 100, // Extra padding to account for bottom toolbar
    },
    header: {
      marginBottom: 24,
      marginTop: 20, // Additional margin at the top of the header
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      marginBottom: 8,
      color: theme.colors.onBackground,
    },
    subtitle: {
      fontSize: 16,
      color: theme.colors.onSurfaceVariant,
    },
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 16,
      color: theme.colors.onBackground,
    },
    card: {
      marginBottom: 16,
      overflow: "hidden",
      borderRadius: theme.roundness,
      backgroundColor: theme.colors.surface,
      ...(theme.dark && {
        borderWidth: 1,
        borderColor: theme.colors.outline,
      }),
    },
    cardContent: {
      paddingTop: 8,
      paddingBottom: 16,
      paddingHorizontal: 16,
    },
    cardActions: {
      justifyContent: "space-between", // Change to space-between to put buttons on opposite sides
      paddingHorizontal: 16,
      paddingBottom: 16,
      paddingTop: 8,
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
    row: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 16,
      backgroundColor: "transparent",
    },
    avatar: {
      marginRight: 16,
    },
    divider: {
      marginVertical: 12,
    },
    button: {
      marginRight: 8,
    },
    modalButton: {
      backgroundColor: theme.colors.primary,
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "flex-end",
      backgroundColor: "transparent",
    },
    // Card styles based on Material 3 guidelines
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
  const handleFabPress = () => {
    // Navigate to modal screen
    router.push("/modal");
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Animated Header */}
        <MotiView
          from={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 600 }}
          style={styles.header}
        >
          <Text style={styles.title}>Material 3 Expressive</Text>
          <Text style={styles.subtitle}>
            Showcasing your brand's custom green theme with Material 3
            components
          </Text>
        </MotiView>

        {/* Featured Card - Elevated Card */}
        <MotiView
          from={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "timing", delay: 200, duration: 500 }}
          style={styles.section}
        >
          <Card mode="elevated" style={[styles.card, styles.cardElevated]}>
            <Card.Cover
              source={{ uri: "https://picsum.photos/700/400?random=1" }}
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
                  name="palette"
                  size={24}
                  style={styles.cardIcon}
                />
                <View style={{ backgroundColor: "transparent" }}>
                  <Text style={styles.cardTitle}>Elevated Card</Text>
                  <Text style={styles.cardSubtitle}>Material 3 Design</Text>
                </View>
              </View>
              <Text variant="bodyMedium">
                Elevated cards have a default elevation of 1dp and cast a
                shadow. They're designed to stand out as interactive elements.
              </Text>
            </Card.Content>
            <Card.Actions style={styles.cardActions}>
              <Button mode="text" style={styles.button}>
                Learn More
              </Button>
              <Button
                mode="contained"
                style={styles.button}
                icon="arrow-right"
                onPress={() => router.push("/modal")}
              >
                Open Modal
              </Button>
            </Card.Actions>
          </Card>
        </MotiView>

        {/* Card Variations */}
        <MotiView
          from={{ opacity: 0, translateX: -20 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ type: "timing", delay: 300, duration: 500 }}
          style={styles.section}
        >
          <Text style={styles.sectionTitle}>Card Variations</Text>

          {/* Filled Card */}
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
                    Uses surfaceVariant color
                  </Text>
                </View>
              </View>
              <Text variant="bodyMedium">
                Filled cards use the surfaceVariant color and have no elevation.
                They're useful for presenting related content in a distinct
                grouping.
              </Text>
            </Card.Content>
          </Card>

          {/* Outlined Card */}
          <Card style={[styles.card, styles.cardOutlined]} mode="outlined">
            <Card.Content style={styles.cardContent}>
              <View
                style={[
                  styles.row,
                  { marginBottom: 4, backgroundColor: "transparent" },
                ]}
              >
                <MaterialCommunityIcons
                  name="card-outline"
                  size={24}
                  style={styles.cardIcon}
                />
                <View style={{ backgroundColor: "transparent" }}>
                  <Text style={styles.cardTitle}>Outlined Card</Text>
                  <Text style={styles.cardSubtitle}>Uses outline stroke</Text>
                </View>
              </View>
              <Text variant="bodyMedium">
                Outlined cards have a border stroke but no elevation. They're
                ideal for secondary content that needs separation.
              </Text>
            </Card.Content>
          </Card>
        </MotiView>

        {/* User Profiles - Using Outlined Card */}
        <MotiView
          from={{ opacity: 0, translateX: 20 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ type: "timing", delay: 400, duration: 500 }}
          style={styles.section}
        >
          <Text style={styles.sectionTitle}>User Profiles</Text>

          <Card mode="outlined" style={[styles.card, styles.cardOutlined]}>
            <Card.Content style={styles.cardContent}>
              <View
                style={[
                  styles.row,
                  { marginBottom: 4, backgroundColor: "transparent" },
                ]}
              >
                <MaterialCommunityIcons
                  name="account-group"
                  size={24}
                  style={styles.cardIcon}
                />
                <View style={{ backgroundColor: "transparent" }}>
                  <Text style={styles.cardTitle}>Team Members</Text>
                  <Text style={styles.cardSubtitle}>Design & Development</Text>
                </View>
              </View>
              <View style={[styles.row, { backgroundColor: "transparent" }]}>
                <Avatar.Image
                  size={48}
                  source={{
                    uri: "https://randomuser.me/api/portraits/women/17.jpg",
                  }}
                  style={styles.avatar}
                />
                <View style={{ backgroundColor: "transparent" }}>
                  <Text variant="titleMedium">Emma Johnson</Text>
                  <Text variant="bodyMedium">Designer</Text>
                </View>
              </View>
              <Divider style={styles.divider} />
              <View
                style={[
                  styles.row,
                  { backgroundColor: "transparent", marginBottom: 0 },
                ]}
              >
                <Avatar.Image
                  size={48}
                  source={{
                    uri: "https://randomuser.me/api/portraits/men/32.jpg",
                  }}
                  style={styles.avatar}
                />
                <View style={{ backgroundColor: "transparent" }}>
                  <Text variant="titleMedium">James Wilson</Text>
                  <Text variant="bodyMedium">Developer</Text>
                </View>
              </View>
            </Card.Content>
          </Card>
        </MotiView>

        {/* Call to Action - Using Elevated Card */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", delay: 500, duration: 500 }}
          style={styles.section}
        >
          <Card style={[styles.card, styles.cardElevated]} mode="elevated">
            <Card.Cover
              source={{ uri: "https://picsum.photos/700/400?random=3" }}
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
                  name="rocket-launch"
                  size={24}
                  style={styles.cardIcon}
                />
                <View style={{ backgroundColor: "transparent" }}>
                  <Text style={styles.cardTitle}>Ready to explore?</Text>
                  <Text style={styles.cardSubtitle}>Material 3 Components</Text>
                </View>
              </View>
              <Text variant="bodyMedium" style={{ marginBottom: 20 }}>
                Check out all the Material 3 components available in this demo
                app.
              </Text>
            </Card.Content>
            <Card.Actions style={styles.cardActions}>
              <Button
                mode="outlined"
                icon="book-open-variant"
                onPress={() => {}}
                style={styles.button}
              >
                Documentation
              </Button>
              <Button
                mode="contained"
                icon="arrow-right"
                onPress={() => {}}
                style={styles.button}
              >
                Get Started
              </Button>
            </Card.Actions>
          </Card>
        </MotiView>

        {/* Bottom padding */}
        <View style={{ height: 24 }} />
      </ScrollView>

      {/* Add the floating bottom toolbar */}
      <BottomToolbar onFabPress={handleFabPress} fabIcon="plus" />
    </View>
  );
}
