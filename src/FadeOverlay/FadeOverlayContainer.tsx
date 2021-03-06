import React from 'react';
import { View } from 'react-native';

import { FadeOverlay } from './FadeOverlay';
import { themingFadeOverlayContainer } from './theming';

export namespace FadeOverlayContainer {
  export type FadeProp = Omit<FadeOverlay.Props, 'position'> | boolean;

  export type Props = {
    top?: FadeProp;
    bottom?: FadeProp;
    left?: FadeProp;
    right?: FadeProp;
  };

  export type Component = React.FunctionComponent<Props> & {
    theming: typeof themingFadeOverlayContainer;
  };
}

function _FadeOverlayContainer({
  bottom,
  left,
  right,
  top,
}: FadeOverlayContainer.Props) {
  return (
    <View
      pointerEvents="none"
      style={{
        height: '100%',
        position: 'absolute',
        width: '100%',
        zIndex: 1000,
      }}
    >
      {bottom && <FadeOverlay position="BOTTOM" {...bottom} />}
      {left && <FadeOverlay position="LEFT" {...left} />}
      {right && <FadeOverlay position="RIGHT" {...right} />}
      {top && <FadeOverlay position="TOP" {...top} />}
    </View>
  );
}

export const FadeOverlayContainer: FadeOverlayContainer.Component = Object.assign(
  _FadeOverlayContainer,
  { theming: themingFadeOverlayContainer },
);
