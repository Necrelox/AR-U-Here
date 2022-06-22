// ignore_for_file: unnecessary_new
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import '../animation.dart';
import '../components/navbar.dart';

class Test extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: Color.fromARGB(255, 218, 144, 33),
        bottomNavigationBar: NavBar(),
        body: SingleChildScrollView(
          child: Column(
            children: <Widget>[],
          ),
        ));
  }
}
