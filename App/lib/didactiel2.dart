// ignore_for_file: unnecessary_new

import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'animation.dart';
import 'welcome_page.dart';
import 'didactiel3.dart';

class DidactielTwoo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: Color(0XFFD2FDFF),
        appBar: AppBar(
          elevation: 0,
          backgroundColor: Color(0XFFD2FDFF),
          leading: IconButton(
            icon: Icon(
              Icons.arrow_back,
              color: Colors.black,
              size: 30,
            ),
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => WelcomePage(),
                ),
              );
            },
          ),
        ),
        body: SingleChildScrollView(
          child: Column(
            children: <Widget>[
              DelayAnimation(
                delay: 500,
                child: Container(
                  height: 250,
                  child: Image.asset('asset/epitech-logo.png'),
                ),
              ),
              DelayAnimation(
                delay: 1000,
                child: Container(
                  margin: const EdgeInsets.only(
                    left: 40,
                    top: 40,
                    bottom: 50,
                  ),
                  decoration: BoxDecoration(
                      color: Color(0XFF303C6C),
                      // ignore: prefer_const_constructors
                      borderRadius: new BorderRadius.only(
                        bottomLeft: const Radius.circular(20.0),
                        topLeft: const Radius.circular(20.0),
                      )),
                  child: Center(
                    child: Text(
                      "Obtenez la meilleure application d'identification jamais créée par des étudiants Epitech.",
                      textAlign: TextAlign.right,
                      style: GoogleFonts.poppins(
                        color: Color(0XFFF4976C),
                        fontSize: 22,
                      ),
                    ),
                  ),
                ),
              ),
              DelayAnimation(
                delay: 1500,
                child: Container(
                  margin: const EdgeInsets.only(
                    top: 120,
                  ),
                  child: ElevatedButton(
                      style: ElevatedButton.styleFrom(
                        primary: Color(0XFF303C6C),
                        shape: StadiumBorder(),
                        padding: EdgeInsets.all(14),
                      ),
                      child: Text(
                        "Suivant",
                        style: GoogleFonts.poppins(
                          color: Color(0XFFD2FDFF),
                          fontWeight: FontWeight.w600,
                          fontSize: 26,
                        ),
                      ),
                      onPressed: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => DidactielThree(),
                          ),
                        );
                      }),
                ),
              ),
            ],
          ),
        ));
  }
}
