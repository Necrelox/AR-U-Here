import 'package:camera/camera.dart';
import 'package:flutter/material.dart';
import 'package:flutter_application_1/components/appbar.dart';

import '../main.dart';
import 'dart:io';
import 'package:image_picker/image_picker.dart';

class Camera extends StatefulWidget {
  @override
  _CameraState createState() => _CameraState();
}

class _CameraState extends State<Camera> {
  late File imageFile;
  bool isLoaded = false;

  _openGallery(BuildContext context) async {
    var picture = await ImagePicker().pickImage(source: ImageSource.gallery);
    setState(() {
      imageFile = File(picture!.path);
      isLoaded = true;
    });
    Navigator.of(context).pop();
  }

  _openCamera(BuildContext context) async {
    var picture = await ImagePicker().pickImage(source: ImageSource.camera);
    setState(() {
      imageFile = File(picture!.path);
      isLoaded = true;
    });
    Navigator.of(context).pop();
  }

  Future<void> _showChoiceDialog(BuildContext context) {
    return showDialog(
        context: context,
        builder: (BuildContext context) {
          return AlertDialog(
            title: Text('Make a choice'),
            content: SingleChildScrollView(
              child: ListBody(
                children: <Widget>[
                  GestureDetector(
                    child: Text("Gallery"),
                    onTap: () {
                      _openGallery(context);
                    },
                  ),
                  Padding(padding: EdgeInsets.all(8.0)),
                  GestureDetector(
                    child: Text("Camera"),
                    onTap: () {
                      _openCamera(context);
                    },
                  ),
                ],
              ),
            ),
          );
        });
  }

  Widget _decideImageView() {
    if (isLoaded == false) {
      return const Text('No image selected.');
    } else {
      return Image.file(imageFile);
    }
  }

  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return Scaffold(
      body: Container(
        child: Center(
            child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: <Widget>[
            // Text('Aucune image choisie'),
            _decideImageView(),
            RaisedButton(
              onPressed: () {
                _showChoiceDialog(context);
              },
              child: Text("Selectionnez une image"),
            ),
          ],
        )),
      ),
    );
    throw UnimplementedError();
  }
}
