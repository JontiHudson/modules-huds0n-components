import {
  ScrollView as ScrollViewRN,
  ScrollViewProps as ScrollViewPropsRN,
} from 'react-native';

import { FadeOverlayContainer } from '../FadeOverlay';

export type FadeProp = FadeOverlayContainer.FadeProp;

export type Props = React.PropsWithChildren<ScrollViewPropsRN> & {
  inputPadding?: number;
  fade?: FadeOverlayContainer.Props;
};

export type Component = React.ForwardRefExoticComponent<
  Props & React.RefAttributes<ScrollViewRN>
>;
