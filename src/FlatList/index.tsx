import React from "react";
import {
  Animated,
  ListRenderItem as ListRenderItemRN,
  ListRenderItemInfo as ListRenderItemInfoRN,
  View,
} from "react-native";

import {
  getKeyExtractor,
  getRefreshControl,
  handleDynamicScrollLayout,
  handleZIndex,
} from "./helpers";
import * as Types from "./types";

export namespace FlatList {
  export type Props<ItemT = any> = Types.Props<ItemT>;
  export type Ref<ItemT = any> = Types.Ref<ItemT>;

  export type Component<ItemT = any> = Types.Component<ItemT>;
  export type ListRenderItem<ItemT = any> = ListRenderItemRN<ItemT>;
  export type ListRenderItemInfo<ItemT = any> = ListRenderItemInfoRN<ItemT>;
}

export const FlatList = React.forwardRef(
  (props: FlatList.Props, ref: FlatList.Ref) => {
    const { numColumns, style } = props;

    return (
      <View style={style}>
        <View style={{ height: "100%", width: "100%" }}>
          <Animated.FlatList
            ref={ref}
            onEndReachedThreshold={0.5}
            key={numColumns}
            {...props}
            style={{ height: "100%", width: "100%" }}
            {...getKeyExtractor(props)}
            {...getRefreshControl(props)}
            {...handleDynamicScrollLayout(props)}
            {...handleZIndex(props)}
          />
        </View>
      </View>
    );
  }
);
