"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlatList = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const react_native_1 = require("react-native");
const helpers_1 = require("./helpers");
exports.FlatList = react_1.default.forwardRef((props, ref) => {
    const { numColumns, style } = props;
    return (<react_native_1.View style={style}>
        <react_native_1.View style={{ height: "100%", width: "100%" }}>
          <react_native_1.Animated.FlatList ref={ref} onEndReachedThreshold={0.5} key={numColumns} {...props} style={{ height: "100%", width: "100%" }} {...(0, helpers_1.getKeyExtractor)(props)} {...(0, helpers_1.getRefreshControl)(props)} {...(0, helpers_1.handleDynamicScrollLayout)(props)} {...(0, helpers_1.handleZIndex)(props)}/>
        </react_native_1.View>
      </react_native_1.View>);
});
