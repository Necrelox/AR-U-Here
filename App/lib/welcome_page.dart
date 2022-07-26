import 'package:flutter/material.dart';
import 'package:flutter_application_1/dashboard/Home.dart';
import 'package:google_fonts/google_fonts.dart';
import 'animation.dart';
import 'Registration/login.dart';
import './didactiel/didactiel1.dart';
import './dashboard/profile.dart';
import 'components/camera.dart';

class WelcomePage extends StatelessWidget {
  const WelcomePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0XFFF4976C),
      body: SingleChildScrollView(
          child: Column(children: [
        DelayAnimation(
            delay: 500,
            child: Container(
              margin: const EdgeInsets.only(
                top: 60,
              ),
              height: 200,
              child: Image.asset('./asset/logo.png'),
            )),
        DelayAnimation(
            delay: 1000,
            child: Container(
              margin: const EdgeInsets.only(
                top: 40,
                bottom: 70,
              ),
              width: 320,
              height: 180,
              decoration: ShapeDecoration(
                  color: MyApp.tertiaryColor,
                  shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(51.0))),
              padding: const EdgeInsets.all(15),
              child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: <Widget>[
                    RichText(
                      textAlign: TextAlign.center,
                      text: TextSpan(children: <TextSpan>[
                        TextSpan(
                            text: 'Rejoignez ',
                            style: TextStyle(
                              color: MyApp.primaryColor,
                              fontSize: 26,
                            )),
                        TextSpan(
                            text: 'plus de 500 ',
                            style: TextStyle(
                              color: MyApp.secondaryColor,
                              fontWeight: FontWeight.bold,
                              fontSize: 26,
                            )),
                        TextSpan(
                            text: 'établissements qui utilisent ',
                            style: TextStyle(
                              color: MyApp.primaryColor,
                              fontSize: 26,
                            )),
                        TextSpan(
                            text: 'AR U-HERE ',
                            style: TextStyle(
                              fontWeight: FontWeight.bold,
                              color: MyApp.secondaryColor,
                              fontSize: 26,
                            )),
                        TextSpan(
                            text: 'au quotidien.',
                            style: TextStyle(
                              color: MyApp.primaryColor,
                              fontSize: 26,
                            )),
                      ]),
                    ),
                  ]),
            )),
        DelayAnimation(
            delay: 1500,
            child: Container(
              margin: const EdgeInsets.only(top: 20, left: 80, right: 80),
              width: double.infinity,
              child: ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    primary: MyApp.quinaryColor,
                    shape: const StadiumBorder(),
                    padding: const EdgeInsets.all(14),
                  ),
                  child: Text(
                    "Démarrer",
                    style: GoogleFonts.poppins(
                      color: MyApp.primaryColor,
                      fontSize: 26,
                    ),
                  ),
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => const Login(),
                      ),
                    );
                  }),
            )),
        DelayAnimation(
            delay: 1800,
            child: Container(
              margin: const EdgeInsets.only(top: 20, left: 80, right: 80),
              width: double.infinity,
              child: ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    primary: MyApp.primaryColor,
                    shape: const StadiumBorder(),
                    padding: const EdgeInsets.all(14),
                  ),
                  child: Text(
                    "Didactiel",
                    style: GoogleFonts.poppins(
                      color: MyApp.quinaryColor,
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
      ])),
    );
  }
}
