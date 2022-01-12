import React from "react";
import { Animated, FlatList as FlatListRN, View } from "react-native";

import {
  getKeyExtractor,
  getRefreshControl,
  handleDynamicScrollLayout,
  handleZIndex,
} from "./helpers";
import type { Types } from "../types";

export const FlatList = React.forwardRef(
  (props: Types.FlatListProps, ref: React.Ref<FlatListRN>) => {
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
