import React from "react";
import { StyleSheet, Text } from "react-native";

import { theme } from "@huds0n/theming/src/theme";

import * as Types from "./types";

export function Label(props: Types.LabelProps) {
  const labelText = getLabelText(props);

  if (!labelText) return null;

  return (
    <Text
      adjustsFontSizeToFit
      numberOfLines={1}
      style={handleLabelStyle(props)}
    >
      {labelText}
    </Text>
  );
}

function getLabelText({ children, label }: Types.LabelProps) {
  return typeof children === "string" ? children : label;
}

function handleLabelStyle({
  disabled,
  disabledLabelStyle,
  labelStyle,
  pressed,
  pressedLabelStyle,
}: Types.LabelProps) {
  return StyleSheet.flatten([
    { color: theme.colors.TEXT, fontSize: theme.fontSizes.LABEL },
    labelStyle,
    disabled && disabledLabelStyle,
    pressed && pressedLabelStyle,
  ]);
}
