import { ScrollView } from 'react-native';

import {
  getNodeId,
  getIsDescendant,
  measureNodeAsync,
  measureRelativeNodeAsync,
} from '@huds0n/utilities';

export async function scrollToFocus(
  scrollView: ScrollView,
  focusedInputId: number,
  inputPadding = 20,
  scrollPosition: number,
) {
  const scrollViewNodeId = getNodeId(scrollView);

  if (!(await getIsDescendant(focusedInputId, scrollViewNodeId))) {
    return;
  }

  const [scrollViewHeight, inputPosition]: [
    null | number,
    null | { start: number; end: number },
  ] = await Promise.all([
    getScrollViewHeight(scrollViewNodeId),
    getInputPosition(focusedInputId, scrollViewNodeId, inputPadding),
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

async function getScrollViewHeight(scrollViewNodeId: number | string) {
  const { height } = await measureNodeAsync(scrollViewNodeId);
  return height;
}

async function getInputPosition(
  focusedId: number | string,
  scrollViewNodeId: number | string,
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
