import 'package:flutter/material.dart';
import 'package:camera/camera.dart';
import '../myapp.dart';

List<CameraDescription>? cameras;

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  cameras = await availableCameras();
  runApp(const MyApp());
}

class Camera extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: MyApp.quinaryColor,
      body: Stack(
        children: <Widget>[],
      ),
    );
  }
}
