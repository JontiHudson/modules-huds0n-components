import React from "react";
import { StyleSheet, View } from "react-native";

import { theme } from "@huds0n/theming/src/theme";
import { addColorTransparency, useMemo } from "@huds0n/utilities";

import { getLinearGradient } from "../helpers";

export namespace FadeOverlay {
  export type Position = "TOP" | "BOTTOM" | "LEFT" | "RIGHT";

  export type Props = {
    color?: string;
    enable?: boolean;
    height?: number | string;
    width?: number | string;
    intensity?: number;
    position?: Position;
    absolute?: boolean;
  };

  export type Component = React.FunctionComponent<FadeOverlay.Props>;
}

export function FadeOverlay({
  color = theme.colors.BACKGROUND,
  enable = true,
  position = "TOP",
  intensity = 2,
  height,
  width,
  absolute = true,
}: FadeOverlay.Props) {
  const LinearGradient = getLinearGradient();

  const [gradientProps, positionStyle] = useMemo(() => {
    switch (position) {
      case "BOTTOM":
        return [
          { start: { x: 0, y: 1 }, end: { x: 0, y: 0 } },
          {
            bottom: 0,
            height: height || theme.spacings.L,
            width: width || "100%",
          },
        ];

      case "LEFT":
        return [
          { start: { x: 0, y: 0 }, end: { x: 1, y: 0 } },
          {
            left: 0,
            height: height || "100%",
            width: width || theme.spacings.L,
          },
        ];

      case "RIGHT":
        return [
          { start: { x: 1, y: 0 }, end: { x: 0, y: 0 } },
          {
            right: -StyleSheet.hairlineWidth,
            height: height || "100%",
            width: width || theme.spacings.L,
          },
        ];

      default:
        return [
          { start: { x: 0, y: 0 }, end: { x: 0, y: 1 } },
          {
            top: 0,
            height: height || theme.spacings.L,
            width: width || "100%",
          },
        ];
    }
  });

  const gradients = useMemo(() => {
    const array: React.ReactElement[] = [];

    for (let i = 0; i < intensity; i++) {
      array.push(
        <LinearGradient
          key={i}
          colors={[color, addColorTransparency(color, 0)]}
          style={StyleSheet.absoluteFill}
          {...gradientProps}
        />
      );
    }
    return array;
  }, [color]);

  return (
    <View
      style={{
        position: absolute ? "absolute" : "relative",
        zIndex: 1000,
        ...positionStyle,
      }}
    >
      {enable && gradients}
    </View>
  );
}
