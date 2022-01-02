import React from 'react';
import {
  LayoutChangeEvent,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ScrollView as ScrollViewRN,
  View,
} from 'react-native';

import {
  useCallback,
  useCopyRef,
  useEffect,
  useRef,
  useState,
} from '@huds0n/utilities';
import { huds0nState } from '@huds0n/utilities/src/_core';

import { scrollToFocus } from './helpers';
import * as Types from './types';

export const ScrollViewComponent: Types.Component = React.forwardRef(
  (props, ref) => {
    const {
      contentContainerStyle,
      children,
      onScroll,
      inputPadding = 20,
      scrollEnabled: propsScrollEnabled = true,
      horizontal,
      ...restProps
    } = props;

    const [focusedId] = huds0nState.useProp('focusedId');

    const [scrollEnabled, setScrollEnabled] = useState(false);

    const containerLength = useRef(0);
    const scrollLength = useRef(0);
    const scrollPositionRef = useRef(0);
    const scrollRef = useCopyRef(ref);

    useEffect(() => {
      if (focusedId && scrollRef.current) {
        scrollToFocus(
          scrollRef.current,
          focusedId as number,
          inputPadding,
          scrollPositionRef.current,
        );
      }
    }, [focusedId, inputPadding, scrollRef.current]);

    const handleScroll = useCallback(
      (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        onScroll?.(event);
        scrollPositionRef.current = event.nativeEvent.contentOffset.y;
      },
      [onScroll],
    );

    const handleScrollEnable = useCallback(() => {
      if (
        containerLength.current &&
        scrollLength.current > containerLength.current
      ) {
        setScrollEnabled(true);
      } else if (scrollEnabled) {
        scrollRef.current?.scrollTo({ x: 0, y: 0, animated: false });
        setScrollEnabled(false);
      }
    }, [scrollEnabled]);

    const handleLayoutScrollWrapper = useCallback(
      ({
        nativeEvent: {
          layout: { height, width },
        },
      }: LayoutChangeEvent) => {
        containerLength.current = horizontal ? width : height;
        handleScrollEnable();
      },
      [handleScrollEnable],
    );

    const handleLayoutScrollContainer = useCallback(
      ({
        nativeEvent: {
          layout: { height, width },
        },
      }: LayoutChangeEvent) => {
        scrollLength.current = horizontal ? width : height;
        handleScrollEnable();

        if (focusedId && scrollRef.current) {
          scrollToFocus(
            scrollRef.current,
            focusedId as number,
            inputPadding,
            scrollPositionRef.current,
          );
        }
      },
      [
        focusedId,
        inputPadding,
        scrollRef.current,
        handleScrollEnable,
        scrollPositionRef.current,
      ],
    );

    return (
      <View onLayout={handleLayoutScrollWrapper}>
        <ScrollViewRN
          ref={scrollRef}
          overScrollMode="never"
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="always"
          {...restProps}
          horizontal={horizontal}
          onScroll={handleScroll}
          scrollEnabled={scrollEnabled && propsScrollEnabled}
          scrollEventThrottle={16}
        >
          <View
            style={[
              { flexDirection: horizontal ? 'row' : 'column' },
              contentContainerStyle,
            ]}
            onLayout={handleLayoutScrollContainer}
          >
            {children}
          </View>
        </ScrollViewRN>
      </View>
    );
  },
);
