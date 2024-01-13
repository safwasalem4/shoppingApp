import React from 'react';
import {View, SafeAreaView} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {ContainerProps} from './IComponents';
import {style} from './Container';

export const Container = ({
  children,
  backgroundColor,
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
      <Header cart backButton={false} title="Products" />
      <View style={style.main}>{children}</View>
    </View>
  );
};
