import React from 'react';
import { View as ViewRN, ViewProps as ViewPropsRN } from 'react-native';

import { useLayout } from '@huds0n/utilities';

export namespace ViewMeasure {
  export type Layout = useLayout.Layout;

  export type Props = Omit<ViewPropsRN, 'children'> & {
    children: (layout: Layout) => React.ReactNode | React.ReactNode[];
  };

  export type Component = React.ForwardRefExoticComponent<
    Props & React.RefAttributes<ViewRN>
  >;
}

export const ViewMeasure: ViewMeasure.Component = React.forwardRef(
  (props, ref) => {
    const { children, onLayout, ...restProps } = props;

    const [layout, _onLayout] = useLayout({ onLayout });

    return (
      <ViewRN ref={ref} onLayout={_onLayout} {...restProps}>
        {children(layout)}
      </ViewRN>
    );
  },
);
