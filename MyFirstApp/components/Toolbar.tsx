import React from "react";
import { StyleSheet, View, TouchableOpacity, StatusBar } from "react-native";
import { Appbar, useTheme, IconButton, Menu } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MotiView } from "moti";
import { useRouter, usePathname } from "expo-router";

type ToolbarProps = {
  title?: string;
  showBackButton?: boolean;
  actions?: {
    icon: string;
    label: string;
    onPress: () => void;
    showAsAction?: boolean;
  }[];
  elevated?: boolean;
};

/**
 * Material 3 Toolbar component
 * Based on Material Design specifications: https://m3.material.io/components/toolbars
 */
export default function Toolbar({
  title,
  showBackButton = false,
  actions = [],
  elevated = true,
}: ToolbarProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const pathname = usePathname();
  const [menuVisible, setMenuVisible] = React.useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  // Separate visible actions from overflow menu actions
  const visibleActions = actions.filter(
    (action) => action.showAsAction !== false
  );
  const menuActions = actions.filter((action) => action.showAsAction === false);

  // Determine if we need an overflow menu
  const hasOverflowMenu = menuActions.length > 0;

  // Handle navigation back
  const handleBack = () => {
    if (pathname === "/") {
      // We're at the root, do nothing or handle specially
      return;
    }
    router.back();
  };

  return (
    <MotiView
      from={{ opacity: 0, translateY: -10 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "timing", duration: 300 }}
    >
      <Appbar.Header
        elevated={elevated}
        statusBarHeight={insets.top}
        style={[
          styles.header,
          {
            backgroundColor: elevated
              ? theme.colors.surface
              : theme.colors.background,
            borderBottomColor: elevated
              ? "transparent"
              : theme.colors.outlineVariant,
            borderBottomWidth: elevated ? 0 : 1,
          },
        ]}
      >
        {showBackButton && (
          <Appbar.BackAction
            onPress={handleBack}
            color={theme.colors.onSurface}
            accessibilityLabel="Back"
          />
        )}

        {title && (
          <Appbar.Content
            title={title}
            color={theme.colors.onSurface}
            titleStyle={styles.title}
          />
        )}

        {/* Visible action buttons */}
        {visibleActions.map((action, index) => (
          <Appbar.Action
            key={`${action.icon}-${index}`}
            icon={action.icon}
            iconColor={theme.colors.onSurfaceVariant}
            onPress={action.onPress}
            accessibilityLabel={action.label}
          />
        ))}

        {/* Overflow menu */}
        {hasOverflowMenu && (
          <Menu
            visible={menuVisible}
            onDismiss={closeMenu}
            anchor={
              <Appbar.Action
                icon="dots-vertical"
                iconColor={theme.colors.onSurfaceVariant}
                onPress={openMenu}
                accessibilityLabel="More options"
              />
            }
          >
            {menuActions.map((action, index) => (
              <Menu.Item
                key={`menu-${action.icon}-${index}`}
                leadingIcon={action.icon}
                onPress={() => {
                  closeMenu();
                  action.onPress();
                }}
                title={action.label}
              />
            ))}
          </Menu>
        )}
      </Appbar.Header>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  header: {
    elevation: 0,
  },
  title: {
    fontSize: 22,
    fontWeight: "500",
  },
});
