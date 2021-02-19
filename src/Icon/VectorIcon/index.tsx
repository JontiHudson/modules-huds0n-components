export const VectorIcons = (function () {
  try {
    return {
      AntDesign: require('react-native-vector-icons/AntDesign'),
      Entypo: require('react-native-vector-icons/Entypo'),
      EvilIcons: require('react-native-vector-icons/EvilIcons'),
      Feather: require('react-native-vector-icons/Feather'),
      FontAwesome: require('react-native-vector-icons/FontAwesome'),
      FontAwesome5: require('react-native-vector-icons/FontAwesome5'),
      Fontisto: require('react-native-vector-icons/Fontisto'),
      Foundation: require('react-native-vector-icons/Foundation'),
      Ionicons: require('react-native-vector-icons/Ionicons'),
      MaterialIcons: require('react-native-vector-icons/MaterialIcons'),
      MaterialCommunityIcons: require('react-native-vector-icons/MaterialCommunityIcons'),
      Octicons: require('react-native-vector-icons/Octicons'),
      Zocial: require('react-native-vector-icons/Zocial'),
      SimpleLineIcons: require('react-native-vector-icons/SimpleLineIcons'),
    };
  } catch (e) {
    console.warn('react-native-vector-icons required to use vector icons');

    return null;
  }
})();
