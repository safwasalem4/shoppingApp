import { useTheme } from '@react-navigation/native';
import React from 'react';
import {Text, View} from 'react-native';

const Home = () => {
    const {colors, }= useTheme()
  return (
    <View style={{
        backgroundColor:colors.background
    }}>
      <Text  style={{
        color:colors.text
    }}>Theme test</Text>
    </View>
  );
};

export default Home;
