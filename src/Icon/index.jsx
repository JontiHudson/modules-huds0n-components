"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Icon = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("@huds0n/theming/src/theme");
const utilities_1 = require("@huds0n/utilities");
const _core_1 = require("@huds0n/utilities/src/_core");
const Badge_1 = require("../Badge");
const Pressable_1 = require("../Pressable");
const helpers_1 = require("../helpers");
const DEFAULT_SIZE = theme_1.theme.fontSizes.BODY;
const DISABLED_COLOR = theme_1.theme.colors.DISABLED;
function Icon(props) {
    const { backgroundColor, badge = 0, badgeProps, color, containerStyle, disabledProps, dismissInputOnPress = true, onPress, pressedProps } = props, rest = (0, tslib_1.__rest)(props, ["backgroundColor", "badge", "badgeProps", "color", "containerStyle", "disabledProps", "dismissInputOnPress", "onPress", "pressedProps"]);
    const pressable = handlePressable(props);
    const disabled = handleDisabled(props, pressable);
    return (<Pressable_1.Pressable pointerEvents={!pressable || disabled ? "none" : "auto"} feedback="fade" onPress={handleOnpress(props)} disabled={!pressable || disabled} {...rest} requiresNetwork={false} style={handleContainerStyle(props, disabled)}>
      {({ pressed }) => (<>
          {handleIconComponent(props, disabled, pressed)}
          {handleBadgeComponent(props, disabled, pressed)}
        </>)}
    </Pressable_1.Pressable>);
}
exports.Icon = Icon;
function handlePressable(props) {
    return ("onPress" in props ||
        "onPressIn" in props ||
        "onPressOut" in props ||
        "onLongPress" in props ||
        "whilePress" in props);
}
function handleDisabled({ disabled, onLongPress, onPress, onPressIn, onPressOut, requiresNetwork, whilePress, }, pressable) {
    if (requiresNetwork && !_core_1.huds0nState.useProp("isNetworkConnected")[0]) {
        return true;
    }
    return (disabled ||
        (pressable &&
            !onPress &&
            !onPressIn &&
            !onPressOut &&
            !onLongPress &&
            !whilePress));
}
function handleOnpress({ dismissInputOnPress, onPress }) {
    return (0, utilities_1.useMemo)(() => (event) => {
        dismissInputOnPress && _core_1.huds0nState.state.dismissInput();
        onPress && onPress(event);
    }, [onPress]);
}
function handleContainerStyle({ backgroundColor, containerStyle, disabledProps, pressedProps, }, disabled) {
    return ({ pressed }) => {
        const containerColor = (disabled && (disabledProps === null || disabledProps === void 0 ? void 0 : disabledProps.backgroundColor)) || backgroundColor;
        return react_native_1.StyleSheet.flatten([
            {
                alignItems: "center",
                backgroundColor: containerColor,
                justifyContent: "center",
            },
            containerStyle,
            pressed &&
                !!(pressedProps === null || pressedProps === void 0 ? void 0 : pressedProps.backgroundColor) && {
                backgroundColor: pressedProps === null || pressedProps === void 0 ? void 0 : pressedProps.backgroundColor,
            },
        ]);
    };
}
function handleIconComponent(props, disabled, pressed) {
    const { color, disabledProps, pressedProps } = props;
    const _color = (disabled && ((disabledProps === null || disabledProps === void 0 ? void 0 : disabledProps.color) || DISABLED_COLOR)) ||
        (pressed && (pressedProps === null || pressedProps === void 0 ? void 0 : pressedProps.color)) ||
        color;
    return (getVectorIcon(props, disabled, pressed, _color) ||
        getImageIcon(props, disabled, pressed, _color) ||
        getCustomIcon(props, disabled, pressed));
}
function getCustomIcon({ component, disabledProps, pressedProps }, disabled, pressed) {
    if (component) {
        return ((disabled && (disabledProps === null || disabledProps === void 0 ? void 0 : disabledProps.component)) ||
            (pressed && (pressedProps === null || pressedProps === void 0 ? void 0 : pressedProps.component)) ||
            component);
    }
}
function getImageIcon({ imageProps, source, pressedProps, disabledProps, size = DEFAULT_SIZE, }, disabled, pressed, color) {
    if (source) {
        const _size = (disabled && (disabledProps === null || disabledProps === void 0 ? void 0 : disabledProps.size)) ||
            (pressed && (pressedProps === null || pressedProps === void 0 ? void 0 : pressedProps.size)) ||
            size;
        const _source = (disabled && (disabledProps === null || disabledProps === void 0 ? void 0 : disabledProps.source)) ||
            (pressed && (pressedProps === null || pressedProps === void 0 ? void 0 : pressedProps.source)) ||
            source;
        const _imageProps = Object.assign(Object.assign(Object.assign({}, imageProps), (disabled && (disabledProps === null || disabledProps === void 0 ? void 0 : disabledProps.imageProps))), (pressed && (pressedProps === null || pressedProps === void 0 ? void 0 : pressedProps.imageProps)));
        return (<react_native_1.Image resizeMode="contain" source={_source} {..._imageProps} style={react_native_1.StyleSheet.flatten([
                {
                    height: _size,
                    width: _size,
                    tintColor: color,
                },
                _imageProps === null || _imageProps === void 0 ? void 0 : _imageProps.style,
            ])}/>);
    }
}
function getVectorIcon({ name, pressedProps, disabledProps, size = theme_1.theme.fontSizes.BODY, set = "FontAwesome", }, disabled, pressed, color) {
    if (name) {
        const _size = (disabled && (disabledProps === null || disabledProps === void 0 ? void 0 : disabledProps.size)) ||
            (pressed && (pressedProps === null || pressedProps === void 0 ? void 0 : pressedProps.size)) ||
            size;
        const _name = (disabled && (disabledProps === null || disabledProps === void 0 ? void 0 : disabledProps.name)) ||
            (pressed && (pressedProps === null || pressedProps === void 0 ? void 0 : pressedProps.name)) ||
            name;
        const _set = (disabled && (disabledProps === null || disabledProps === void 0 ? void 0 : disabledProps.set)) || (pressed && (pressedProps === null || pressedProps === void 0 ? void 0 : pressedProps.set)) || set;
        const IconSet = (0, helpers_1.getVectorIcons)()[_set];
        if (IconSet) {
            return <IconSet color={color} name={_name} size={_size}/>;
        }
    }
}
function handleBadgeComponent({ badge, badgeProps, color, disabledProps, pressedProps, size = DEFAULT_SIZE, }, disabled, pressed) {
    if (!badge) {
        return null;
    }
    return (<Badge_1.Badge offset={{ x: size / 3, y: -size / 3 }} size={size / 2} textColor={color} value={badge} {...Object.assign(Object.assign(Object.assign({}, badgeProps), (disabled && (disabledProps === null || disabledProps === void 0 ? void 0 : disabledProps.badgeProps))), (pressed && (pressedProps === null || pressedProps === void 0 ? void 0 : pressedProps.badgeProps)))}/>);
}
