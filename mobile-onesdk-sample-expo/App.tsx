import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import CredentialsScreen from './src/CredentialsScreen';
import WebViewScreen from './src/WebViewScreen';

export type RootStackParamList = {
  Credentials: undefined;
  WebView: {
    environment: 'uat' | 'production';
    apiKey: string;
    customerId: string;
    customerChildId: string;
    flowId: string;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Credentials">
          <Stack.Screen
            name="Credentials"
            component={CredentialsScreen}
            options={{ title: 'FrankieOne OneSDK' }}
          />
          <Stack.Screen
            name="WebView"
            component={WebViewScreen}
            options={{ title: 'Verification' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
