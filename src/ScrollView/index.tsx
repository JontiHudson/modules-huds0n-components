import React from "react";

import { ScrollViewComponent } from "./Component";

import * as Types from "./types";

export namespace ScrollView {
  export type Props = Types.Props;

  export type Component = Types.Component;
}

export const ScrollView: Types.Component = React.forwardRef((props, ref) => {
  return <ScrollViewComponent ref={ref} {...props} />;
});
