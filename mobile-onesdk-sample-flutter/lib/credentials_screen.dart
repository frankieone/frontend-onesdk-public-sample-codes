import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'webview_screen.dart';

class CredentialsScreen extends StatefulWidget {
  const CredentialsScreen({super.key});

  @override
  State<CredentialsScreen> createState() => _CredentialsScreenState();
}

class _CredentialsScreenState extends State<CredentialsScreen> {
  final _formKey = GlobalKey<FormState>();
  final _apiKeyController = TextEditingController();
  final _customerIdController = TextEditingController();
  final _customerChildIdController = TextEditingController();
  final _flowIdController = TextEditingController();
  final _customerRefController = TextEditingController();
  final _entityIdController = TextEditingController();

  String _environment = 'UAT';

  @override
  void initState() {
    super.initState();
    _loadPreferences();
  }

  Future<void> _loadPreferences() async {
    final prefs = await SharedPreferences.getInstance();
    setState(() {
      _environment = prefs.getString('environment') ?? 'UAT';
      _apiKeyController.text = prefs.getString('apiKey') ?? '';
      _customerIdController.text = prefs.getString('customerId') ?? '';
      _customerChildIdController.text = prefs.getString('customerChildId') ?? '';
      _flowIdController.text = prefs.getString('flowId') ?? 'idv';
      _customerRefController.text = prefs.getString('customerRef') ?? '';
      _entityIdController.text = prefs.getString('entityId') ?? '';
    });
  }

  Future<void> _savePreferences() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('environment', _environment);
    await prefs.setString('apiKey', _apiKeyController.text);
    await prefs.setString('customerId', _customerIdController.text);
    await prefs.setString('customerChildId', _customerChildIdController.text);
    await prefs.setString('flowId', _flowIdController.text);
    await prefs.setString('customerRef', _customerRefController.text);
    await prefs.setString('entityId', _entityIdController.text);
  }

  void _startVerification() async {
    if (!_formKey.currentState!.validate()) return;

    await _savePreferences();

    if (!mounted) return;

    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => WebViewScreen(
          environment: _environment,
          apiKey: _apiKeyController.text,
          customerId: _customerIdController.text,
          customerChildId: _customerChildIdController.text,
          flowId: _flowIdController.text,
          customerRef: _customerRefController.text,
          entityId: _entityIdController.text,
        ),
      ),
    );
  }

  @override
  void dispose() {
    _apiKeyController.dispose();
    _customerIdController.dispose();
    _customerChildIdController.dispose();
    _flowIdController.dispose();
    _customerRefController.dispose();
    _entityIdController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('FrankieOne OneSDK Sample'),
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              DropdownButtonFormField<String>(
                value: _environment,
                decoration: const InputDecoration(
                  labelText: 'Environment',
                  border: OutlineInputBorder(),
                ),
                items: const [
                  DropdownMenuItem(value: 'UAT', child: Text('UAT')),
                  DropdownMenuItem(value: 'Production', child: Text('Production')),
                ],
                onChanged: (value) {
                  if (value != null) setState(() => _environment = value);
                },
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _apiKeyController,
                obscureText: true,
                decoration: const InputDecoration(
                  labelText: 'API Key',
                  border: OutlineInputBorder(),
                ),
                validator: (value) =>
                    (value == null || value.isEmpty) ? 'API Key is required' : null,
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _customerIdController,
                decoration: const InputDecoration(
                  labelText: 'Customer ID',
                  border: OutlineInputBorder(),
                ),
                validator: (value) =>
                    (value == null || value.isEmpty) ? 'Customer ID is required' : null,
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _customerChildIdController,
                decoration: const InputDecoration(
                  labelText: 'Customer Child ID (optional)',
                  border: OutlineInputBorder(),
                ),
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _flowIdController,
                decoration: const InputDecoration(
                  labelText: 'Flow ID',
                  border: OutlineInputBorder(),
                ),
                validator: (value) =>
                    (value == null || value.isEmpty) ? 'Flow ID is required' : null,
              ),
              const SizedBox(height: 24),
              const Text(
                'Session (fill one or leave both empty)',
                style: TextStyle(fontSize: 12, color: Colors.grey),
              ),
              const SizedBox(height: 8),
              TextFormField(
                controller: _customerRefController,
                decoration: const InputDecoration(
                  labelText: 'Customer Reference (optional)',
                  hintText: 'Auto-generated if empty',
                  border: OutlineInputBorder(),
                ),
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _entityIdController,
                decoration: const InputDecoration(
                  labelText: 'Entity ID (optional)',
                  hintText: 'Existing entity ID',
                  border: OutlineInputBorder(),
                ),
              ),
              const SizedBox(height: 24),
              ElevatedButton(
                onPressed: _startVerification,
                style: ElevatedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(vertical: 16),
                ),
                child: const Text(
                  'Start Verification',
                  style: TextStyle(fontSize: 16),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
