import 'package:camera/camera.dart';
import 'package:flutter/material.dart';
import 'package:firebase_ml_vision/firebase_ml_vision.dart';
import 'package:flutter_application_1/components/utils_scanner.dart';

class camTools extends StatefulWidget {
  @override
  _CamToolState createState() => _CamToolState();
}

class _CamToolState extends State<camTools> {
  bool isWorking = false;
  FaceDetector? faceDetector;
  CameraController? camController;
  CameraDescription? description;
  CameraLensDirection camDirection = CameraLensDirection.front;
  List<Face>? facelist;
  Size? size;

  initCamera() async {
    description = await UtilsScanner.getCamera(camDirection);
    camController = CameraController(description, ResolutionPreset.medium);
    faceDetector =
        FirebaseVision.instance.faceDetector(const FaceDetectorOptions(
      enableClassification: true,
      minFaceSize: 0.1,
      mode: FaceDetectorMode.fast,
    ));

    await camController!.initialize().then((value) {
      if (!mounted) {
        return;
      }
      camController!.startImageStream((imageFromStream) => {
            if (!isWorking)
              {
                isWorking = true,
                performDetectionOnStreamFrames(imageFromStream)
              }
          });
    });
  }

  dynamic scanResults;
  performDetectionOnStreamFrames(CameraImage cameraImage) async {
    UtilsScanner.detect(
      image: cameraImage,
      detectInImage: faceDetector!.processImage,
      imageRotation: description!.sensorOrientation,
    ).then((dynamic results) {
      setState(() {
        scanResults = results;
      });
    }).whenComplete(() {
      isWorking = false;
    });
  }

  @override
  void initState() {
    super.initState();
    initCamera();
  }

  @override
  void dispose() {
    super.dispose();
    camController?.dispose();
    faceDetector!.close();
  }

  Widget buildResult() {
    if (scanResults == null ||
        camController == null ||
        !camController!.value.isInitialized) {
      return const Text("Scanning...");
    }
    final Size imageSize = Size(camController!.value.previewSize.height,
        camController!.value.previewSize.width);
    CustomPainter customPainter =
        FaceDetectorPainter(imageSize, scanResults, camDirection);
    return CustomPaint(
      painter: customPainter,
    );
  }

  toggleCameraToFrontorBack() async {
    if (camDirection == CameraLensDirection.front) {
      camDirection = CameraLensDirection.back;
    } else {
      camDirection = CameraLensDirection.front;
    }
    await camController!.stopImageStream();
    await camController!.dispose();

    setState(() {
      camController = null;
    });

    initCamera();
  }

  @override
  Widget build(BuildContext context) {
    List<Widget> stackWigetChildren = [];
    size = MediaQuery.of(context).size;

    if (camController != null) {
      stackWigetChildren.add(
        Positioned(
          top: 0,
          left: 0,
          width: size!.width,
          height: size!.height - 250,
          child: Container(
            child: (camController!.value.isInitialized)
                ? AspectRatio(
                    aspectRatio: camController!.value.previewSize.aspectRatio,
                    child: CameraPreview(camController!),
                  )
                : Container(),
          ),
        ),
      );
    }
    stackWigetChildren.add(
      Positioned(
        top: 0,
        left: 0.0,
        width: size!.width,
        height: size!.height - 250,
        child: buildResult(),
      ),
    );

    stackWigetChildren.add(
      Positioned(
        top: size!.height - 250,
        left: 0.0,
        width: size!.width,
        height: 250,
        child: Container(
          margin: EdgeInsets.only(bottom: 80),
          child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                IconButton(
                    onPressed: () {
                      toggleCameraToFrontorBack();
                    },
                    icon: Icon(Icons.cached, color: Colors.white),
                    iconSize: 50,
                    color: Colors.black)
              ]),
        ),
      ),
    );
    return Scaffold(
      body: Container(
        margin: const EdgeInsets.only(top: 0),
        color: Colors.black,
        child: Stack(
          children: stackWigetChildren,
        ),
      ),
    );
  }
}

class FaceDetectorPainter extends CustomPainter {
  FaceDetectorPainter(
      this.absoluteImageSize, this.faces, this.camLensDirection);

  final Size absoluteImageSize;
  final List<Face> faces;
  CameraLensDirection camLensDirection;

  @override
  void paint(Canvas canvas, Size size) {
    final double scaleX = size.width / absoluteImageSize.width;
    final double scaleY = size.height / absoluteImageSize.height;

    final Paint paint = Paint()
      ..style = PaintingStyle.stroke
      ..strokeWidth = 2.0
      ..color = Colors.green;

    for (Face face in faces) {
      canvas.drawRect(
          Rect.fromLTRB(
            camLensDirection == CameraLensDirection.front
                ? (absoluteImageSize.width - face.boundingBox.right) * scaleX
                : face.boundingBox.left * scaleX,
            face.boundingBox.top * scaleY,
            camLensDirection == CameraLensDirection.front
                ? (absoluteImageSize.width - face.boundingBox.left) * scaleX
                : face.boundingBox.right * scaleX,
            face.boundingBox.bottom * scaleY,
          ),
          paint);
    }
  }

  @override
  bool shouldRepaint(FaceDetectorPainter oldDecoration) {
    return oldDecoration.absoluteImageSize != absoluteImageSize ||
        oldDecoration.faces != faces;
  }
}
