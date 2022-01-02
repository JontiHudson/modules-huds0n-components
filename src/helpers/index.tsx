import Huds0nError from '@huds0n/error';

import { LinearGradient, VectorIcons } from './optionalImports';

export function getLinearGradient() {
  if (LinearGradient) return LinearGradient;

  throw new Huds0nError({
    name: 'huds0nComponentError',
    code: 'INPUTS_MISSING',
    message:
      'expo-linear-gradient or react-native-linear-gradient must be installed to use',
    severity: 'HIGH',
  });
}

export function getVectorIcons() {
  if (VectorIcons) return VectorIcons;

  throw new Huds0nError({
    name: 'huds0nComponentError',
    code: 'VECTOR_ICONS_MISSING',
    message: 'Please check correct vector-icons module is downloaded',
    severity: 'HIGH',
  });
}
