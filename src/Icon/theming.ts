import { Badge } from '../Badge';

const dynamicProps = {
  backgroundColor: 'color',
  badgeProps: Badge.theming.props,
  color: 'color',
  containerStyle: 'viewStyle',
} as const;

export const theming = {
  props: {
    ...dynamicProps,
    disabledProps: dynamicProps,
    pressedProps: dynamicProps,
  },
} as const;
