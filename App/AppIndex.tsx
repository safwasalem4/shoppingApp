import React, {useEffect} from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  NavigationContainer,
  NavigationContainerProps,
} from '@react-navigation/native';
import Home from './screens/Home';
import {MyDarkTheme, MyLightTheme} from './utils/themes';
import {useAppDispatch, useAppSelector} from './utils/hooks';
import {changeTheme} from './store/themeSlice';

const AppIndex: React.FC<NavigationContainerProps> = () => {
  const dispatch = useAppDispatch();
  const scheme = useColorScheme();
  const Stack = createStackNavigator();
  const colorThemeDevice = useAppSelector(state => state.theme.theme);

  useEffect(() => {
    dispatch(changeTheme(scheme));
  }, [scheme]);

  return (
    <NavigationContainer
      theme={colorThemeDevice === 'dark' ? MyDarkTheme : MyLightTheme}>
      <StatusBar
        barStyle={
          colorThemeDevice === 'dark' ? 'light-content' : 'dark-content'
        }
        backgroundColor={colorThemeDevice === 'dark' ? '#000' : 'white'}
      />
      <Stack.Navigator
        initialRouteName={'Home'}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppIndex;
