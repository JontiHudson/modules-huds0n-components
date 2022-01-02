import React from 'react';

import { IconComponent } from './Component';

import * as Types from './types';

export namespace Icon {
  export type VectorIconSet = Types.VectorIconSet;

  export type ImageProps = Types.ImageProps;
  export type ImageSource = Types.ImageSource;

  export type BadgeProps = Types.BadgeProps;

  export type DisabledProps = Types.DisabledProps;
  export type PressedProps = Types.PressedProps;

  export type OnPressFn = Types.OnPressFn;

  export type Props = Types.Props;

  export type Component = typeof Icon;
}

function createSheet<I extends Record<string, Partial<Types.Props>>>(icons: I) {
  return icons;
}

export class Icon extends React.Component<Icon.Props> {
  static createSheet = createSheet;

  render() {
    return <IconComponent {...this.props} />;
  }
}
