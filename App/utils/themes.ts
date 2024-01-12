import { Theme ,DefaultTheme, DarkTheme  } from "@react-navigation/native";

export const MyLightTheme: Theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#FFF',
      text: '#000',
    },
  };
  
  export const MyDarkTheme: Theme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: '#000',
      text: '#FFF',
    },
  };
  