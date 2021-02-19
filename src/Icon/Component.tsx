import React from 'react';
import {
  GestureResponderEvent,
  Image,
  StyleSheet,
  ViewStyle,
} from 'react-native';

import { Core } from '@huds0n/core';
import Huds0nError from '@huds0n/error';
import { useMemo } from '@huds0n/utilities';

import { Badge } from '../Badge';
import { Pressable } from '../Pressable';

import * as Types from './types';
import { VectorIcons } from './VectorIcon';

const DEFAULT_SIZE = Core.fontSizes.BODY;
const DISABLED_COLOR = Core.colors.DISABLED;

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
      feedback="fade"
      onPress={handleOnpress(props)}
      disabled={!pressable || disabled}
      {...rest}
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

function handleDisabled(props: Types.Props, pressable: boolean) {
  return (
    props.disabled ||
    (pressable &&
      !props.onPress &&
      !props.onPressIn &&
      !props.onPressOut &&
      !props.onLongPress &&
      !props.whilePress)
  );
}

function handleOnpress({ dismissInputOnPress, onPress }: Types.Props) {
  return useMemo(
    () => (event: GestureResponderEvent) => {
      dismissInputOnPress && Core.dismissInput();
      onPress && onPress(event);
    },
    [Core.dismissInput, onPress],
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
    size = Core.fontSizes.BODY,
    set,
  }: Types.Props,
  disabled: boolean,
  pressed: boolean,
  color: string | undefined,
): React.ReactNode | undefined {
  if (set && name) {
    if (!VectorIcons) {
      throw new Huds0nError({
        name: 'icon-error',
        code: 'VECTOR_ICONS_MISSING',
        message: 'Please check correct vector-icons module is downloaded',
        severity: 'HIGH',
      });
    }

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

    const IconSet = VectorIcons[_set];

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
