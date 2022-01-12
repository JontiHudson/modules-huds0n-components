"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VectorIcons = exports.LinearGradient = void 0;
const react_native_linear_gradient_1 = require("./react-native-linear-gradient");
const expo_linear_gradient_1 = require("./expo-linear-gradient");
const react_native_vector_icons_1 = require("./react-native-vector-icons");
const expo_vector_icons_1 = require("./expo-vector-icons");
exports.LinearGradient = expo_linear_gradient_1.ExpoLinearGradient || react_native_linear_gradient_1.LinearGradientRN;
exports.VectorIcons = expo_vector_icons_1.ExpoVectorIcons || react_native_vector_icons_1.VectorIconsRN;
