export const VectorIcons = (function () {
  try {
    return require('@expo/vector-icons');
  } catch (e) {
    console.warn('@expo/vector-icons required to use vector icons');

    return null;
  }
})();
