import { ScrollView } from '../ScrollView';

export const theming = {
  props: {
    ...ScrollView.theming.props,
    activityIndicatorColor: 'color',
    columnWrapperStyle: 'viewStyle',
    ListFooterComponentStyle: 'viewStyle',
    ListHeaderComponentStyle: 'viewStyle',
  },
} as const;
