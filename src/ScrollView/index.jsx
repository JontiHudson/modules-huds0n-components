"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrollView = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const react_native_1 = require("react-native");
exports.ScrollView = react_1.default.forwardRef((props, ref) => {
    return (<react_native_1.ScrollView ref={ref} overScrollMode="never" keyboardDismissMode="interactive" keyboardShouldPersistTaps="always" {...props} style={undefined}/>);
});
