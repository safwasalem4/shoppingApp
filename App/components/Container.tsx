import React from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {ContainerProps} from './IComponents';
import Header from './Header';

const Container = ({
  children,
  backgroundColor,
  headerTitle,
  headerBackgroundColor,
  backButton,
  cart,
  otherStyle,
}: ContainerProps) => {
  const {colors} = useTheme();

  return (
    <View
      style={{
        backgroundColor: backgroundColor ?? colors.background,
        height: '100%',
        width: '100%',
        flex: 1,
        ...otherStyle,
      }}>
      <SafeAreaView />
      <Header
        cart={cart}
        backButton={backButton}
        title={headerTitle}
        backgroundColor={headerBackgroundColor}
      />
      <View style={style.main}>{children}</View>
    </View>
  );
};

export default Container;

const style = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    flex: 1,
  },
  main: {
    // backgroundColor: 'blue',
    padding: 16,
  },
});
