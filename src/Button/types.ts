import { TextStyle, StyleProp, ViewStyle } from 'react-native';

import { Pressable } from '../Pressable';
import * as Types from '../types';

export type Children = string | React.ReactNode;

export type Props = Omit<Pressable.Props, 'children' | 'style'> & {
  children?: Pressable.Props['children'];
  color?: string;
  disabledLabelStyle?: StyleProp<TextStyle>;
  disabledStyle?: StyleProp<ViewStyle>;
  dismissInputOnPress?: boolean;
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  onPress: Types.OnPressFn;
  pressedStyle?: StyleProp<ViewStyle>;
  pressedLabelStyle?: StyleProp<TextStyle>;
  spinner?: boolean;
  spinnerColor?: string;
  spinnerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  useIsConnected?: boolean;
};

export type LabelProps = Props & { pressed: boolean };
