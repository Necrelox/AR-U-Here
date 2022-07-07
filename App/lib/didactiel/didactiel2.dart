// ignore_for_file: unnecessary_new

import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../animation.dart';
import '../welcome_page.dart';
import 'didactiel3.dart';
import '../myapp.dart';

class DidactielTwoo extends StatelessWidget {
  const DidactielTwoo({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: MyApp.quaternaryColor,
        appBar: AppBar(
          elevation: 0,
          backgroundColor: MyApp.quaternaryColor,
          leading: IconButton(
            icon: const Icon(
              Icons.arrow_back,
              color: Colors.black,
              size: 30,
            ),
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => const WelcomePage(),
                ),
              );
            },
          ),
          actions: [
            Container(
              margin: const EdgeInsets.only(
                  left: 10, top: 10, right: 20, bottom: 0),
              width: 40,
              child: Image.asset('asset/didac-bar2.png'),
            ),
            Container(
              margin: const EdgeInsets.only(
                  left: 20, top: 10, right: 20, bottom: 0),
              width: 40,
              child: Image.asset('asset/didac-bar2.png'),
            ),
            Container(
              margin: const EdgeInsets.only(
                  left: 20, top: 10, right: 20, bottom: 0),
              width: 40,
              child: Image.asset('asset/didac-bar1.png'),
            ),
            Container(
              margin: const EdgeInsets.only(
                  left: 20, top: 10, right: 20, bottom: 0),
              width: 40,
              child: Image.asset('asset/didac-bar1.png'),
            ),
          ],
        ),
        body: SingleChildScrollView(
          child: Column(
            children: <Widget>[
              DelayAnimation(
                delay: 500,
                child: Container(
                  margin: const EdgeInsets.only(
                    top: 80,
                    bottom: 20,
                  ),
                  padding: const EdgeInsets.only(left: 25, right: 25),
                  child: Image.asset('asset/epitech-logo.png'),
                ),
              ),
              DelayAnimation(
                delay: 1000,
                child: Container(
                  margin: const EdgeInsets.only(
                    left: 40,
                    top: 80,
                    bottom: 50,
                  ),
                  padding: const EdgeInsets.only(top: 25, bottom: 25),
                  decoration: BoxDecoration(
                      color: MyApp.primaryColor,
                      // ignore: prefer_const_constructors
                      borderRadius: new BorderRadius.only(
                        bottomLeft: const Radius.circular(51.0),
                        topLeft: const Radius.circular(51.0),
                      )),
                  child: RichText(
                    textAlign: TextAlign.center,
                    text: TextSpan(children: <TextSpan>[
                      TextSpan(
                          text: "Obtenez la meilleure application ",
                          style: TextStyle(
                            color: MyApp.secondaryColor,
                            fontSize: 26,
                          )),
                      TextSpan(
                          text: "d'identification ",
                          style: TextStyle(
                            color: MyApp.quinaryColor,
                            fontSize: 26,
                            fontWeight: FontWeight.bold,
                          )),
                      TextSpan(
                          text: 'jamais créée par des ',
                          style: TextStyle(
                            color: MyApp.secondaryColor,
                            fontSize: 26,
                          )),
                      TextSpan(
                          text: 'étudiants Epitech ',
                          style: TextStyle(
                            color: MyApp.quinaryColor,
                            fontWeight: FontWeight.bold,
                            fontSize: 26,
                          )),
                    ]),
                  ),
                ),
              ),
              DelayAnimation(
                delay: 1500,
                child: Container(
                  margin: const EdgeInsets.only(
                    top: 70,
                  ),
                  child: ElevatedButton(
                      style: ElevatedButton.styleFrom(
                        primary: MyApp.primaryColor,
                        shape: const StadiumBorder(),
                        padding: const EdgeInsets.all(14),
                      ),
                      child: Text(
                        "Suivant",
                        style: GoogleFonts.poppins(
                          color: MyApp.quinaryColor,
                          fontWeight: FontWeight.w600,
                          fontSize: 26,
                        ),
                      ),
                      onPressed: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => const DidactielThree(),
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
