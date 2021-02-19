import React from 'react';
import { View } from 'react-native';

import { ScrollViewComponent } from './Component';
import { FadeOverlayContainer } from '../FadeOverlay';

import { theming } from './theming';
import * as Types from './types';

export namespace ScrollView {
  export type FadeProp = Types.FadeProp;

  export type Props = Types.Props;

  export type Component = Types.Component;
}

const _ScrollView: Types._Component = React.forwardRef((props, ref) => {
  const { fade, style } = props;

  return (
    <View style={style}>
      <View>
        {fade && <FadeOverlayContainer {...fade} />}

        <ScrollViewComponent ref={ref} {...props} style={undefined} />
      </View>
    </View>
  );
});

export const ScrollView: ScrollView.Component = Object.assign(_ScrollView, {
  theming,
});
