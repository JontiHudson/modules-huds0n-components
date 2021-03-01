import React from 'react';
import {
  Animated,
  ListRenderItem as ListRenderItemRN,
  ListRenderItemInfo as ListRenderItemInfoRN,
} from 'react-native';

import { FadeOverlayContainer } from '../FadeOverlay';
import { View } from '../View';

import {
  getKeyExtractor,
  getRefreshControl,
  handleDynamicScrollLayout,
  handleZIndex,
} from './helpers';
import { theming } from './theming';
import * as Types from './types';

export namespace FlatList {
  export type Props<ItemT = any> = Types.Props<ItemT>;
  export type Ref<ItemT = any> = Types.Ref<ItemT>;

  export type Component<ItemT = any> = Types.Component<ItemT>;
  export type ListRenderItem<ItemT = any> = ListRenderItemRN<ItemT>;
  export type ListRenderItemInfo<ItemT = any> = ListRenderItemInfoRN<ItemT>;
}

const _FlatList = React.forwardRef(
  (props: FlatList.Props, ref: FlatList.Ref) => {
    const { numColumns, fade, style } = props;

    return (
      <View style={style}>
        <View>
          {fade && <FadeOverlayContainer {...fade} />}

          <Animated.FlatList
            ref={ref}
            onEndReachedThreshold={0.5}
            key={numColumns}
            {...props}
            style={{ height: '100%', width: '100%' }}
            {...getKeyExtractor(props)}
            {...getRefreshControl(props)}
            {...handleDynamicScrollLayout(props)}
            {...handleZIndex(props)}
          />
        </View>
      </View>
    );
  },
);

export const FlatList: FlatList.Component = Object.assign(_FlatList, {
  theming,
});
