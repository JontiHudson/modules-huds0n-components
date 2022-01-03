import { LinearGradientRN } from "./react-native-linear-gradient";
import { ExpoLinearGradient } from "./expo-linear-gradient";

import { VectorIconsRN } from "./react-native-vector-icons";
import { ExpoVectorIcons } from "./expo-vector-icons";

export const LinearGradient = ExpoLinearGradient || LinearGradientRN;
export const VectorIcons = ExpoVectorIcons || VectorIconsRN;
