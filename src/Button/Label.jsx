"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Label = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("@huds0n/theming/src/theme");
function Label(props) {
    const labelText = getLabelText(props);
    if (!labelText)
        return null;
    return (<react_native_1.Text adjustsFontSizeToFit numberOfLines={1} style={handleLabelStyle(props)}>
      {labelText}
    </react_native_1.Text>);
}
exports.Label = Label;
function getLabelText({ children, label }) {
    return typeof children === "string" ? children : label;
}
function handleLabelStyle({ disabled, disabledLabelStyle, labelStyle, pressed, pressedLabelStyle, }) {
    return react_native_1.StyleSheet.flatten([
        { color: theme_1.theme.colors.TEXT, fontSize: theme_1.theme.fontSizes.LABEL },
        labelStyle,
        disabled && disabledLabelStyle,
        pressed && pressedLabelStyle,
    ]);
}
