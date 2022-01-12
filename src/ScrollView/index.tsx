import React from "react";
import { ScrollView as ScrollViewRN } from "react-native";

import type { Types } from "../types";

export const ScrollView = React.forwardRef<ScrollViewRN, Types.ScrollViewProps>(
  (props, ref) => {
    return (
      <ScrollViewRN
        ref={ref}
        overScrollMode="never"
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="always"
        {...props}
        style={undefined}
      />
    );
  }
);
