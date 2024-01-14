import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {SpecificationProps} from './IComponents';
import {useTheme} from '@react-navigation/native';

const Specification = ({title, value}: SpecificationProps) => {
  const {colors: themeColors} = useTheme();
  return (
    <View style={styles.specificationContainer}>
      <Text style={[styles.specificationsTitle, {color: themeColors.text}]}>
        {title + ': '}
      </Text>
      <Text style={[styles.specification, {color: themeColors.text}]}>
        {value}
      </Text>
    </View>
  );
};

export default Specification;

const styles = StyleSheet.create({
  specificationContainer: {
    marginTop: 8,
    flexDirection: 'row',
  },
  specificationsTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  specification: {
    fontSize: 16,
  },
});
