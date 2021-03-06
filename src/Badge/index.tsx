import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import { Core } from '@huds0n/core';
import { useMemo } from '@huds0n/utilities';

import { theming } from './theming';

const DEFAULT_SIZE = 14;
const DEFAULT_MAX_VALUE = 9;

export namespace Badge {
  export type Offset = { x?: number; y?: number };

  export type Props = {
    color?: string;
    containerStyle?: StyleProp<ViewStyle>;
    maxValue?: number;
    offset?: Offset;
    size?: number;
    textColor?: string;
    textStyle?: StyleProp<TextStyle>;
    value: number;
  };

  export type Component = React.FunctionComponent<Props> & {
    theming: typeof theming;
  };
}

function _Badge(props: Badge.Props) {
  const Contents = handleBadgeContents(props);

  if (!props.value) return null;

  return <View style={handleStyle(props)}>{Contents}</View>;
}

function handleStyle({
  color = Core.colors.BADGE,
  containerStyle,
  offset,
  size = DEFAULT_SIZE,
}: Badge.Props): ViewStyle {
  return StyleSheet.flatten([
    {
      alignContent: 'center',
      backgroundColor: color,
      borderRadius: size / 2,
      padding: size / 10,
      height: size,
      justifyContent: 'center',
      position: 'absolute',
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
  textColor = Core.colors.WHITE,
  textStyle,
  size = DEFAULT_SIZE,
  value,
}: Badge.Props) {
  return useMemo(() => {
    if (!value) return null;

    return (
      <Text
        adjustsFontSizeToFit
        numberOfLines={1}
        style={StyleSheet.flatten([
          {
            color: textColor,
            fontSize: size * 0.8,
            fontWeight: '300',
            textAlign: 'center',
          },
          textStyle,
        ])}
      >
        {value > maxValue ? maxValue.toFixed(0) + '+' : value.toFixed(0)}
      </Text>
    );
  }, [maxValue, size, textColor, textStyle, value]);
}

export const Badge = Object.assign(_Badge, { theming });
