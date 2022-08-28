import 'package:flutter/services.dart';

import 'myapp.dart';
import 'package:flutter/material.dart';
import 'package:camera/camera.dart';

List<CameraDescription>? cameras;

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  FutureBuilder.debugRethrowError = true;
  await SystemChrome.setPreferredOrientations(
      [DeviceOrientation.portraitUp, DeviceOrientation.portraitDown]);
  cameras = await availableCameras();
  runApp(const MyApp());
}
