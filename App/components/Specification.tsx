import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {SpecificationProps} from './IComponents';

const Specification = ({title, value}: SpecificationProps) => {
  return (
    <View style={styles.specificationContainer}>
      <Text style={styles.specificationsTitle}>{title}: </Text>
      <Text style={styles.specification}>{value}</Text>
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
