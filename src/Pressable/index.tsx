import React from 'react';
import {
  Platform,
  Pressable as PressableRN,
  PressableAndroidRippleConfig,
  PressableProps as PressablePropsRN,
  StyleSheet,
  View as ViewRN,
} from 'react-native';

import {
  darkenColor,
  lightenColor,
  flattenPressableStyle,
  useCallback,
  useMemo,
  useRef,
} from '@huds0n/utilities';

import * as Types from '../types';

import { theming } from './theming';

export namespace Pressable {
  export type AndroidRipple =
    | boolean
    | (PressableAndroidRippleConfig & { intensity?: number });

  export type FeedBack = 'fade' | 'highlight' | 'none';

  export type OnPressFn = Types.OnPressFn;

  export type Style = PressablePropsRN['style'];

  export type Props = Omit<
    PressablePropsRN,
    'android_ripple' | 'onPress' | 'style'
  > & {
    android_ripple?: AndroidRipple;
    feedback?: FeedBack;
    feedbackIntensity?: number;
    onPress?: OnPressFn;
    whilePress?: () => () => void;
    style?: Style;
  };

  export type Ref = typeof ViewRN;

  export type Component = _Component & { theming: typeof theming };
}

export type _Component = React.ForwardRefExoticComponent<
  Pressable.Props & React.RefAttributes<ViewRN>
>;

const _Pressable: _Component = React.forwardRef((props, ref) => {
  return (
    <PressableRN
      ref={ref}
      {...props}
      {...handlePress(props)}
      android_ripple={handleAndroidRipple(props)}
      style={handleStyle(props)}
    />
  );
});

function highlightColor(color: string, amount?: number) {
  const highlightedColor = darkenColor(color, amount);

  return highlightedColor?.startsWith('#000000')
    ? lightenColor(color, amount)
    : highlightedColor;
}

function handlePress(props: Pressable.Props) {
  const pressCleanUpFn = useRef<null | (() => void)>(null);

  const onPress = props.onPress || undefined;

  const onPressIn: typeof props.onPressIn = useCallback(
    (event) => {
      props.onPressIn?.(event);

      pressCleanUpFn.current = props.whilePress?.() || null;
    },
    [props.onPressIn],
  );

  const onPressOut: typeof props.onPressOut = useCallback(
    (event) => {
      props.onPressOut?.(event);

      pressCleanUpFn.current?.();
      pressCleanUpFn.current = null;
    },
    [props.onPressOut],
  );

  return { onPress, onPressIn, onPressOut };
}

function handleAndroidRipple({ android_ripple, style }: Pressable.Props) {
  return useMemo(() => {
    if (Platform.OS === 'android' && android_ripple) {
      if (typeof android_ripple === 'object' && android_ripple.color) {
        return android_ripple;
      }

      const _android_ripple = android_ripple === true ? {} : android_ripple;

      const { backgroundColor } = StyleSheet.flatten(
        typeof style === 'function' ? style({ pressed: false }) : style,
      );

      return {
        ..._android_ripple,
        color:
          typeof backgroundColor === 'string'
            ? highlightColor(backgroundColor, _android_ripple.intensity)
            : undefined,
      };
    }
  }, [android_ripple, style]);
}

function handleStyle(props: Pressable.Props) {
  const { android_ripple, feedback, feedbackIntensity, style } = props;

  return useMemo(() => {
    if (noPressStyleRequired(props)) {
      return style;
    }

    if (feedback === 'fade') {
      return getFadeFeedbackStyle(props);
    }

    return getHighlightFeedbackStyle(props);
  }, [android_ripple, feedback, feedbackIntensity, style]);
}

function noPressStyleRequired({ android_ripple, feedback }: Pressable.Props) {
  return (
    !feedback ||
    feedback === 'none' ||
    (Platform.OS === 'android' && android_ripple)
  );
}

function getFadeFeedbackStyle({ feedbackIntensity, style }: Pressable.Props) {
  return flattenPressableStyle([
    style,
    ({ pressed }) =>
      pressed
        ? {
            opacity:
              typeof feedbackIntensity === 'number' ? feedbackIntensity : 0.2,
          }
        : {},
  ]);
}

function getHighlightFeedbackStyle({
  feedbackIntensity,
  style,
}: Pressable.Props) {
  const { backgroundColor } = StyleSheet.flatten(
    typeof style === 'function' ? style({ pressed: false }) : style,
  );

  const activeColor =
    typeof backgroundColor === 'string'
      ? highlightColor(backgroundColor, feedbackIntensity || 10)
      : undefined;

  return flattenPressableStyle([
    style,
    ({ pressed }) =>
      pressed
        ? {
            backgroundColor: activeColor,
          }
        : {},
  ]);
}

export const Pressable = Object.assign(_Pressable, { theming });
