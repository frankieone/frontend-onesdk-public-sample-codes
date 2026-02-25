import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CredentialsScreen from './CredentialsScreen';
import WebViewScreen from './WebViewScreen';

export type RootStackParamList = {
  Credentials: undefined;
  WebView: {
    baseUrl: string;
    apiKey: string;
    customerId: string;
    customerChildId: string;
    flowId: string;
    customerRef: string;
    entityId: string;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Credentials">
        <Stack.Screen
          name="Credentials"
          component={CredentialsScreen}
          options={{title: 'OneSDK Sample'}}
        />
        <Stack.Screen
          name="WebView"
          component={WebViewScreen}
          options={{title: 'Verification'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
