import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Core } from '@huds0n/core';
import { addColorTransparency, useMemo } from '@huds0n/utilities';

import { LinearGradient } from './LinearGradient';
import { themingFadeOverlay } from './theming';

export namespace FadeOverlay {
  export type Position = 'TOP' | 'BOTTOM' | 'LEFT' | 'RIGHT';

  export type Props = {
    color?: string;
    height?: number | string;
    width?: number | string;
    intensity?: number;
    position?: Position;
  };

  export type Component = React.FunctionComponent<FadeOverlay.Props> & {
    theming: typeof themingFadeOverlay;
  };
}

function _FadeOverlay({
  color = 'white',
  position,
  intensity = 2,
  height,
  width,
}: FadeOverlay.Props) {
  const [gradientProps, positionStyle] = useMemo(() => {
    switch (position) {
      case 'BOTTOM':
        return [
          { start: { x: 0, y: 1 }, end: { x: 0, y: 0 } },
          {
            bottom: 0,
            height: height || Core.spacings.L,
            width: width || '100%',
          },
        ];

      case 'LEFT':
        return [
          { start: { x: 0, y: 0 }, end: { x: 1, y: 0 } },
          {
            left: 0,
            height: height || '100%',
            width: width || Core.spacings.L,
          },
        ];

      case 'RIGHT':
        return [
          { start: { x: 1, y: 0 }, end: { x: 0, y: 0 } },
          {
            right: -StyleSheet.hairlineWidth,
            height: height || '100%',
            width: width || Core.spacings.L,
          },
        ];

      default:
        return [
          { start: { x: 0, y: 0 }, end: { x: 0, y: 1 } },
          {
            top: 0,
            height: height || Core.spacings.L,
            width: width || '100%',
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
          colors={[
            color || Core.colors.WHITE,
            addColorTransparency(color, 0) || Core.colors.TRANSPARENT,
          ]}
          style={StyleSheet.absoluteFill}
          {...gradientProps}
        />,
      );
    }
    return array;
  }, [color]);

  return (
    <View style={{ position: 'absolute', zIndex: 1000, ...positionStyle }}>
      {gradients}
    </View>
  );
}

export const FadeOverlay: FadeOverlay.Component = Object.assign(_FadeOverlay, {
  theming: themingFadeOverlay,
});
