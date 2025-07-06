import React from "react";
import { StyleSheet } from "react-native";
import { FAB, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MotiView } from "moti";

type BottomToolbarProps = {
  onFabPress?: () => void;
  fabIcon?: string;
};

/**
 * A floating action button in the bottom right corner.
 */
export default function BottomToolbar({
  onFabPress,
  fabIcon = "plus",
}: BottomToolbarProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <MotiView
      from={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "timing", duration: 300, delay: 150 }}
      style={[
        styles.container,
        {
          right: 16 + insets.right,
          bottom: 16 + insets.bottom,
        },
      ]}
    >
      <FAB
        icon={fabIcon}
        onPress={onFabPress}
        style={{ backgroundColor: theme.colors.primaryContainer }}
        color={theme.colors.onPrimaryContainer}
        size="medium" // A standalone FAB is usually larger
      />
    </MotiView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 1000,
  },
});
