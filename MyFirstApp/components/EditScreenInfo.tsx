import React from "react";
import { StyleSheet } from "react-native";
import { Text, useTheme } from "react-native-paper";

import { ExternalLink } from "./ExternalLink";
import { MonoText } from "./StyledText";
import { View } from "./Themed";

export default function EditScreenInfo({ path }: { path: string }) {
  const theme = useTheme();

  return (
    <View>
      <View style={styles.getStartedContainer}>
        <Text style={styles.getStartedText}>Hey Youtube Fam! :</Text>

        <View
          style={[
            styles.codeHighlightContainer,
            styles.homeScreenFilename,
            { backgroundColor: theme.colors.surfaceVariant },
          ]}
        >
          <MonoText style={{ color: theme.colors.onSurfaceVariant }}>
            {path}
          </MonoText>
        </View>

        <Text style={styles.getStartedText}>
          Change any of the text, save the file, and your app will automatically
          update.
        </Text>
      </View>

      <View style={styles.helpContainer}>
        <ExternalLink
          style={styles.helpLink}
          href="https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet"
        >
          <Text style={[styles.helpLinkText, { color: theme.colors.primary }]}>
            Tap here if your app doesn't automatically update after making
            changes
          </Text>
        </ExternalLink>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: "center",
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: "center",
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: "center",
  },
});
