"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleZIndex = exports.handleDynamicScrollLayout = exports.getRefreshControl = exports.getKeyExtractor = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const react_native_1 = require("react-native");
const utilities_1 = require("@huds0n/utilities");
function getKeyExtractor({ keyName, keyExtractor, }) {
    return { keyExtractor: keyName ? (0, utilities_1.useKeyExtractor)(keyName) : keyExtractor };
}
exports.getKeyExtractor = getKeyExtractor;
function getRefreshControl({ activityIndicatorColor, onPullToRefresh, refreshControl, }) {
    const [handlePullToRefresh, refreshing] = (0, utilities_1.useAsyncCallback)(async () => {
        await onPullToRefresh?.();
    }, [onPullToRefresh]);
    const _refreshControl = (0, utilities_1.useMemo)(() => onPullToRefresh ? (<react_native_1.RefreshControl tintColor={activityIndicatorColor} refreshing={refreshing} onRefresh={handlePullToRefresh}/>) : (refreshControl), [activityIndicatorColor, onPullToRefresh, refreshing, refreshControl]);
    return {
        refreshControl: _refreshControl,
    };
}
exports.getRefreshControl = getRefreshControl;
function handleDynamicScrollLayout({ onContentSizeChange, onLayout, onPullToRefresh, refreshControl, scrollEnabled = true, }) {
    const dynamicScrollingEnabled = !onPullToRefresh && !refreshControl;
    const [_scrollEnabled, _setScrollEnabled] = (0, utilities_1.useState)(false);
    const containerHeightRef = (0, utilities_1.useRef)(0);
    const contentsHeightRef = (0, utilities_1.useRef)(0);
    const timeoutRef = (0, utilities_1.useRef)(null);
    const handleChange = (0, utilities_1.useCallback)((ref, height) => {
        if (dynamicScrollingEnabled) {
            ref.current = height;
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            const enableScroll = !!containerHeightRef.current &&
                !!contentsHeightRef.current &&
                containerHeightRef.current <= contentsHeightRef.current;
            timeoutRef.current = setTimeout(() => {
                _setScrollEnabled(enableScroll);
            }, 0);
        }
    }, [dynamicScrollingEnabled]);
    const _onLayout = (0, utilities_1.useCallback)((event) => {
        onLayout?.(event);
        handleChange(containerHeightRef, event.nativeEvent.layout.height);
    }, [dynamicScrollingEnabled, onLayout]);
    const handleContentSizeChange = (0, utilities_1.useCallback)((width, height) => {
        onContentSizeChange?.(width, height);
        handleChange(contentsHeightRef, height);
    }, [dynamicScrollingEnabled, onContentSizeChange]);
    return {
        onLayout: _onLayout,
        onContentSizeChange: handleContentSizeChange,
        scrollEnabled: scrollEnabled && (!dynamicScrollingEnabled || _scrollEnabled),
    };
}
exports.handleDynamicScrollLayout = handleDynamicScrollLayout;
function handleZIndex({ CellRendererComponent = react_native_1.View, reverseZIndex, }) {
    if (reverseZIndex) {
        return {
            CellRendererComponent: (info) => (<CellRendererComponent {...info} style={{ zIndex: -info.index, elevation: -info.index }}/>),
        };
    }
}
exports.handleZIndex = handleZIndex;
