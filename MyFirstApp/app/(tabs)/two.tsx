import { StyleSheet, ScrollView } from "react-native";
import { Avatar, List, Divider, FAB, useTheme, Text } from "react-native-paper";
import { View } from "@/components/Themed";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MotiView } from "moti";

export default function ProfileScreen() {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <MotiView
          from={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "timing", duration: 500 }}
          style={styles.profileHeader}
        >
          <Avatar.Image
            size={100}
            source={{ uri: "https://picsum.photos/200" }}
            style={styles.avatar}
          />
          <Text variant="headlineMedium" style={styles.name}>
            John Doe
          </Text>
          <Text variant="bodyMedium" style={styles.bio}>
            Material 3 Expressive Developer
          </Text>
        </MotiView>

        <Divider style={styles.divider} />

        <List.Section>
          <List.Subheader>Settings</List.Subheader>

          <MotiView
            from={{ translateX: -20, opacity: 0 }}
            animate={{ translateX: 0, opacity: 1 }}
            transition={{ delay: 200, duration: 500 }}
          >
            <List.Item
              title="Account"
              description="Privacy and security"
              left={(props) => <List.Icon {...props} icon="account-cog" />}
              right={(props) => (
                <MaterialCommunityIcons
                  {...props}
                  name="chevron-right"
                  size={24}
                />
              )}
            />
          </MotiView>

          <MotiView
            from={{ translateX: -20, opacity: 0 }}
            animate={{ translateX: 0, opacity: 1 }}
            transition={{ delay: 300, duration: 500 }}
          >
            <List.Item
              title="Appearance"
              description="Theme and display options"
              left={(props) => <List.Icon {...props} icon="palette" />}
              right={(props) => (
                <MaterialCommunityIcons
                  {...props}
                  name="chevron-right"
                  size={24}
                />
              )}
            />
          </MotiView>

          <MotiView
            from={{ translateX: -20, opacity: 0 }}
            animate={{ translateX: 0, opacity: 1 }}
            transition={{ delay: 400, duration: 500 }}
          >
            <List.Item
              title="Notifications"
              description="Message and app alerts"
              left={(props) => <List.Icon {...props} icon="bell" />}
              right={(props) => (
                <MaterialCommunityIcons
                  {...props}
                  name="chevron-right"
                  size={24}
                />
              )}
            />
          </MotiView>
        </List.Section>
      </ScrollView>

      <FAB
        icon="plus"
        style={[styles.fab, { backgroundColor: theme.colors.primaryContainer }]}
        color={theme.colors.onPrimaryContainer}
        onPress={() => console.log("Pressed")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 80,
  },
  profileHeader: {
    alignItems: "center",
    padding: 24,
  },
  avatar: {
    marginBottom: 16,
  },
  name: {
    fontFamily: "Roboto_500Medium",
    marginBottom: 4,
  },
  bio: {
    fontFamily: "Roboto_400Regular",
    opacity: 0.7,
  },
  divider: {
    marginVertical: 8,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    borderRadius: 16,
  },
});
