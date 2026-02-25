import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RootStackParamList} from './App';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Credentials'>;
};

const STORAGE_KEYS = {
  IS_UAT: '@onesdk_is_uat',
  API_KEY: '@onesdk_api_key',
  CUSTOMER_ID: '@onesdk_customer_id',
  CUSTOMER_CHILD_ID: '@onesdk_customer_child_id',
  FLOW_ID: '@onesdk_flow_id',
  CUSTOMER_REF: '@onesdk_customer_ref',
  ENTITY_ID: '@onesdk_entity_id',
};

function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default function CredentialsScreen({navigation}: Props) {
  const [isUAT, setIsUAT] = useState(true);
  const [apiKey, setApiKey] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [customerChildId, setCustomerChildId] = useState('');
  const [flowId, setFlowId] = useState('idv');
  const [customerRef, setCustomerRef] = useState('');
  const [entityId, setEntityId] = useState('');

  useEffect(() => {
    loadStoredCredentials();
  }, []);

  async function loadStoredCredentials() {
    try {
      const [
        storedIsUAT,
        storedApiKey,
        storedCustomerId,
        storedCustomerChildId,
        storedFlowId,
        storedCustomerRef,
        storedEntityId,
      ] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.IS_UAT),
        AsyncStorage.getItem(STORAGE_KEYS.API_KEY),
        AsyncStorage.getItem(STORAGE_KEYS.CUSTOMER_ID),
        AsyncStorage.getItem(STORAGE_KEYS.CUSTOMER_CHILD_ID),
        AsyncStorage.getItem(STORAGE_KEYS.FLOW_ID),
        AsyncStorage.getItem(STORAGE_KEYS.CUSTOMER_REF),
        AsyncStorage.getItem(STORAGE_KEYS.ENTITY_ID),
      ]);

      if (storedIsUAT !== null) setIsUAT(storedIsUAT === 'true');
      if (storedApiKey !== null) setApiKey(storedApiKey);
      if (storedCustomerId !== null) setCustomerId(storedCustomerId);
      if (storedCustomerChildId !== null) setCustomerChildId(storedCustomerChildId);
      if (storedFlowId !== null) setFlowId(storedFlowId);
      if (storedCustomerRef !== null) setCustomerRef(storedCustomerRef);
      if (storedEntityId !== null) setEntityId(storedEntityId);
    } catch {
      // Ignore storage read errors
    }
  }

  async function handleStartVerification() {
    if (!apiKey.trim()) {
      Alert.alert('Error', 'API Key is required.');
      return;
    }
    if (!customerId.trim()) {
      Alert.alert('Error', 'Customer ID is required.');
      return;
    }
    if (!flowId.trim()) {
      Alert.alert('Error', 'Flow ID is required.');
      return;
    }

    try {
      await Promise.all([
        AsyncStorage.setItem(STORAGE_KEYS.IS_UAT, String(isUAT)),
        AsyncStorage.setItem(STORAGE_KEYS.API_KEY, apiKey.trim()),
        AsyncStorage.setItem(STORAGE_KEYS.CUSTOMER_ID, customerId.trim()),
        AsyncStorage.setItem(STORAGE_KEYS.CUSTOMER_CHILD_ID, customerChildId.trim()),
        AsyncStorage.setItem(STORAGE_KEYS.FLOW_ID, flowId.trim()),
        AsyncStorage.setItem(STORAGE_KEYS.CUSTOMER_REF, customerRef.trim()),
        AsyncStorage.setItem(STORAGE_KEYS.ENTITY_ID, entityId.trim()),
      ]);
    } catch {
      // Ignore storage write errors
    }

    const baseUrl = isUAT
      ? 'https://api.uat.frankie.one'
      : 'https://api.frankie.one';

    navigation.navigate('WebView', {
      baseUrl,
      apiKey: apiKey.trim(),
      customerId: customerId.trim(),
      customerChildId: customerChildId.trim(),
      flowId: flowId.trim(),
      customerRef: customerRef.trim() || generateUUID(),
      entityId: entityId.trim(),
    });
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>OneSDK Sample</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Environment</Text>
          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>
              {isUAT ? 'UAT' : 'Production'}
            </Text>
            <Switch value={isUAT} onValueChange={setIsUAT} />
          </View>
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>API Key</Text>
          <TextInput
            style={styles.input}
            value={apiKey}
            onChangeText={setApiKey}
            placeholder="Enter API Key"
            placeholderTextColor="#999"
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
            placeholder="Enter Customer ID"
            placeholderTextColor="#999"
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
            placeholderTextColor="#999"
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
            placeholderTextColor="#999"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Customer Reference (optional)</Text>
          <TextInput
            style={styles.input}
            value={customerRef}
            onChangeText={setCustomerRef}
            placeholder="Auto-generated if empty"
            placeholderTextColor="#999"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Entity ID (optional)</Text>
          <TextInput
            style={styles.input}
            value={entityId}
            onChangeText={setEntityId}
            placeholder="Existing entity ID"
            placeholderTextColor="#999"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleStartVerification}>
          <Text style={styles.buttonText}>Start Verification</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 32,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  switchLabel: {
    fontSize: 14,
    color: '#666',
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1a1a1a',
  },
  button: {
    backgroundColor: '#0066ff',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
