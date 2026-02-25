import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:uuid/uuid.dart';
import 'package:webview_flutter/webview_flutter.dart';

class WebViewScreen extends StatefulWidget {
  final String environment;
  final String apiKey;
  final String customerId;
  final String customerChildId;
  final String flowId;
  final String customerRef;
  final String entityId;

  const WebViewScreen({
    super.key,
    required this.environment,
    required this.apiKey,
    required this.customerId,
    required this.customerChildId,
    required this.flowId,
    required this.customerRef,
    required this.entityId,
  });

  @override
  State<WebViewScreen> createState() => _WebViewScreenState();
}

class _WebViewScreenState extends State<WebViewScreen> {
  String? _url;
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _fetchUrl();
  }

  Future<void> _fetchUrl() async {
    final baseUrl = widget.environment == 'UAT'
        ? 'https://api.uat.frankie.one'
        : 'https://api.frankie.one';

    final uri = Uri.parse('$baseUrl/idv/v2/idvalidate/onboarding-url');

    final headers = <String, String>{
      'api_key': widget.apiKey,
      'X-Frankie-CustomerID': widget.customerId,
      'Content-Type': 'application/json',
    };

    if (widget.customerChildId.isNotEmpty) {
      headers['X-Frankie-CustomerChildID'] = widget.customerChildId;
    }

    final bodyMap = <String, dynamic>{
      'customerRef': widget.customerRef.isEmpty
          ? const Uuid().v4()
          : widget.customerRef,
      'consent': true,
      'flowId': widget.flowId,
    };
    if (widget.entityId.isNotEmpty) {
      bodyMap['entityId'] = widget.entityId;
    }

    try {
      final response = await http.post(uri, headers: headers, body: jsonEncode(bodyMap));

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        final url = data['url'] as String?;
        if (url != null && mounted) {
          setState(() {
            _url = url;
            _isLoading = false;
          });
        } else {
          _showErrorAndPop('No URL found in response');
        }
      } else {
        _showErrorAndPop('API error: ${response.statusCode} - ${response.body}');
      }
    } catch (e) {
      _showErrorAndPop('Network error: $e');
    }
  }

  void _showErrorAndPop(String message) {
    if (!mounted) return;
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(message)),
    );
    Navigator.pop(context);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('OneSDK Verification'),
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
      ),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : WebViewWidget(
              controller: WebViewController()
                ..setJavaScriptMode(JavaScriptMode.unrestricted)
                ..setOnPlatformPermissionRequest(
                  (PlatformWebViewPermissionRequest request) {
                    request.grant();
                  },
                )
                ..loadRequest(Uri.parse(_url!)),
            ),
    );
  }
}
