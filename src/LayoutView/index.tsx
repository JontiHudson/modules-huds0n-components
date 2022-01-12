import React from "react";
import { View } from "react-native";

import { useLayout } from "@huds0n/utilities";

import type { Types } from "../types";

export const LayoutView = React.forwardRef<View, Types.LayoutViewProps>(
  (props, ref) => {
    const { children, onLayout, significantChangePercent, ...restProps } =
      props;

    const [layout, _onLayout] = useLayout({
      onLayout,
      significantChangePercent,
    });

    return (
      <View ref={ref} onLayout={_onLayout} {...restProps}>
        {children?.(layout)}
      </View>
    );
  }
);
