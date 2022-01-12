"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FadeOverlay = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("@huds0n/theming/src/theme");
const utilities_1 = require("@huds0n/utilities");
const helpers_1 = require("../helpers");
function FadeOverlay({ color = theme_1.theme.colors.BACKGROUND, enable = true, position = "TOP", intensity = 2, height, width, absolute = true, }) {
    const LinearGradient = (0, helpers_1.getLinearGradient)();
    const [gradientProps, positionStyle] = (0, utilities_1.useMemo)(() => {
        switch (position) {
            case "BOTTOM":
                return [
                    { start: { x: 0, y: 1 }, end: { x: 0, y: 0 } },
                    {
                        bottom: 0,
                        height: height || theme_1.theme.spacings.L,
                        width: width || "100%",
                    },
                ];
            case "LEFT":
                return [
                    { start: { x: 0, y: 0 }, end: { x: 1, y: 0 } },
                    {
                        left: 0,
                        height: height || "100%",
                        width: width || theme_1.theme.spacings.L,
                    },
                ];
            case "RIGHT":
                return [
                    { start: { x: 1, y: 0 }, end: { x: 0, y: 0 } },
                    {
                        right: -react_native_1.StyleSheet.hairlineWidth,
                        height: height || "100%",
                        width: width || theme_1.theme.spacings.L,
                    },
                ];
            default:
                return [
                    { start: { x: 0, y: 0 }, end: { x: 0, y: 1 } },
                    {
                        top: 0,
                        height: height || theme_1.theme.spacings.L,
                        width: width || "100%",
                    },
                ];
        }
    });
    const gradients = (0, utilities_1.useMemo)(() => {
        const array = [];
        for (let i = 0; i < intensity; i++) {
            array.push(<LinearGradient key={i} colors={[color, (0, utilities_1.addColorTransparency)(color, 0)]} style={react_native_1.StyleSheet.absoluteFill} {...gradientProps}/>);
        }
        return array;
    }, [color]);
    return (<react_native_1.View style={{
            position: absolute ? "absolute" : "relative",
            zIndex: 1000,
            ...positionStyle,
        }}>
      {enable && gradients}
    </react_native_1.View>);
}
exports.FadeOverlay = FadeOverlay;
