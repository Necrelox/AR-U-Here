// ignore_for_file: unnecessary_new
import 'didactiel2.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import '../animation.dart';
import '../components/navbar.dart';

class DidactielOne extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: Color(0XFF303C6C),
        appBar: AppBar(
          elevation: 0,
          backgroundColor: Color(0XFF303C6C),
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
              child: Image.asset('asset/didac-bar1.png'),
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
                  padding: EdgeInsets.only(top: 25, bottom: 25),
                  margin: const EdgeInsets.only(
                    right: 40,
                    top: 40,
                    bottom: 10,
                  ),
                  decoration: BoxDecoration(
                      color: Color(0XFFD2FDFF),
                      // ignore: prefer_const_constructors
                      borderRadius: new BorderRadius.only(
                        bottomRight: const Radius.circular(51.0),
                        topRight: const Radius.circular(51.0),
                      )),
                  child: RichText(
                    textAlign: TextAlign.center,
                    text: const TextSpan(children: <TextSpan>[
                      TextSpan(
                          text:
                              "Nous souhaitons que l'identification des élèves au sein de votre établissement soit  ",
                          style: TextStyle(
                            color: Color(0XFF303C6C),
                            fontSize: 26,
                          )),
                      TextSpan(
                          text: 'plus simple, sûre et accessible.',
                          style: TextStyle(
                            color: Color(0xFFF4976C),
                            fontWeight: FontWeight.bold,
                            fontSize: 26,
                          )),
                    ]),
                  ),
                ),
              ),
              DelayAnimation(
                delay: 1000,
                child: SizedBox(
                  height: 350,
                  child: Image.asset('asset/didactiel1.png'),
                ),
              ),
              DelayAnimation(
                delay: 1500,
                child: Container(
                  child: ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      primary: Color(0XFFD2FDFF),
                      shape: StadiumBorder(),
                      padding: EdgeInsets.all(14),
                    ),
                    child: Text(
                      "Suivant",
                      style: GoogleFonts.poppins(
                        color: Color(0XFF303C6C),
                        fontWeight: FontWeight.w600,
                        fontSize: 26,
                      ),
                    ),
                    onPressed: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => DidactielTwoo(),
                        ),
                      );
                    },
                  ),
                ),
              ),
            ],
          ),
        ),
        bottomNavigationBar: NavBar());
  }
}
