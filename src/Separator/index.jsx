"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Separator = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("@huds0n/theming/src/theme");
function Separator(props) {
    const { flex, height, width } = props;
    if (flex) {
        return (<react_native_1.View style={{
                height,
                width,
                flex: flex === true ? 1 : flex,
            }}/>);
    }
    return (<react_native_1.View style={{
            height: height ?? theme_1.theme.spacings.M,
            width: width ?? theme_1.theme.spacings.M,
        }}/>);
}
exports.Separator = Separator;
