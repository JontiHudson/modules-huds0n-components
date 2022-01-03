import {
  FlatList as FlatListRN,
  FlatListProps as FlatListPropsRN,
} from "react-native";

export type Ref<ItemT = any> = React.Ref<FlatListRN<ItemT>>;

export type _Component<ItemT = any> = React.ForwardRefExoticComponent<
  Props<ItemT> & React.RefAttributes<FlatListRN<ItemT>>
>;

export type Component<ItemT = any> = _Component<ItemT>;

export type Props<ItemT = any> = FlatListPropsRN<ItemT> & {
  activityIndicatorColor?: string;
  keyName?: string;
  onPullToRefresh?: () => Promise<void> | void;
  reverseZIndex?: boolean;
};
