"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrollView = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const react_native_1 = require("react-native");
const utilities_1 = require("@huds0n/utilities");
const _core_1 = require("@huds0n/utilities/src/_core");
const helpers_1 = require("./helpers");
exports.ScrollView = react_1.default.forwardRef((props, ref) => {
    const { contentContainerStyle, children, onScroll, inputPadding = 20, scrollEnabled: propsScrollEnabled = true, horizontal, ...restProps } = props;
    const [focusedId] = _core_1.huds0nState.useProp("focusedId");
    const [scrollEnabled, setScrollEnabled] = (0, utilities_1.useState)(false);
    const containerLength = (0, utilities_1.useRef)(0);
    const scrollLength = (0, utilities_1.useRef)(0);
    const scrollPositionRef = (0, utilities_1.useRef)(0);
    const scrollRef = (0, utilities_1.useCopyRef)(ref);
    (0, utilities_1.useEffect)(() => {
        if (focusedId && scrollRef.current) {
            (0, helpers_1.scrollToFocus)(scrollRef.current, focusedId, inputPadding, scrollPositionRef.current);
        }
    }, [focusedId, inputPadding, scrollRef.current]);
    const handleScroll = (0, utilities_1.useCallback)((event) => {
        onScroll === null || onScroll === void 0 ? void 0 : onScroll(event);
        scrollPositionRef.current = event.nativeEvent.contentOffset.y;
    }, [onScroll]);
    const handleScrollEnable = (0, utilities_1.useCallback)(() => {
        var _a;
        if (containerLength.current &&
            scrollLength.current > containerLength.current) {
            setScrollEnabled(true);
        }
        else if (scrollEnabled) {
            (_a = scrollRef.current) === null || _a === void 0 ? void 0 : _a.scrollTo({ x: 0, y: 0, animated: false });
            setScrollEnabled(false);
        }
    }, [scrollEnabled]);
    const handleLayoutScrollWrapper = (0, utilities_1.useCallback)(({ nativeEvent: { layout: { height, width }, }, }) => {
        containerLength.current = horizontal ? width : height;
        handleScrollEnable();
    }, [handleScrollEnable]);
    const handleLayoutScrollContainer = (0, utilities_1.useCallback)(({ nativeEvent: { layout: { height, width }, }, }) => {
        scrollLength.current = horizontal ? width : height;
        handleScrollEnable();
        if (focusedId && scrollRef.current) {
            (0, helpers_1.scrollToFocus)(scrollRef.current, focusedId, inputPadding, scrollPositionRef.current);
        }
    }, [
        focusedId,
        inputPadding,
        scrollRef.current,
        handleScrollEnable,
        scrollPositionRef.current,
    ]);
    return (<react_native_1.View onLayout={handleLayoutScrollWrapper}>
        <react_native_1.ScrollView ref={scrollRef} overScrollMode="never" keyboardDismissMode="interactive" keyboardShouldPersistTaps="always" {...restProps} horizontal={horizontal} onScroll={handleScroll} scrollEnabled={scrollEnabled && propsScrollEnabled} scrollEventThrottle={16}>
          <react_native_1.View style={[
            { flexDirection: horizontal ? "row" : "column" },
            contentContainerStyle,
        ]} onLayout={handleLayoutScrollContainer}>
            {children}
          </react_native_1.View>
        </react_native_1.ScrollView>
      </react_native_1.View>);
});
