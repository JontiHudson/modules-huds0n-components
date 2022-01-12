import React from "react";
import { View } from "react-native";

import { theme } from "@huds0n/theming/src/theme";

import type { Types } from "../types";

export function Separator(props: Types.SeparatorProps) {
  const { flex, height, width } = props;

  if (flex) {
    return (
      <View
        style={{
          height,
          width,
          flex: flex === true ? 1 : flex,
        }}
      />
    );
  }

  return (
    <View
      style={{
        height: height ?? theme.spacings.M,
        width: width ?? theme.spacings.M,
      }}
    />
  );
}
