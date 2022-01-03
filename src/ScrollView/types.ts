import {
  ScrollView as ScrollViewRN,
  ScrollViewProps as ScrollViewPropsRN,
} from "react-native";

export type Props = React.PropsWithChildren<ScrollViewPropsRN> & {
  inputPadding?: number;
};

export type Component = React.ForwardRefExoticComponent<
  Props & React.RefAttributes<ScrollViewRN>
>;
