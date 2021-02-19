import { FadeOverlayContainer } from '../FadeOverlay';

export const theming = {
  props: {
    contentContainerStyle: 'viewStyle',
    contentInset: {
      top: 'spacing',
      left: 'spacing',
      bottom: 'spacing',
      right: 'spacing',
    },
    contentOffset: { x: 'spacing', y: 'spacing' },
    endFillColor: 'color',
    fadingEdgeLength: 'spacing',
    fade: FadeOverlayContainer.theming.props,
    style: 'viewStyle',
  },
} as const;
