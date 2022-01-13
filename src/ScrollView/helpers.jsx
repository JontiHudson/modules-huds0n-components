"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrollToFocus = void 0;
const tslib_1 = require("tslib");
const utilities_1 = require("@huds0n/utilities");
function scrollToFocus(scrollView, focusedInputId, inputPadding = 20, scrollPosition) {
    return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        const scrollViewNodeId = (0, utilities_1.getNodeId)(scrollView);
        if (!(yield (0, utilities_1.getIsDescendant)(focusedInputId, scrollViewNodeId))) {
            return;
        }
        const [scrollViewHeight, inputPosition] = yield Promise.all([
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
    });
}
exports.scrollToFocus = scrollToFocus;
function getScrollViewHeight(scrollViewNodeId) {
    return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        const { height } = yield (0, utilities_1.measureNodeAsync)(scrollViewNodeId);
        return height;
    });
}
function getInputPosition(focusedId, scrollViewNodeId, inputPadding) {
    return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        const { height, top } = yield (0, utilities_1.measureRelativeNodeAsync)(focusedId, scrollViewNodeId);
        return {
            start: top - inputPadding,
            end: top + height + inputPadding,
        };
    });
}
