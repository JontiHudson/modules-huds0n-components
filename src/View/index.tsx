import React from 'react';
import { View as ViewRN, ViewProps as ViewPropsRN } from 'react-native';

import { useMemo, useLayout } from '@huds0n/utilities';

import { theming } from './theming';
import { ViewMeasure } from './ViewMeasure';

type _Component = React.ForwardRefExoticComponent<
  View.Props & React.RefAttributes<ViewRN>
>;

export namespace View {
  export type Layout = useLayout.Layout;

  export type Props = Omit<ViewPropsRN, 'children'> & {
    children?:
      | React.ReactNode
      | React.ReactNode[]
      | ((layout: Layout) => React.ReactNode | React.ReactNode[]);
    onPressThrough?: () => any;
  };

  export type Component = React.ForwardRefExoticComponent<
    Props & React.RefAttributes<ViewRN>
  > & { theming: typeof theming };
}

const _View: _Component = React.forwardRef((props, ref) => {
  const {
    children,
    onPressThrough,
    onStartShouldSetResponderCapture,
    ...restProps
  } = props;

  const handleStartShouldSetResponderCapture = useMemo(
    () =>
      onPressThrough
        ? () => {
            onPressThrough();
            return false;
          }
        : onStartShouldSetResponderCapture,
    [onPressThrough, onStartShouldSetResponderCapture],
  );

  if (typeof children === 'function' && !React.isValidElement(children)) {
    return (
      <ViewMeasure
        ref={ref}
        onStartShouldSetResponderCapture={handleStartShouldSetResponderCapture}
        {...restProps}
      >
        {
          children as (
            layout: View.Layout,
          ) => React.ReactNode | React.ReactNode[]
        }
      </ViewMeasure>
    );
  }

  return (
    <ViewRN
      ref={ref}
      onStartShouldSetResponderCapture={handleStartShouldSetResponderCapture}
      {...restProps}
    >
      {children}
    </ViewRN>
  );
});

export const View: View.Component = Object.assign(_View, { theming });
