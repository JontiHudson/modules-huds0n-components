import { GestureResponderEvent } from 'react-native';

export type OnPressFn =
  | ((event: GestureResponderEvent) => any)
  | undefined
  | false
  | null;
