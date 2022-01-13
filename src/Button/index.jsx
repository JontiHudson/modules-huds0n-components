"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("@huds0n/theming/src/theme");
const utilities_1 = require("@huds0n/utilities");
const _core_1 = require("@huds0n/utilities/src/_core");
const Pressable_1 = require("../Pressable");
const Label_1 = require("./Label");
function Button(props) {
    const { children, color, dismissInputOnPress = true, disabledStyle, label, onPress, pressedStyle, spinner, spinnerColor = theme_1.theme.colors.WHITE, spinnerStyle, style, ...restProps } = props;
    const disabled = handleDisabled(props);
    return (<Pressable_1.Pressable feedback={handleDefaultFeedback(props)} {...restProps} requiresNetwork={false} onPress={handleOnPress(props)} disabled={disabled} style={handleStyle(props, disabled)}>
      {handleContents(props, disabled)}
    </Pressable_1.Pressable>);
}
exports.Button = Button;
function handleDisabled({ disabled: disabledProp, onLongPress, onPress, onPressIn, onPressOut, spinner, requiresNetwork, whilePress, }) {
    let disabled = disabledProp ||
        spinner ||
        (!onPress && !onPressIn && !onPressOut && !onLongPress && !whilePress);
    if (requiresNetwork && !_core_1.huds0nState.useProp("isNetworkConnected")[0]) {
        return true;
    }
    return disabled;
}
function handleDefaultFeedback({ color, pressedStyle, style, }) {
    if (pressedStyle && react_native_1.StyleSheet.flatten(pressedStyle)?.backgroundColor) {
        return undefined;
    }
    if (color ||
        (typeof style !== "function" && react_native_1.StyleSheet.flatten(style)?.backgroundColor)) {
        return "highlight";
    }
    return "fade";
}
function handleOnPress({ dismissInputOnPress, onPress }) {
    return (0, utilities_1.useCallback)((event) => {
        dismissInputOnPress && _core_1.huds0nState.state.dismissInput();
        onPress && onPress(event);
    }, [onPress]);
}
function handleContents(props, disabled) {
    const { children, spinner, spinnerColor, spinnerStyle, label } = props;
    return ({ pressed }) => {
        if (spinner) {
            return <react_native_1.ActivityIndicator color={spinnerColor} style={spinnerStyle}/>;
        }
        if (react_1.default.isValidElement(children)) {
            <react_native_1.View pointerEvents="none" style={{ flex: 1 }}>
        {children}
      </react_native_1.View>;
        }
        if (typeof children === "function") {
            return children({ pressed });
        }
        if (label || typeof children === "string") {
            return <Label_1.Label {...props} pressed={pressed} disabled={disabled}/>;
        }
        return children;
    };
}
function handleStyle({ color, disabledStyle, pressedStyle, style }, disabled) {
    return ({ pressed }) => {
        return react_native_1.StyleSheet.flatten([
            {
                alignItems: "center",
                backgroundColor: color,
                borderRadius: theme_1.theme.spacings.M,
                borderWidth: react_native_1.StyleSheet.hairlineWidth,
                justifyContent: "center",
                overflow: "hidden",
                padding: theme_1.theme.spacings.M,
            },
            typeof style === "function" ? style({ pressed }) : style,
            pressed && pressedStyle,
            disabled && disabledStyle,
        ]);
    };
}
