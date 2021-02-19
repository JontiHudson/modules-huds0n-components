import React from 'react';
import {
  ActivityIndicator,
  GestureResponderEvent,
  PressableStateCallbackType,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import { Core } from '@huds0n/core';
import { useCallback } from '@huds0n/utilities';

import { Pressable } from '../Pressable';
import { Label } from './Label';
import { theming } from './theming';
import * as Types from './types';

export namespace Button {
  export type OnPressFn = Props['onPress'];
  export type Props = Types.Props;

  export type Component = React.FunctionComponent<Props> & {
    theming: typeof theming;
  };
}

function _Button(props: Button.Props) {
  const {
    children,
    color,
    dismissInputOnPress = true,
    disabledStyle,
    label,
    onPress,
    pressedStyle,
    spinner,
    spinnerColor = Core.colors.WHITE,
    spinnerStyle,
    style,
    ...restProps
  } = props;

  const disabled = handleDisabled(props);

  return (
    <Pressable
      feedback={handleDefaultFeedback(props)}
      {...restProps}
      onPress={handleOnPress(props)}
      disabled={disabled}
      style={handleStyle(props, disabled)}
    >
      {handleContents(props, disabled)}
    </Pressable>
  );
}

function handleDisabled({
  disabled,
  onLongPress,
  onPress,
  onPressIn,
  onPressOut,
  spinner,
  useIsConnected,
  whilePress,
}: Types.Props) {
  let _disabled =
    disabled ||
    spinner ||
    (!onPress && !onPressIn && !onPressOut && !onLongPress && !whilePress);

  if (useIsConnected) {
    _disabled = !Core.useState('isConnected')[0].isConnected || _disabled;
  }
  return _disabled;
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
      dismissInputOnPress && Core.dismissInput();
      onPress && onPress(event);
    },
    [Core.dismissInput, onPress],
  );
}

function handleContents(props: Types.Props, disabled: boolean) {
  const { children, spinner, spinnerColor, spinnerStyle, label } = props;

  return ({ pressed }: PressableStateCallbackType) => {
    if (spinner) {
      return <ActivityIndicator color={spinnerColor} style={spinnerStyle} />;
    }

    if (label || typeof children === 'string') {
      return <Label {...props} pressed={pressed} disabled={disabled} />;
    }

    if (React.isValidElement(children)) {
      <View pointerEvents="none" style={{ flex: 1 }}>
        {children}
      </View>;
    }

    if (typeof children === 'function') {
      return children({ pressed });
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
        borderRadius: Core.spacings.M,
        borderWidth: StyleSheet.hairlineWidth,
        justifyContent: 'center',
        overflow: 'hidden',
        padding: Core.spacings.M,
      },
      style,
      pressed && pressedStyle,
      disabled && disabledStyle,
    ]);
  };
}

export const Button = Object.assign(_Button, { theming });
