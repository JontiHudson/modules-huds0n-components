import React from 'react';
import { View } from 'react-native';

import { ScrollViewComponent } from './Component';
import { FadeOverlayContainer } from '../FadeOverlay';

import * as Types from './types';

export namespace ScrollView {
  export type FadeProp = Types.FadeProp;

  export type Props = Types.Props;

  export type Component = Types.Component;
}

export const ScrollView: Types.Component = React.forwardRef((props, ref) => {
  const { fade, style } = props;

  return (
    <>
      {fade && <FadeOverlayContainer {...fade} />}

      <ScrollViewComponent ref={ref} {...props} style={style} />
    </>
  );
});
