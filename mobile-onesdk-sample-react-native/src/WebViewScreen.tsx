import React, {useState, useEffect, useRef} from 'react';
import {View, ActivityIndicator, StyleSheet, Alert} from 'react-native';
import {WebView} from 'react-native-webview';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RouteProp} from '@react-navigation/native';
import type {RootStackParamList} from './App';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'WebView'>;
  route: RouteProp<RootStackParamList, 'WebView'>;
};

export default function WebViewScreen({navigation, route}: Props) {
  const {baseUrl, apiKey, customerId, customerChildId, flowId, customerRef, entityId} =
    route.params;

  const [onboardingUrl, setOnboardingUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    fetchOnboardingUrl();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchOnboardingUrl() {
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        api_key: apiKey,
        'X-Frankie-CustomerID': customerId,
      };

      if (customerChildId) {
        headers['X-Frankie-CustomerChildID'] = customerChildId;
      }

      const body: Record<string, unknown> = {
        customerRef,
        consent: true,
        flowId,
      };
      if (entityId) {
        body.entityId = entityId;
      }

      const response = await fetch(
        `${baseUrl}/idv/v2/idvalidate/onboarding-url`,
        {
          method: 'POST',
          headers,
          body: JSON.stringify(body),
        },
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const data = await response.json();

      if (!data.url) {
        throw new Error('No URL returned in response.');
      }

      setOnboardingUrl(data.url);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Unknown error occurred.';
      Alert.alert('Error', `Failed to fetch onboarding URL:\n${message}`, [
        {text: 'OK', onPress: () => navigation.goBack()},
      ]);
    }
  }

  if (!onboardingUrl) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0066ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {loading && (
        <ActivityIndicator
          size="large"
          color="#0066ff"
          style={styles.webViewLoading}
        />
      )}
      <WebView
        source={{uri: onboardingUrl}}
        style={styles.webview}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        javaScriptEnabled
        domStorageEnabled
        mediaPlaybackRequiresUserAction={false}
        allowsInlineMediaPlayback
        webviewDebuggingEnabled
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  webViewLoading: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -18,
    marginTop: -18,
    zIndex: 1,
  },
  webview: {
    flex: 1,
  },
});
