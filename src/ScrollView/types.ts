import {
  ScrollView as ScrollViewRN,
  ScrollViewProps as ScrollViewPropsRN,
} from 'react-native';

import { FadeOverlayContainer } from '../FadeOverlay';
import { theming } from './theming';

export type FadeProp = FadeOverlayContainer.FadeProp;

export type Props = React.PropsWithChildren<ScrollViewPropsRN> & {
  inputPadding?: number;
  fade?: FadeOverlayContainer.Props;
};

export type _Component = React.ForwardRefExoticComponent<
  Props & React.RefAttributes<ScrollViewRN>
>;

export type Component = _Component & { theming: typeof theming };
