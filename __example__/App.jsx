"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importStar)(require("react"));
const react_native_1 = require("react-native");
const components_1 = require("@huds0n/components");
function Components() {
    const [badge, setBadge] = (0, react_1.useState)(0);
    const incrementBadge = () => setBadge(badge + 1);
    const onClick = () => {
        console.log("Pressed");
    };
    return (<react_native_1.SafeAreaView style={styles.safeAreaView}>
      <components_1.ScrollView contentContainerStyle={styles.scrollViewContainer} style={styles.scrollView}>
        <react_native_1.View>
          <react_native_1.View style={styles.buttonContainer}>
            <react_native_1.Text>Label can be prop or child</react_native_1.Text>
            <react_native_1.Text>Without background button will fade</react_native_1.Text>
            <components_1.Button onPress={onClick} style={styles.buttonBase} label="Click Me"/>
          </react_native_1.View>
          <react_native_1.View style={styles.buttonContainer}>
            <react_native_1.Text>Button with background will highlight</react_native_1.Text>
            <components_1.Button onPress={onClick} style={[styles.buttonBase, styles.buttonColored]}>
              Click Me
            </components_1.Button>
          </react_native_1.View>
          <react_native_1.View style={styles.buttonContainer}>
            <react_native_1.Text>Feedback can be overridden</react_native_1.Text>
            <components_1.Button feedback="fade" onPress={onClick} style={[styles.buttonBase, styles.buttonColored]}>
              Click Me
            </components_1.Button>
          </react_native_1.View>
          <react_native_1.View style={styles.buttonContainer}>
            <react_native_1.Text>Or have custom feedback</react_native_1.Text>
            <components_1.Button pressedLabelStyle={styles.buttonPressedLabel} pressedStyle={styles.buttonPressed} onPress={onClick} style={styles.buttonBase}>
              Click Me
            </components_1.Button>
          </react_native_1.View>
          <react_native_1.View style={styles.buttonContainer}>
            <react_native_1.Text>Text will automatically reduce on ios and android</react_native_1.Text>
            <components_1.Button feedback="fade" onPress={onClick} style={[styles.buttonBase, styles.buttonThin]}>
              Click Me
            </components_1.Button>
          </react_native_1.View>
          <react_native_1.View style={styles.buttonContainer}>
            <react_native_1.Text>Spinner can be used to show ongoing action</react_native_1.Text>
            <components_1.Button feedback="fade" onPress={onClick} spinner spinnerColor={colors.BLUE} style={styles.buttonBase}>
              Click Me
            </components_1.Button>
          </react_native_1.View>
          <react_native_1.View style={styles.buttonContainer}>
            <react_native_1.Text>This button is disabled</react_native_1.Text>
            <components_1.Button disabled onPress={onClick} disabledLabelStyle={styles.buttonDisabledLabel} disabledStyle={styles.buttonDisabled} style={styles.buttonBase}>
              Click Me
            </components_1.Button>
          </react_native_1.View>
          <react_native_1.View style={styles.buttonContainer}>
            <react_native_1.Text>This button has an icon (with a badge)</react_native_1.Text>
            <components_1.Button onPress={incrementBadge} style={styles.buttonBase}>
              {({ pressed }) => (<components_1.Icon name={pressed
                ? "cursor-default-click"
                : "cursor-default-click-outline"} set="MaterialCommunityIcons" badge={badge} badgeProps={{
                color: colors.RED,
                maxValue: 5,
                size: 15,
                textStyle: { color: colors.WHITE },
            }}/>)}
            </components_1.Button>
          </react_native_1.View>
        </react_native_1.View>
      </components_1.ScrollView>
    </react_native_1.SafeAreaView>);
}
exports.default = Components;
const colors = {
    BLUE: "lightblue",
    GREY: "grey",
    RED: "red",
    WHITE: "white",
};
const styles = react_native_1.StyleSheet.create({
    buttonBase: {
        margin: 20,
        width: 100,
    },
    buttonContainer: {
        alignItems: "center",
    },
    buttonColored: {
        backgroundColor: colors.BLUE,
    },
    buttonDisabled: {
        backgroundColor: colors.GREY,
    },
    buttonDisabledLabel: {
        color: colors.WHITE,
    },
    buttonPressed: {
        backgroundColor: colors.BLUE,
    },
    buttonPressedLabel: {
        color: colors.WHITE,
    },
    buttonThin: {
        width: 60,
    },
    safeAreaView: {
        flex: 1,
    },
    scrollView: {
        height: "100%",
        width: "100%",
    },
    scrollViewContainer: {
        alignItems: "center",
        padding: 20,
        justifyContent: "center",
    },
});
