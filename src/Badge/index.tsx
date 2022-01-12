import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";

import { theme } from "@huds0n/theming/src/theme";
import { useMemo } from "@huds0n/utilities";

import type { Types } from "../types";

const DEFAULT_SIZE = 14;
const DEFAULT_MAX_VALUE = 9;

export function Badge(props: Types.BadgeProps) {
  const Contents = handleBadgeContents(props);

  if (!props.value) return null;

  return <View style={handleStyle(props)}>{Contents}</View>;
}

function handleStyle({
  color = theme.colors.BADGE,
  containerStyle,
  offset,
  size = DEFAULT_SIZE,
}: Types.BadgeProps): ViewStyle {
  return StyleSheet.flatten([
    {
      alignContent: "center",
      backgroundColor: color,
      borderRadius: size / 2,
      padding: size / 10,
      height: size,
      justifyContent: "center",
      position: "absolute",
      width: size,
      transform: [
        { translateX: offset?.x || 0 },
        { translateY: offset?.y || 0 },
      ],
    },
    containerStyle,
  ]);
}

function handleBadgeContents({
  maxValue = DEFAULT_MAX_VALUE,
  textColor = theme.colors.WHITE,
  textStyle,
  size = DEFAULT_SIZE,
  value,
}: Types.BadgeProps) {
  return useMemo(() => {
    if (!value) return null;

    const text =
      value > maxValue ? maxValue.toFixed(0) + "+" : value.toFixed(0);

    return (
      <Text
        adjustsFontSizeToFit
        numberOfLines={1}
        style={StyleSheet.flatten([
          {
            color: textColor,
            fontSize: size * (text.length > 1 ? 0.6 : 0.8),
            fontWeight: "300",
            textAlign: "center",
          },
          textStyle,
        ])}
      >
        {text}
      </Text>
    );
  }, [maxValue, size, textColor, textStyle, value]);
}
