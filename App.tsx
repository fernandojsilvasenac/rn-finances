import React from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { ThemeProvider } from 'styled-components';
import theme from './src/global/styles/theme';

import { Dashboard } from './src/screens/Dashboard';
import { Register } from './src/screens/Register';
import { CategorySelect } from './src/screens/CategorySelect';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  })
  if(!fontsLoaded) return null;
  
  SplashScreen.hideAsync();

  return (
    <ThemeProvider theme={theme}>
      <Register/>
    </ThemeProvider>    
  );
}

