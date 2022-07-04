// ignore_for_file: unnecessary_new, deprecated_member_use
import 'package:flutter/material.dart';

class ApplicationBar extends StatelessWidget {
  final String asset;
  final Color color;

  const ApplicationBar({Key? key, required this.color, required this.asset})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return AppBar(
      elevation: 0,
      centerTitle: false,
      actions: [
        Padding(
            padding: const EdgeInsets.fromLTRB(0, 0, 15, 5),
            child: ClipRRect(
              borderRadius: BorderRadius.circular(20), // Image border
              child: SizedBox.fromSize(
                size: const Size.fromRadius(23),
                child: Image.asset(
                  asset,
                  fit: BoxFit.cover,
                ),
              ),
            )),
      ],
      title: const Text(
        "Planning",
        style: TextStyle(
            color: Color(0XFFFBE8A6),
            fontSize: 28.0,
            fontWeight: FontWeight.bold),
      ),
      backgroundColor: color,
      automaticallyImplyLeading: false,
    );
  }
}