"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrollToFocus = void 0;
const utilities_1 = require("@huds0n/utilities");
async function scrollToFocus(scrollView, focusedInputId, inputPadding = 20, scrollPosition) {
    const scrollViewNodeId = (0, utilities_1.getNodeId)(scrollView);
    if (!(await (0, utilities_1.getIsDescendant)(focusedInputId, scrollViewNodeId))) {
        return;
    }
    const [scrollViewHeight, inputPosition] = await Promise.all([
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
    }
    else if (inputPosition.end > scrollViewHeight + scrollPosition) {
        scrollView.scrollTo({
            y: inputPosition.end - scrollViewHeight,
            animated: true,
        });
    }
}
exports.scrollToFocus = scrollToFocus;
async function getScrollViewHeight(scrollViewNodeId) {
    const { height } = await (0, utilities_1.measureNodeAsync)(scrollViewNodeId);
    return height;
}
async function getInputPosition(focusedId, scrollViewNodeId, inputPadding) {
    const { height, top } = await (0, utilities_1.measureRelativeNodeAsync)(focusedId, scrollViewNodeId);
    return {
        start: top - inputPadding,
        end: top + height + inputPadding,
    };
}
