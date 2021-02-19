import { findNodeHandle, ScrollView, UIManager } from 'react-native';

import { measureNodeAsync, measureRelativeNodeAsync } from '@huds0n/utilities';

export async function scrollToFocus(
  scrollView: ScrollView,
  focusedNodeId: number,
  inputPadding = 20,
  scrollPosition: number,
) {
  const scrollViewNodeId = findNodeHandle(scrollView);

  if (
    scrollViewNodeId === null ||
    !(await getIsDescendant(focusedNodeId, scrollViewNodeId))
  ) {
    return;
  }

  const [scrollViewHeight, inputPosition]: [
    null | number,
    null | { start: number; end: number },
  ] = await Promise.all([
    getScrollViewHeight(scrollViewNodeId),
    getInputPosition(focusedNodeId, scrollViewNodeId, inputPadding),
  ]);

  if (scrollViewHeight === null || inputPosition === null) {
    return;
  }

  if (inputPosition.start < scrollPosition) {
    scrollView.scrollTo({
      y: inputPosition.start,
      animated: true,
    });
  } else if (inputPosition.end > scrollViewHeight + scrollPosition) {
    scrollView.scrollTo({
      y: inputPosition.end - scrollViewHeight,
      animated: true,
    });
  }
}

async function getScrollViewHeight(scrollViewNodeId: number) {
  const { height } = await measureNodeAsync(scrollViewNodeId);
  return height;
}

async function getInputPosition(
  focusedId: number,
  scrollViewNodeId: number,
  inputPadding: number,
) {
  const { height, top } = await measureRelativeNodeAsync(
    focusedId,
    scrollViewNodeId,
  );

  return {
    start: top - inputPadding,
    end: top + height + inputPadding,
  };
}

function getIsDescendant(focusedId: number, scrollViewNodeId: number) {
  return new Promise((resolve) => {
    // @ts-ignore viewIsDescendantOf not typed
    UIManager.viewIsDescendantOf(
      focusedId,
      scrollViewNodeId,
      (isDescendant: boolean) => {
        resolve(isDescendant);
      },
    );
  });
}
