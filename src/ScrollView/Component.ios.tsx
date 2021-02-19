import React from 'react';
import {
  LayoutChangeEvent,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ScrollView as ScrollViewRN,
  ScrollViewProps as ScrollViewPropsRN,
  View,
} from 'react-native';

import { Core } from '@huds0n/core';
import {
  useCallback,
  useCopyRef,
  useEffect,
  useRef,
  useState,
} from '@huds0n/utilities';

import { scrollToFocus } from './helpers';

import * as Types from './types';

export const ScrollViewComponent: Types._Component = React.forwardRef(
  (props, ref) => {
    const {
      contentContainerStyle,
      children,
      onScroll,
      inputPadding = 20,
      scrollEnabled: propsScrollEnabled = true,
      ...restProps
    } = props;

    const [{ focusedNode }] = Core.useState('focusedNode');

    const [scrollEnabled, setScrollEnabled] = useState(false);

    const containerHeight = useRef(0);
    const scrollHeight = useRef(0);
    const scrollPositionRef = useRef(0);
    const scrollRef = useCopyRef(ref);

    useEffect(() => {
      if (focusedNode && scrollRef.current) {
        scrollToFocus(
          scrollRef.current,
          focusedNode.id,
          inputPadding,
          scrollPositionRef.current,
        );
      }
    }, [focusedNode, inputPadding, scrollRef.current]);

    const handleScroll = useCallback(
      (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        onScroll?.(event);
        scrollPositionRef.current = event.nativeEvent.contentOffset.y;
      },
      [onScroll],
    );

    const handleScrollEnable = useCallback(() => {
      if (
        containerHeight.current &&
        scrollHeight.current > containerHeight.current
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
          layout: { height },
        },
      }: LayoutChangeEvent) => {
        containerHeight.current = height;
        handleScrollEnable();
      },
      [handleScrollEnable],
    );

    const handleLayoutScrollContainer = useCallback(
      ({
        nativeEvent: {
          layout: { height },
        },
      }: LayoutChangeEvent) => {
        scrollHeight.current = height;
        handleScrollEnable();

        if (focusedNode && scrollRef.current) {
          scrollToFocus(
            scrollRef.current,
            focusedNode.id,
            inputPadding,
            scrollPositionRef.current,
          );
        }
      },
      [
        focusedNode,
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
          onScroll={handleScroll}
          scrollEnabled={scrollEnabled && propsScrollEnabled}
          scrollEventThrottle={16}
        >
          <View
            style={contentContainerStyle}
            onLayout={handleLayoutScrollContainer}
          >
            {children}
          </View>
        </ScrollViewRN>
      </View>
    );
  },
);
