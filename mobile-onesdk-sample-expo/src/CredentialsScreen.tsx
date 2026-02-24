import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Switch,
  Platform,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Credentials'>;

const STORAGE_KEYS = {
  ENVIRONMENT: '@onesdk_environment',
  API_KEY: '@onesdk_api_key',
  CUSTOMER_ID: '@onesdk_customer_id',
  CUSTOMER_CHILD_ID: '@onesdk_customer_child_id',
  FLOW_ID: '@onesdk_flow_id',
};

export default function CredentialsScreen({ navigation }: Props) {
  const [environment, setEnvironment] = useState<'uat' | 'production'>('uat');
  const [apiKey, setApiKey] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [customerChildId, setCustomerChildId] = useState('');
  const [flowId, setFlowId] = useState('idv');

  useEffect(() => {
    loadStoredCredentials();
  }, []);

  const loadStoredCredentials = async () => {
    try {
      const [storedEnv, storedApiKey, storedCustomerId, storedChildId, storedFlowId] =
        await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.ENVIRONMENT),
          AsyncStorage.getItem(STORAGE_KEYS.API_KEY),
          AsyncStorage.getItem(STORAGE_KEYS.CUSTOMER_ID),
          AsyncStorage.getItem(STORAGE_KEYS.CUSTOMER_CHILD_ID),
          AsyncStorage.getItem(STORAGE_KEYS.FLOW_ID),
        ]);

      if (storedEnv === 'uat' || storedEnv === 'production') {
        setEnvironment(storedEnv);
      }
      if (storedApiKey) setApiKey(storedApiKey);
      if (storedCustomerId) setCustomerId(storedCustomerId);
      if (storedChildId) setCustomerChildId(storedChildId);
      if (storedFlowId) setFlowId(storedFlowId);
    } catch {
      // Silently fail — fields will use defaults
    }
  };

  const saveCredentials = useCallback(async () => {
    try {
      await Promise.all([
        AsyncStorage.setItem(STORAGE_KEYS.ENVIRONMENT, environment),
        AsyncStorage.setItem(STORAGE_KEYS.API_KEY, apiKey),
        AsyncStorage.setItem(STORAGE_KEYS.CUSTOMER_ID, customerId),
        AsyncStorage.setItem(STORAGE_KEYS.CUSTOMER_CHILD_ID, customerChildId),
        AsyncStorage.setItem(STORAGE_KEYS.FLOW_ID, flowId),
      ]);
    } catch {
      // Silently fail on save
    }
  }, [environment, apiKey, customerId, customerChildId, flowId]);

  const handleStartVerification = async () => {
    if (!apiKey.trim()) {
      Alert.alert('Validation Error', 'API Key is required.');
      return;
    }
    if (!customerId.trim()) {
      Alert.alert('Validation Error', 'Customer ID is required.');
      return;
    }
    if (!flowId.trim()) {
      Alert.alert('Validation Error', 'Flow ID is required.');
      return;
    }

    await saveCredentials();

    navigation.navigate('WebView', {
      environment,
      apiKey: apiKey.trim(),
      customerId: customerId.trim(),
      customerChildId: customerChildId.trim(),
      flowId: flowId.trim(),
    });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>OneSDK Hosted Flow</Text>
      <Text style={styles.subtitle}>Enter your credentials to start verification</Text>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Environment</Text>
        <View style={styles.switchRow}>
          <Text style={[styles.switchLabel, environment === 'uat' && styles.switchLabelActive]}>
            UAT
          </Text>
          <Switch
            value={environment === 'production'}
            onValueChange={(value) => setEnvironment(value ? 'production' : 'uat')}
            trackColor={{ false: '#4A90D9', true: '#E74C3C' }}
            thumbColor={Platform.OS === 'android' ? '#FFFFFF' : undefined}
          />
          <Text
            style={[styles.switchLabel, environment === 'production' && styles.switchLabelActive]}
          >
            Production
          </Text>
        </View>
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>API Key</Text>
        <TextInput
          style={styles.input}
          value={apiKey}
          onChangeText={setApiKey}
          placeholder="Enter your API key"
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Customer ID</Text>
        <TextInput
          style={styles.input}
          value={customerId}
          onChangeText={setCustomerId}
          placeholder="Enter your Customer ID"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Customer Child ID (optional)</Text>
        <TextInput
          style={styles.input}
          value={customerChildId}
          onChangeText={setCustomerChildId}
          placeholder="Enter Customer Child ID"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Flow ID</Text>
        <TextInput
          style={styles.input}
          value={flowId}
          onChangeText={setFlowId}
          placeholder="Enter Flow ID"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleStartVerification} activeOpacity={0.8}>
        <Text style={styles.buttonText}>Start Verification</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  contentContainer: {
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A2E',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 32,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === 'ios' ? 14 : 10,
    fontSize: 16,
    color: '#111827',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  switchLabel: {
    fontSize: 15,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  switchLabelActive: {
    color: '#1A1A2E',
    fontWeight: '700',
  },
  button: {
    backgroundColor: '#2563EB',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
