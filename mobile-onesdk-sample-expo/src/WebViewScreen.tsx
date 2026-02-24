import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'WebView'>;

function generateUUID(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default function WebViewScreen({ route, navigation }: Props) {
  const { environment, apiKey, customerId, customerChildId, flowId } = route.params;
  const [onboardingUrl, setOnboardingUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOnboardingUrl();
  }, []);

  const fetchOnboardingUrl = async () => {
    const baseUrl =
      environment === 'uat' ? 'https://api.uat.frankie.one' : 'https://api.frankie.one';

    const endpoint = `${baseUrl}/idv/v2/idvalidate/onboarding-url`;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      api_key: apiKey,
      'X-Frankie-CustomerID': customerId,
    };

    if (customerChildId) {
      headers['X-Frankie-CustomerChildID'] = customerChildId;
    }

    const body = JSON.stringify({
      customerRef: generateUUID(),
      consent: true,
      flowId,
    });

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers,
        body,
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorBody}`);
      }

      const data = await response.json();

      if (!data.url) {
        throw new Error('No URL returned from the onboarding API.');
      }

      setOnboardingUrl(data.url);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(message);
      Alert.alert('Error', message, [{ text: 'Go Back', onPress: () => navigation.goBack() }]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={styles.loadingText}>Preparing verification...</Text>
      </View>
    );
  }

  if (error || !onboardingUrl) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error ?? 'Failed to load verification URL.'}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: onboardingUrl }}
        style={styles.webview}
        startInLoadingState
        renderLoading={() => (
          <View style={styles.webviewLoading}>
            <ActivityIndicator size="large" color="#2563EB" />
          </View>
        )}
        javaScriptEnabled
        domStorageEnabled
        allowsInlineMediaPlayback
        mediaPlaybackRequiresUserAction={false}
        mediaCapturePermissionGrantType="grant"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#F5F7FA',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6B7280',
  },
  errorText: {
    fontSize: 16,
    color: '#DC2626',
    textAlign: 'center',
  },
  webview: {
    flex: 1,
  },
  webviewLoading: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
  },
});
