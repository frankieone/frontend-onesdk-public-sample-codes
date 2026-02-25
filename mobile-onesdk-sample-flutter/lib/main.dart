import 'package:flutter/material.dart';
import 'credentials_screen.dart';

void main() {
  runApp(const OneSDKSampleApp());
}

class OneSDKSampleApp extends StatelessWidget {
  const OneSDKSampleApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'FrankieOne OneSDK Sample',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: const Color(0xFF1A73E8)),
        useMaterial3: true,
      ),
      home: const CredentialsScreen(),
    );
  }
}
