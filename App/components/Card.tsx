import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../utils/colors';
import {CardProps} from './IComponents';

const Card = ({children, otherStyle}: CardProps) => {
  return <View style={[style.container, otherStyle]}>{children}</View>;
};

export default Card;

const style = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
});
