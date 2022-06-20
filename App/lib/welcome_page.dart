import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'animation.dart';
import 'login.dart';
import './didactiel/didactiel1.dart';

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
              delay: 500,
              child: Container(
                height: 200,
                child: Image.asset('asset/logo.png'),
              )),
          DelayAnimation(
              delay: 1000,
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
                        borderRadius: BorderRadius.circular(51.0))),
                padding: EdgeInsets.all(15),
                child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: <Widget>[
                      RichText(
                        textAlign: TextAlign.center,
                        text: const TextSpan(children: <TextSpan>[
                          TextSpan(
                              text: 'Rejoignez ',
                              style: TextStyle(
                                color: Color(0XFF303C6C),
                                fontSize: 26,
                              )),
                          TextSpan(
                              text: 'plus de 500 ',
                              style: TextStyle(
                                color: Color(0xFFF4976C),
                                fontWeight: FontWeight.bold,
                                fontSize: 26,
                              )),
                          TextSpan(
                              text: 'établissements qui utilisent ',
                              style: TextStyle(
                                color: Color(0XFF303C6C),
                                fontSize: 26,
                              )),
                          TextSpan(
                              text: 'AR U-HERE ',
                              style: TextStyle(
                                fontWeight: FontWeight.bold,
                                color: Color(0xFFF4976C),
                                fontSize: 26,
                              )),
                          TextSpan(
                              text: 'au quotidient ',
                              style: TextStyle(
                                color: Color(0XFF303C6C),
                                fontSize: 26,
                              )),
                        ]),
                      ),
                    ]),
              )),
          DelayAnimation(
              delay: 1500,
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
              delay: 1800,
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
