let LinearGradient: any;

try {
  LinearGradient = require('expo-linear-gradient').LinearGradient;
} catch (e) {
  try {
    LinearGradient = require('react-native-linear-gradient').default;
  } catch (e) {}
}

export { LinearGradient };
