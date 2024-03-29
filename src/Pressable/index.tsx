import React from "react";
import {
  Platform,
  Pressable as PressableRN,
  StyleSheet,
  View,
} from "react-native";

import {
  darkenColor,
  lightenColor,
  flattenPressableStyle,
  useCallback,
  useMemo,
  useRef,
} from "@huds0n/utilities";
import { huds0nState } from "@huds0n/utilities/src/_core";

import type { Types } from "../types";

export const Pressable = React.forwardRef<View, Types.PressableProps>(
  (props, ref) => {
    return (
      <PressableRN
        ref={ref}
        {...props}
        disabled={handleDisabled(props)}
        {...handlePress(props)}
        android_ripple={handleAndroidRipple(props)}
        style={handleStyle(props)}
      />
    );
  }
);

function handleDisabled({ disabled, requiresNetwork }: Types.PressableProps) {
  if (requiresNetwork && !huds0nState.useProp("isNetworkConnected")[0]) {
    return true;
  }

  return disabled;
}

function highlightColor(color: string, amount?: number) {
  const highlightedColor = darkenColor(color, amount);

  return highlightedColor?.startsWith("#000000")
    ? lightenColor(color, amount)
    : highlightedColor;
}

function handlePress(props: Types.PressableProps) {
  const pressCleanUpFn = useRef<null | (() => void)>(null);

  const onPress = props.onPress || undefined;

  const onPressIn: typeof props.onPressIn = useCallback(
    (event) => {
      props.onPressIn?.(event);

      pressCleanUpFn.current = props.whilePress?.() || null;
    },
    [props.onPressIn]
  );

  const onPressOut: typeof props.onPressOut = useCallback(
    (event) => {
      props.onPressOut?.(event);

      pressCleanUpFn.current?.();
      pressCleanUpFn.current = null;
    },
    [props.onPressOut]
  );

  return { onPress, onPressIn, onPressOut };
}

function handleAndroidRipple({
  android_ripple,
  feedbackIntensity,
  style,
}: Types.PressableProps) {
  return useMemo(() => {
    if (Platform.OS === "android" && android_ripple) {
      if (typeof android_ripple === "object" && android_ripple.color) {
        return android_ripple;
      }

      const _android_ripple = android_ripple === true ? {} : android_ripple;

      const { backgroundColor } = StyleSheet.flatten(
        typeof style === "function" ? style({ pressed: false }) : style
      );

      return {
        ..._android_ripple,
        color:
          typeof backgroundColor === "string"
            ? highlightColor(backgroundColor, feedbackIntensity)
            : undefined,
      };
    }
  }, [android_ripple, feedbackIntensity, style]);
}

function handleStyle(props: Types.PressableProps) {
  const { android_ripple, feedback, feedbackIntensity, style } = props;

  return useMemo(() => {
    if (noPressStyleRequired(props)) {
      return style;
    }

    if (feedback === "fade") {
      return getFadeFeedbackStyle(props);
    }

    return getHighlightFeedbackStyle(props);
  }, [android_ripple, feedback, feedbackIntensity, style]);
}

function noPressStyleRequired({
  android_ripple,
  feedback,
}: Types.PressableProps) {
  return (
    !feedback ||
    feedback === "none" ||
    (Platform.OS === "android" && android_ripple)
  );
}

function getFadeFeedbackStyle({
  feedbackIntensity,
  style,
}: Types.PressableProps) {
  return flattenPressableStyle([
    style,
    ({ pressed }) =>
      pressed
        ? {
            opacity:
              typeof feedbackIntensity === "number" ? feedbackIntensity : 0.2,
          }
        : {},
  ]);
}

function getHighlightFeedbackStyle({
  feedbackIntensity,
  style,
}: Types.PressableProps) {
  const { backgroundColor } = StyleSheet.flatten(
    typeof style === "function" ? style({ pressed: false }) : style
  );

  const activeColor =
    typeof backgroundColor === "string"
      ? highlightColor(backgroundColor, feedbackIntensity || 10)
      : undefined;

  return flattenPressableStyle([
    style,
    ({ pressed }) =>
      pressed
        ? {
            backgroundColor: activeColor,
          }
        : {},
  ]);
}
