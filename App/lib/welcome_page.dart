import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'animation.dart';
import 'didactiel1.dart';

// flutter pub get pour charger le font
class WelcomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFFF4976C),
      body: SingleChildScrollView(
          child: Container(
        margin: const EdgeInsets.symmetric(
          vertical: 60,
          horizontal: 30,
        ),
        child: Column(children: [
          DelayAnimation(
              delay: 1000,
              child: Container(
                height: 200,
                child: Image.asset('asset/logo.png'),
              )),
          DelayAnimation(
              delay: 2000,
              child: Container(
                  margin: const EdgeInsets.only(
                    top: 60,
                    bottom: 90,
                  ),
                  width: 320,
                  height: 180,
                  decoration: ShapeDecoration(
                      color: Color(0XFFFBE8A6),
                      shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(32.0))),
                  padding: EdgeInsets.all(15),
                  child: Text(
                    "Rejoignez plus de 500 établissements qui utilisent AR U-HERE au quotidien.",
                    textAlign: TextAlign.center,
                    style: GoogleFonts.poppins(
                      color: Color(0XFF303C6C),
                      fontSize: 26,
                    ),
                  ))),
          DelayAnimation(
              delay: 2500,
              child: Container(
                width: double.infinity,
                child: ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      primary: Color(0XFFD2FDFF),
                      shape: StadiumBorder(),
                      padding: EdgeInsets.all(14),
                    ),
                    child: Text(
                      "Démarrer",
                      style: GoogleFonts.poppins(
                        color: Color(0XFF303C6C),
                        fontSize: 26,
                      ),
                    ),
                    onPressed: () {}),
              )),
          DelayAnimation(
              delay: 2500,
              child: Container(
                margin: const EdgeInsets.only(top: 20),
                width: double.infinity,
                child: ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      primary: Color(0XFF303C6C),
                      shape: StadiumBorder(),
                      padding: EdgeInsets.all(14),
                    ),
                    child: Text(
                      "Didactiel",
                      style: GoogleFonts.poppins(
                        color: Color(0XFFD2FDFF),
                        fontSize: 26,
                      ),
                    ),
                    onPressed: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => DidactielOne(),
                        ),
                      );
                    }),
              )),
        ]),
      )),
    );
  }
}
