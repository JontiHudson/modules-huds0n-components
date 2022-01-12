import type {
  FlatListProps as FlatListPropsRN,
  ImageProps,
  PressableAndroidRippleConfig,
  PressableProps as PressablePropsRN,
  ImageSourcePropType,
  GestureResponderEvent,
  ScrollViewProps as ScrollViewPropsRN,
  StyleProp,
  TextStyle,
  ViewStyle,
  ViewProps,
} from "react-native";

import { UtilityTypes } from "@huds0n/utilities";

export declare namespace Types {
  export type OnPress =
    | ((event: GestureResponderEvent) => any)
    | undefined
    | false
    | null;

  export type FeedBack = "fade" | "highlight" | "none";

  export type BadgeProps = {
    color?: string;
    containerStyle?: StyleProp<ViewStyle>;
    maxValue?: number;
    offset?: { x?: number; y?: number };
    size?: number;
    textColor?: string;
    textStyle?: StyleProp<TextStyle>;
    value: number;
  };

  export type ButtonProps = Omit<PressableProps, "children"> & {
    children?: string | PressableProps["children"];
    color?: string;
    disabledLabelStyle?: StyleProp<TextStyle>;
    disabledStyle?: StyleProp<ViewStyle>;
    dismissInputOnPress?: boolean;
    label?: string;
    labelStyle?: StyleProp<TextStyle>;
    pressedStyle?: StyleProp<ViewStyle>;
    pressedLabelStyle?: StyleProp<TextStyle>;
    spinner?: boolean;
    spinnerColor?: string;
    spinnerStyle?: StyleProp<ViewStyle>;
  };

  export type FadeOverlayPosition = "TOP" | "BOTTOM" | "LEFT" | "RIGHT";

  export type FadeOverlayProps = {
    color?: string;
    enable?: boolean;
    height?: number | string;
    width?: number | string;
    intensity?: number;
    position?: FadeOverlayPosition;
    absolute?: boolean;
  };

  export type FlatListProps<ItemT = any> = FlatListPropsRN<ItemT> & {
    activityIndicatorColor?: string;
    keyName?: string;
    onPullToRefresh?: () => Promise<void> | void;
    reverseZIndex?: boolean;
  };

  export type VectorIconSet =
    | "AntDesign"
    | "Entypo"
    | "EvilIcons"
    | "Feather"
    | "FontAwesome"
    | "FontAwesome5"
    | "Fontisto"
    | "Foundation"
    | "Ionicons"
    | "MaterialCommunityIcons"
    | "MaterialIcons"
    | "Octicons"
    | "Zocial"
    | "SimpleLineIcons";

  type DynamicProps = {
    backgroundColor?: string;
    badgeProps?: Omit<BadgeProps, "value">;
    color?: string;
    containerStyle?: StyleProp<ViewStyle>;
    size?: number;
    component?: React.ReactNode;
    imageProps?: ImageProps;
    name?: string;
    set?: VectorIconSet;
    source?: ImageSourcePropType;
  };

  export type IconProps = PressableProps &
    DynamicProps & {
      badge?: number;
      dismissInputOnPress?: boolean;
      disabledProps?: DynamicProps;
      pressedProps?: DynamicProps;
    };

  export type LayoutViewProps = Omit<ViewProps, "children"> & {
    children?: (
      layout: UtilityTypes.LayoutRectangle
    ) => React.ReactNode | React.ReactNode[];
    significantChangePercent?: number;
  };

  export type PressableProps = Omit<
    PressablePropsRN,
    "android_ripple" | "onPress"
  > & {
    android_ripple?: boolean | PressableAndroidRippleConfig;
    feedback?: FeedBack;
    feedbackIntensity?: number;
    onPress?: OnPress;
    whilePress?: () => () => void;
    requiresNetwork?: boolean;
  };

  export type ScrollViewProps = React.PropsWithChildren<ScrollViewPropsRN> & {
    inputPadding?: number;
  };

  export type SeparatorProps = {
    flex?: boolean | number;
    height?: number;
    width?: number;
  };
}
