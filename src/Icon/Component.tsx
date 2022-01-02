import React from 'react';
import {
  GestureResponderEvent,
  Image,
  StyleSheet,
  ViewStyle,
} from 'react-native';

import { theme } from '@huds0n/theming/src/theme';
import { useMemo } from '@huds0n/utilities';
import { huds0nState } from '@huds0n/utilities/src/_core';

import { Badge } from '../Badge';
import { Pressable } from '../Pressable';
import { getVectorIcons } from '../helpers';

import * as Types from './types';

const DEFAULT_SIZE = theme.fontSizes.BODY;
const DISABLED_COLOR = theme.colors.DISABLED;

export function IconComponent(props: Types.Props) {
  const {
    backgroundColor,
    badge = 0,
    badgeProps,
    color,
    containerStyle,
    disabledProps,
    dismissInputOnPress = true,
    onPress,
    pressedProps,
    ...rest
  } = props;

  const pressable = handlePressable(props);
  const disabled = handleDisabled(props, pressable);

  return (
    <Pressable
      // Fixes bug captures events on web when disabled
      pointerEvents={!pressable || disabled ? 'none' : 'auto'}
      feedback="fade"
      onPress={handleOnpress(props)}
      disabled={!pressable || disabled}
      {...rest}
      // requiresNetwork handled by handleDisabled
      requiresNetwork={false}
      style={handleContainerStyle(props, disabled)}
    >
      {({ pressed }) => (
        <>
          {handleIconComponent(props, disabled, pressed)}
          {handleBadgeComponent(props, disabled, pressed)}
        </>
      )}
    </Pressable>
  );
}

function handlePressable(props: Types.Props) {
  return (
    'onPress' in props ||
    'onPressIn' in props ||
    'onPressOut' in props ||
    'onLongPress' in props ||
    'whilePress' in props
  );
}

function handleDisabled(
  {
    disabled,
    onLongPress,
    onPress,
    onPressIn,
    onPressOut,
    requiresNetwork,
    whilePress,
  }: Types.Props,
  pressable: boolean,
) {
  if (requiresNetwork && !huds0nState.useProp('isNetworkConnected')[0]) {
    return true;
  }

  return (
    disabled ||
    (pressable &&
      !onPress &&
      !onPressIn &&
      !onPressOut &&
      !onLongPress &&
      !whilePress)
  );
}

function handleOnpress({ dismissInputOnPress, onPress }: Types.Props) {
  return useMemo(
    () => (event: GestureResponderEvent) => {
      dismissInputOnPress && huds0nState.state.dismissInput();
      onPress && onPress(event);
    },
    [onPress],
  );
}

function handleContainerStyle(
  { backgroundColor, containerStyle, disabledProps, pressedProps }: Types.Props,
  disabled: boolean,
) {
  return ({ pressed }: { pressed: boolean }) => {
    const containerColor =
      (disabled && disabledProps?.backgroundColor) || backgroundColor;

    return StyleSheet.flatten<ViewStyle>([
      {
        alignItems: 'center',
        backgroundColor: containerColor,
        justifyContent: 'center',
      },
      containerStyle,
      pressed &&
        !!pressedProps?.backgroundColor && {
          backgroundColor: pressedProps?.backgroundColor,
        },
    ]);
  };
}

function handleIconComponent(
  props: Types.Props,
  disabled: boolean,
  pressed: boolean,
) {
  const { color, disabledProps, pressedProps } = props;

  const _color =
    (disabled && (disabledProps?.color || DISABLED_COLOR)) ||
    (pressed && pressedProps?.color) ||
    color;

  return (
    getVectorIcon(props, disabled, pressed, _color) ||
    getImageIcon(props, disabled, pressed, _color) ||
    getCustomIcon(props, disabled, pressed)
  );
}

function getCustomIcon(
  { component, disabledProps, pressedProps }: Types.Props,
  disabled: boolean,
  pressed: boolean,
): React.ReactNode | undefined {
  if (component) {
    return (
      (disabled && disabledProps?.component) ||
      (pressed && pressedProps?.component) ||
      component
    );
  }
}

function getImageIcon(
  {
    imageProps,
    source,
    pressedProps,
    disabledProps,
    size = DEFAULT_SIZE,
  }: Types.Props,
  disabled: boolean,
  pressed: boolean,
  color: string | undefined,
): React.ReactNode | undefined {
  if (source) {
    const _size =
      (disabled && disabledProps?.size) ||
      (pressed && pressedProps?.size) ||
      size;

    const _source =
      (disabled && disabledProps?.source) ||
      (pressed && pressedProps?.source) ||
      source;

    const _imageProps: Partial<Types.ImageProps> = {
      ...imageProps,
      ...(disabled && disabledProps?.imageProps),
      ...(pressed && pressedProps?.imageProps),
    };

    return (
      <Image
        resizeMode="contain"
        source={_source}
        {..._imageProps}
        style={StyleSheet.flatten([
          {
            height: _size,
            width: _size,
            tintColor: color,
          },
          _imageProps?.style,
        ])}
      />
    );
  }
}

function getVectorIcon(
  {
    name,
    pressedProps,
    disabledProps,
    size = theme.fontSizes.BODY,
    set = 'FontAwesome',
  }: Types.Props,
  disabled: boolean,
  pressed: boolean,
  color: string | undefined,
): React.ReactNode | undefined {
  if (name) {
    const _size =
      (disabled && disabledProps?.size) ||
      (pressed && pressedProps?.size) ||
      size;

    const _name =
      (disabled && disabledProps?.name) ||
      (pressed && pressedProps?.name) ||
      name;

    const _set =
      (disabled && disabledProps?.set) || (pressed && pressedProps?.set) || set;

    const IconSet = getVectorIcons()[_set];

    if (IconSet) {
      return <IconSet color={color} name={_name} size={_size} />;
    }
  }
}

function handleBadgeComponent(
  {
    badge,
    badgeProps,
    color,
    disabledProps,
    pressedProps,
    size = DEFAULT_SIZE,
  }: Types.Props,
  disabled: boolean,
  pressed: boolean,
) {
  if (!badge) {
    return null;
  }

  return (
    <Badge
      offset={{ x: size / 3, y: -size / 3 }}
      size={size / 2}
      textColor={color}
      value={badge}
      {...{
        ...badgeProps,
        ...(disabled && disabledProps?.badgeProps),
        ...(pressed && pressedProps?.badgeProps),
      }}
    />
  );
}
