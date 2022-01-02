import React from 'react';
import { View as ViewRN, ViewProps as ViewPropsRN } from 'react-native';

import { useLayout } from '@huds0n/utilities';

export namespace LayoutView {
  export type Layout = useLayout.Layout;

  export type Props = Omit<ViewPropsRN, 'children'> & {
    children?: (layout: Layout) => React.ReactNode | React.ReactNode[];
    significantChangePercent?: number;
  };

  export type Component = React.ForwardRefExoticComponent<
    Props & React.RefAttributes<ViewRN>
  >;
}

export const LayoutView: LayoutView.Component = React.forwardRef(
  (props, ref) => {
    const { children, onLayout, significantChangePercent, ...restProps } =
      props;

    const [layout, _onLayout] = useLayout({
      onLayout,
      significantChangePercent,
    });

    return (
      <ViewRN ref={ref} onLayout={_onLayout} {...restProps}>
        {children?.(layout)}
      </ViewRN>
    );
  },
);
