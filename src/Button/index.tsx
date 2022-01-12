import React from "react";
import {
  ActivityIndicator,
  GestureResponderEvent,
  PressableStateCallbackType,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

import { theme } from "@huds0n/theming/src/theme";
import { useCallback } from "@huds0n/utilities";
import { huds0nState } from "@huds0n/utilities/src/_core";

import { Pressable } from "../Pressable";

import { Label } from "./Label";
import type { Types } from "../types";

export function Button(props: Types.ButtonProps) {
  const {
    children,
    color,
    dismissInputOnPress = true,
    disabledStyle,
    label,
    onPress,
    pressedStyle,
    spinner,
    spinnerColor = theme.colors.WHITE,
    spinnerStyle,
    style,
    ...restProps
  } = props;

  const disabled = handleDisabled(props);

  return (
    <Pressable
      feedback={handleDefaultFeedback(props)}
      {...restProps}
      // requiresNetwork handled by handleDisabled
      requiresNetwork={false}
      onPress={handleOnPress(props)}
      disabled={disabled}
      style={handleStyle(props, disabled)}
    >
      {handleContents(props, disabled)}
    </Pressable>
  );
}

function handleDisabled({
  disabled: disabledProp,
  onLongPress,
  onPress,
  onPressIn,
  onPressOut,
  spinner,
  requiresNetwork,
  whilePress,
}: Types.ButtonProps) {
  let disabled =
    disabledProp ||
    spinner ||
    (!onPress && !onPressIn && !onPressOut && !onLongPress && !whilePress);

  if (requiresNetwork && !huds0nState.useProp("isNetworkConnected")[0]) {
    return true;
  }

  return disabled;
}

function handleDefaultFeedback({
  color,
  pressedStyle,
  style,
}: Types.ButtonProps) {
  if (pressedStyle && StyleSheet.flatten(pressedStyle)?.backgroundColor) {
    return undefined;
  }

  if (
    color ||
    (typeof style !== "function" && StyleSheet.flatten(style)?.backgroundColor)
  ) {
    return "highlight";
  }

  return "fade";
}

function handleOnPress({ dismissInputOnPress, onPress }: Types.ButtonProps) {
  return useCallback(
    (event: GestureResponderEvent) => {
      dismissInputOnPress && huds0nState.state.dismissInput();
      onPress && onPress(event);
    },
    [onPress]
  );
}

function handleContents(props: Types.ButtonProps, disabled: boolean) {
  const { children, spinner, spinnerColor, spinnerStyle, label } = props;

  return ({ pressed }: PressableStateCallbackType) => {
    if (spinner) {
      return <ActivityIndicator color={spinnerColor} style={spinnerStyle} />;
    }

    if (React.isValidElement(children)) {
      <View pointerEvents="none" style={{ flex: 1 }}>
        {children}
      </View>;
    }

    if (typeof children === "function") {
      return children({ pressed });
    }

    if (label || typeof children === "string") {
      return <Label {...props} pressed={pressed} disabled={disabled} />;
    }

    return children;
  };
}

function handleStyle(
  { color, disabledStyle, pressedStyle, style }: Types.ButtonProps,
  disabled: boolean
) {
  return ({ pressed }: PressableStateCallbackType): ViewStyle => {
    return StyleSheet.flatten([
      {
        alignItems: "center",
        backgroundColor: color,
        borderRadius: theme.spacings.M,
        borderWidth: StyleSheet.hairlineWidth,
        justifyContent: "center",
        overflow: "hidden",
        padding: theme.spacings.M,
      },
      typeof style === "function" ? style({ pressed }) : style,
      pressed && pressedStyle,
      disabled && disabledStyle,
    ]);
  };
}
