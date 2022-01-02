import React from 'react';
import { ScrollView as ScrollViewRN } from 'react-native';

import * as Types from './types';

export const ScrollViewComponent: Types.Component = React.forwardRef(
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
  },
);
