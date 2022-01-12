"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pressable = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const react_native_1 = require("react-native");
const utilities_1 = require("@huds0n/utilities");
const _core_1 = require("@huds0n/utilities/src/_core");
exports.Pressable = react_1.default.forwardRef((props, ref) => {
    return (<react_native_1.Pressable ref={ref} {...props} disabled={handleDisabled(props)} {...handlePress(props)} android_ripple={handleAndroidRipple(props)} style={handleStyle(props)}/>);
});
function handleDisabled({ disabled, requiresNetwork }) {
    if (requiresNetwork && !_core_1.huds0nState.useProp("isNetworkConnected")[0]) {
        return true;
    }
    return disabled;
}
function highlightColor(color, amount) {
    const highlightedColor = (0, utilities_1.darkenColor)(color, amount);
    return (highlightedColor === null || highlightedColor === void 0 ? void 0 : highlightedColor.startsWith("#000000"))
        ? (0, utilities_1.lightenColor)(color, amount)
        : highlightedColor;
}
function handlePress(props) {
    const pressCleanUpFn = (0, utilities_1.useRef)(null);
    const onPress = props.onPress || undefined;
    const onPressIn = (0, utilities_1.useCallback)((event) => {
        var _a, _b;
        (_a = props.onPressIn) === null || _a === void 0 ? void 0 : _a.call(props, event);
        pressCleanUpFn.current = ((_b = props.whilePress) === null || _b === void 0 ? void 0 : _b.call(props)) || null;
    }, [props.onPressIn]);
    const onPressOut = (0, utilities_1.useCallback)((event) => {
        var _a, _b;
        (_a = props.onPressOut) === null || _a === void 0 ? void 0 : _a.call(props, event);
        (_b = pressCleanUpFn.current) === null || _b === void 0 ? void 0 : _b.call(pressCleanUpFn);
        pressCleanUpFn.current = null;
    }, [props.onPressOut]);
    return { onPress, onPressIn, onPressOut };
}
function handleAndroidRipple({ android_ripple, feedbackIntensity, style, }) {
    return (0, utilities_1.useMemo)(() => {
        if (react_native_1.Platform.OS === "android" && android_ripple) {
            if (typeof android_ripple === "object" && android_ripple.color) {
                return android_ripple;
            }
            const _android_ripple = android_ripple === true ? {} : android_ripple;
            const { backgroundColor } = react_native_1.StyleSheet.flatten(typeof style === "function" ? style({ pressed: false }) : style);
            return {
                ..._android_ripple,
                color: typeof backgroundColor === "string"
                    ? highlightColor(backgroundColor, feedbackIntensity)
                    : undefined,
            };
        }
    }, [android_ripple, feedbackIntensity, style]);
}
function handleStyle(props) {
    const { android_ripple, feedback, feedbackIntensity, style } = props;
    return (0, utilities_1.useMemo)(() => {
        if (noPressStyleRequired(props)) {
            return style;
        }
        if (feedback === "fade") {
            return getFadeFeedbackStyle(props);
        }
        return getHighlightFeedbackStyle(props);
    }, [android_ripple, feedback, feedbackIntensity, style]);
}
function noPressStyleRequired({ android_ripple, feedback, }) {
    return (!feedback ||
        feedback === "none" ||
        (react_native_1.Platform.OS === "android" && android_ripple));
}
function getFadeFeedbackStyle({ feedbackIntensity, style, }) {
    return (0, utilities_1.flattenPressableStyle)([
        style,
        ({ pressed }) => pressed
            ? {
                opacity: typeof feedbackIntensity === "number" ? feedbackIntensity : 0.2,
            }
            : {},
    ]);
}
function getHighlightFeedbackStyle({ feedbackIntensity, style, }) {
    const { backgroundColor } = react_native_1.StyleSheet.flatten(typeof style === "function" ? style({ pressed: false }) : style);
    const activeColor = typeof backgroundColor === "string"
        ? highlightColor(backgroundColor, feedbackIntensity || 10)
        : undefined;
    return (0, utilities_1.flattenPressableStyle)([
        style,
        ({ pressed }) => pressed
            ? {
                backgroundColor: activeColor,
            }
            : {},
    ]);
}
