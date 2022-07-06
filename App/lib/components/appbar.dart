// ignore_for_file: unnecessary_new, deprecated_member_use
import 'package:flutter/material.dart';
import '../myapp.dart';

class ApplicationBar extends StatelessWidget {
  final String asset;
  final String title;
  final Color color;

  const ApplicationBar({
    Key? key,
    required this.asset,
    required this.title,
    required this.color,
  }) : super(key: key);

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
      title: Text(
        title,
        style: TextStyle(
            color: MyApp.tertiaryColor,
            fontSize: 28.0,
            fontWeight: FontWeight.bold),
      ),
      backgroundColor: color,
      automaticallyImplyLeading: false,
    );
  }
}
