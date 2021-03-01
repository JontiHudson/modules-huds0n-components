import React from 'react';
import { ListRenderItemInfo, RefreshControl, View } from 'react-native';

import {
  useAsyncCallback,
  useCallback,
  useKeyExtractor,
  useMemo,
  useRef,
  useState,
} from '@huds0n/utilities';

import * as Types from './types';

export function getKeyExtractor({ keyName, keyExtractor }: Types.Props) {
  return { keyExtractor: keyName ? useKeyExtractor(keyName) : keyExtractor };
}

export function getRefreshControl({
  activityIndicatorColor,
  onPullToRefresh,
  refreshControl,
}: Types.Props) {
  const [handlePullToRefresh, refreshing] = useAsyncCallback(async () => {
    await onPullToRefresh?.();
  }, [onPullToRefresh]);

  const _refreshControl = useMemo(
    () =>
      onPullToRefresh ? (
        <RefreshControl
          tintColor={activityIndicatorColor}
          refreshing={refreshing}
          onRefresh={handlePullToRefresh}
        />
      ) : (
        refreshControl
      ),
    [activityIndicatorColor, onPullToRefresh, refreshing, refreshControl],
  );

  return {
    refreshControl: _refreshControl,
  };
}

export function handleDynamicScrollLayout({
  onContentSizeChange,
  onLayout,
  onPullToRefresh,
  refreshControl,
  scrollEnabled = true,
}: Types.Props) {
  const dynamicScrollingEnabled = !onPullToRefresh && !refreshControl;

  const [_scrollEnabled, _setScrollEnabled] = useState(false);

  const containerHeightRef = useRef(0);
  const contentsHeightRef = useRef(0);

  const timeoutRef = useRef<any>(null);

  const handleChange = useCallback(
    (ref: React.MutableRefObject<number>, height: number) => {
      if (dynamicScrollingEnabled) {
        ref.current = height;

        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        const enableScroll =
          !!containerHeightRef.current &&
          !!contentsHeightRef.current &&
          containerHeightRef.current <= contentsHeightRef.current;

        timeoutRef.current = setTimeout(() => {
          _setScrollEnabled(enableScroll);
        }, 0);
      }
    },
    [dynamicScrollingEnabled],
  );

  const _onLayout: typeof onLayout = useCallback(
    (event) => {
      onLayout?.(event);
      handleChange(containerHeightRef, event.nativeEvent.layout.height);
    },
    [dynamicScrollingEnabled, onLayout],
  );

  const handleContentSizeChange: typeof onContentSizeChange = useCallback(
    (width, height) => {
      onContentSizeChange?.(width, height);
      handleChange(contentsHeightRef, height);
    },
    [dynamicScrollingEnabled, onContentSizeChange],
  );

  return {
    onLayout: _onLayout,
    onContentSizeChange: handleContentSizeChange,
    scrollEnabled:
      scrollEnabled && (!dynamicScrollingEnabled || _scrollEnabled),
  };
}

export function handleZIndex({
  CellRendererComponent = View,
  reverseZIndex,
}: Types.Props) {
  if (reverseZIndex) {
    return {
      CellRendererComponent: (info: ListRenderItemInfo<any>) => (
        <CellRendererComponent
          {...info}
          style={{ zIndex: -info.index, elevation: -info.index }}
        />
      ),
    };
  }
}
