import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { Button, Icon, ScrollView } from '@huds0n/components';

export default function Components() {
  const [badge, setBadge] = useState(0);

  const incrementBadge = () => setBadge(badge + 1);

  const onClick = () => {
    console.log('Pressed');
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView
        fade={{ bottom: true }}
        contentContainerStyle={styles.scrollViewContainer}
        style={styles.scrollView}
      >
        <View>
          <View style={styles.buttonContainer}>
            <Text>Label can be prop or child</Text>
            <Text>Without background button will fade</Text>
            <Button
              onPress={onClick}
              style={styles.buttonBase}
              label="Click Me"
            />
          </View>
          <View style={styles.buttonContainer}>
            <Text>Button with background will highlight</Text>
            <Button
              onPress={onClick}
              style={[styles.buttonBase, styles.buttonColored]}
            >
              Click Me
            </Button>
          </View>
          <View style={styles.buttonContainer}>
            <Text>Feedback can be overridden</Text>
            <Button
              feedback="fade"
              onPress={onClick}
              style={[styles.buttonBase, styles.buttonColored]}
            >
              Click Me
            </Button>
          </View>
          <View style={styles.buttonContainer}>
            <Text>Or have custom feedback</Text>
            <Button
              pressedLabelStyle={styles.buttonPressedLabel}
              pressedStyle={styles.buttonPressed}
              onPress={onClick}
              style={styles.buttonBase}
            >
              Click Me
            </Button>
          </View>
          <View style={styles.buttonContainer}>
            <Text>Text will automatically reduce</Text>
            <Button
              feedback="fade"
              onPress={onClick}
              style={[styles.buttonBase, styles.buttonThin]}
            >
              Click Me
            </Button>
          </View>
          <View style={styles.buttonContainer}>
            <Text>Spinner can be used to show ongoing action</Text>
            <Button
              feedback="fade"
              onPress={onClick}
              spinner
              spinnerColor={colors.BLUE}
              style={styles.buttonBase}
            >
              Click Me
            </Button>
          </View>
          <View style={styles.buttonContainer}>
            <Text>This button is disabled</Text>
            <Button
              disabled
              onPress={onClick}
              disabledLabelStyle={styles.buttonDisabledLabel}
              disabledStyle={styles.buttonDisabled}
              style={styles.buttonBase}
            >
              Click Me
            </Button>
          </View>
          <View style={styles.buttonContainer}>
            <Text>This button has an icon (with a badge)</Text>
            <Button onPress={incrementBadge} style={styles.buttonBase}>
              {({ pressed }) => (
                <Icon
                  name={
                    pressed
                      ? 'cursor-default-click'
                      : 'cursor-default-click-outline'
                  }
                  set="MaterialCommunityIcons"
                  badge={badge}
                  badgeProps={{
                    color: colors.RED,
                    maxValue: 5,
                    size: 15,
                    textStyle: { color: colors.WHITE },
                  }}
                />
              )}
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const colors = {
  BLUE: 'lightblue',
  GREY: 'grey',
  RED: 'red',
  WHITE: 'white',
};

const styles = StyleSheet.create({
  buttonBase: {
    margin: 20,
    width: 100,
  },
  buttonContainer: {
    alignItems: 'center',
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
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  },
  scrollViewContainer: {
    alignItems: 'center',
    padding: 20,
  },
});
