"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVectorIcons = exports.getLinearGradient = void 0;
const tslib_1 = require("tslib");
const error_1 = (0, tslib_1.__importDefault)(require("@huds0n/error"));
const optionalImports_1 = require("./optionalImports");
function getLinearGradient() {
    if (optionalImports_1.LinearGradient)
        return optionalImports_1.LinearGradient;
    throw new error_1.default({
        name: 'huds0nComponentError',
        code: 'INPUTS_MISSING',
        message: 'expo-linear-gradient or react-native-linear-gradient must be installed to use',
        severity: 'HIGH',
    });
}
exports.getLinearGradient = getLinearGradient;
function getVectorIcons() {
    if (optionalImports_1.VectorIcons)
        return optionalImports_1.VectorIcons;
    throw new error_1.default({
        name: 'huds0nComponentError',
        code: 'VECTOR_ICONS_MISSING',
        message: 'Please check correct vector-icons module is downloaded',
        severity: 'HIGH',
    });
}
exports.getVectorIcons = getVectorIcons;
