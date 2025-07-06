/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { Text as DefaultText, View as DefaultView } from "react-native";
import { useTheme } from "react-native-paper";

// This file is a bit of a relic from the default Expo template.
// We'll modify it to work with react-native-paper's theme.

export type TextProps = DefaultText["props"];
export type ViewProps = DefaultView["props"];

export function Text(props: TextProps) {
  const { style, ...otherProps } = props;
  const theme = useTheme();

  return (
    <DefaultText
      style={[{ color: theme.colors.onSurface }, style]}
      {...otherProps}
    />
  );
}

export function View(props: ViewProps) {
  const { style, ...otherProps } = props;
  // Use transparent background by default to let Material 3 theme colors show through
  const backgroundColor = "transparent";
  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}
