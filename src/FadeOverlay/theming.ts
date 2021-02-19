export const themingFadeOverlay = {
  props: {
    color: 'color',
    height: 'dimension',
    width: 'dimension',
  },
} as const;

export const themingFadeOverlayContainer = {
  fadeOverlay: themingFadeOverlay.props,
  props: {
    top: themingFadeOverlay.props,
    bottom: themingFadeOverlay.props,
    left: themingFadeOverlay.props,
    right: themingFadeOverlay.props,
  },
} as const;
