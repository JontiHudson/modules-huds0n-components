import React from 'react';
import {
  ActivityIndicator,
  GestureResponderEvent,
  PressableStateCallbackType,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import { theme } from '@huds0n/theming/src/theme';
import { useCallback } from '@huds0n/utilities';
import { huds0nState } from '@huds0n/utilities/src/_core';

import { Pressable } from '../Pressable';

import { Label } from './Label';
import * as Types from './types';

export namespace Button {
  export type OnPressFn = Props['onPress'];
  export type Props = Types.Props;

  export type Component = React.FunctionComponent<Props>;
}

export function Button(props: Button.Props) {
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
}: Types.Props) {
  let disabled =
    disabledProp ||
    spinner ||
    (!onPress && !onPressIn && !onPressOut && !onLongPress && !whilePress);

  if (requiresNetwork && !huds0nState.useProp('isNetworkConnected')[0]) {
    return true;
  }

  return disabled;
}

function handleDefaultFeedback({ color, pressedStyle, style }: Types.Props) {
  if (pressedStyle && StyleSheet.flatten(pressedStyle)?.backgroundColor) {
    return undefined;
  }

  if (color || (style && StyleSheet.flatten(style)?.backgroundColor)) {
    return 'highlight';
  }

  return 'fade';
}

function handleOnPress({ dismissInputOnPress, onPress }: Types.Props) {
  return useCallback(
    (event: GestureResponderEvent) => {
      dismissInputOnPress && huds0nState.state.dismissInput();
      onPress && onPress(event);
    },
    [onPress],
  );
}

function handleContents(props: Types.Props, disabled: boolean) {
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

    if (typeof children === 'function') {
      return children({ pressed });
    }

    if (label || typeof children === 'string') {
      return <Label {...props} pressed={pressed} disabled={disabled} />;
    }

    return children;
  };
}

function handleStyle(
  { color, disabledStyle, pressedStyle, style }: Types.Props,
  disabled: boolean,
) {
  return ({ pressed }: PressableStateCallbackType): ViewStyle => {
    return StyleSheet.flatten([
      {
        alignItems: 'center',
        backgroundColor: color,
        borderRadius: theme.spacings.M,
        borderWidth: StyleSheet.hairlineWidth,
        justifyContent: 'center',
        overflow: 'hidden',
        padding: theme.spacings.M,
      },
      style,
      pressed && pressedStyle,
      disabled && disabledStyle,
    ]);
  };
}
