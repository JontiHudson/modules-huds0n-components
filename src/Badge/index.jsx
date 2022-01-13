"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Badge = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("@huds0n/theming/src/theme");
const utilities_1 = require("@huds0n/utilities");
const DEFAULT_SIZE = 14;
const DEFAULT_MAX_VALUE = 9;
function Badge(props) {
    const Contents = handleBadgeContents(props);
    if (!props.value)
        return null;
    return <react_native_1.View style={handleStyle(props)}>{Contents}</react_native_1.View>;
}
exports.Badge = Badge;
function handleStyle({ color = theme_1.theme.colors.BADGE, containerStyle, offset, size = DEFAULT_SIZE, }) {
    return react_native_1.StyleSheet.flatten([
        {
            alignContent: "center",
            backgroundColor: color,
            borderRadius: size / 2,
            padding: size / 10,
            height: size,
            justifyContent: "center",
            position: "absolute",
            width: size,
            transform: [
                { translateX: offset?.x || 0 },
                { translateY: offset?.y || 0 },
            ],
        },
        containerStyle,
    ]);
}
function handleBadgeContents({ maxValue = DEFAULT_MAX_VALUE, textColor = theme_1.theme.colors.WHITE, textStyle, size = DEFAULT_SIZE, value, }) {
    return (0, utilities_1.useMemo)(() => {
        if (!value)
            return null;
        const text = value > maxValue ? maxValue.toFixed(0) + "+" : value.toFixed(0);
        return (<react_native_1.Text adjustsFontSizeToFit numberOfLines={1} style={react_native_1.StyleSheet.flatten([
                {
                    color: textColor,
                    fontSize: size * (text.length > 1 ? 0.6 : 0.8),
                    fontWeight: "300",
                    textAlign: "center",
                },
                textStyle,
            ])}>
        {text}
      </react_native_1.Text>);
    }, [maxValue, size, textColor, textStyle, value]);
}
