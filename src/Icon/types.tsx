import React from 'react';
import {
  ImageProps as ImagePropsRN,
  ImageSourcePropType,
  StyleProp,
  ViewStyle,
} from 'react-native';

import { Badge } from '../Badge';
import { Pressable } from '../Pressable';

type StaticProps = Omit<Pressable.Props, 'children' | 'style'> & {
  badge?: number;
  dismissInputOnPress?: boolean;
};

export type VectorIconSet =
  | 'AntDesign'
  | 'Entypo'
  | 'EvilIcons'
  | 'Feather'
  | 'FontAwesome'
  | 'FontAwesome5'
  | 'Fontisto'
  | 'Foundation'
  | 'Ionicons'
  | 'MaterialCommunityIcons'
  | 'MaterialIcons'
  | 'Octicons'
  | 'Zocial'
  | 'SimpleLineIcons';

export type ImageProps = Omit<ImagePropsRN, 'source'>;
export type ImageSource = ImageSourcePropType;

export type BadgeProps = Omit<Badge.Props, 'value'>;

type DynamicProps = {
  backgroundColor?: string;
  badgeProps?: BadgeProps;
  color?: string;
  containerStyle?: StyleProp<ViewStyle>;
  size?: number;
  component?: React.ReactNode;
  imageProps?: ImageProps;
  name?: string;
  set?: VectorIconSet;
  source?: ImageSource;
};

export type DisabledProps = DynamicProps;
export type PressedProps = DynamicProps;

export type OnPressFn = Props['onPress'];

export type Props = StaticProps &
  DynamicProps & {
    disabledProps?: DisabledProps;
    pressedProps?: PressedProps;
  };
