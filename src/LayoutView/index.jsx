"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LayoutView = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const react_native_1 = require("react-native");
const utilities_1 = require("@huds0n/utilities");
exports.LayoutView = react_1.default.forwardRef((props, ref) => {
    const { children, onLayout, significantChangePercent, ...restProps } = props;
    const [layout, _onLayout] = (0, utilities_1.useLayout)({
        onLayout,
        significantChangePercent,
    });
    return (<react_native_1.View ref={ref} onLayout={_onLayout} {...restProps}>
        {children === null || children === void 0 ? void 0 : children(layout)}
      </react_native_1.View>);
});
