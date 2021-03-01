import {
  Animated,
  FlatList as FlatListRN,
  FlatListProps as FlatListPropsRN,
} from 'react-native';

import { FadeOverlayContainer } from '../FadeOverlay';

import { theming } from './theming';

export type Ref<ItemT = any> = React.Ref<FlatListRN<ItemT>>;

export type _Component<ItemT = any> = React.ForwardRefExoticComponent<
  Props<ItemT> & React.RefAttributes<FlatListRN<ItemT>>
>;

export type Component<ItemT = any> = _Component<ItemT> & {
  theming: typeof theming;
};

export type FadeProps = FadeOverlayContainer.Props;

export type Props<ItemT = any> = FlatListPropsRN<ItemT> & {
  activityIndicatorColor?: string;
  fade?: FadeProps;
  keyName?: string;
  onPullToRefresh?: () => Promise<void> | void;
  reverseZIndex?: boolean;
};
