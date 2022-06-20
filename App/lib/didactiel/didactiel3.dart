// ignore_for_file: unnecessary_new
import '../welcome_page.dart';
import 'didactiel2.dart';
import 'didactiel4.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import '../animation.dart';

class DidactielThree extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: Color(0XFF303C6C),
        appBar: AppBar(
          elevation: 0,
          backgroundColor: Color(0XFF303C6C),
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
              child: Image.asset('asset/didac-bar2.png'),
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
                    right: 40,
                    top: 40,
                    bottom: 50,
                  ),
                  decoration: BoxDecoration(
                      color: Color(0XFFD2FDFF),
                      // ignore: prefer_const_constructors
                      borderRadius: new BorderRadius.only(
                        bottomRight: const Radius.circular(51.0),
                        topRight: const Radius.circular(51.0),
                      )),
                  padding: EdgeInsets.only(top: 25, bottom: 45),
                  child: RichText(
                    textAlign: TextAlign.center,
                    text: const TextSpan(children: <TextSpan>[
                      TextSpan(
                          text: "La solution au probème de signature sur ",
                          style: TextStyle(
                            color: Color(0XFF303C6C),
                            fontSize: 26,
                          )),
                      TextSpan(
                          text: "feuille, edusign ",
                          style: TextStyle(
                            color: Color(0xFFF4976C),
                            fontSize: 26,
                            fontWeight: FontWeight.bold,
                          )),
                      TextSpan(
                          text: 'et de ',
                          style: TextStyle(
                            color: Color(0XFF303C6C),
                            fontSize: 26,
                          )),
                      TextSpan(
                          text: 'carte étudiant ',
                          style: TextStyle(
                            color: Color(0xFFF4976C),
                            fontWeight: FontWeight.bold,
                            fontSize: 26,
                          )),
                      TextSpan(
                          text: 'perdue.',
                          style: TextStyle(
                            color: Color(0XFF303C6C),
                            fontSize: 26,
                          )),
                    ]),
                  ),
                ),
              ),
              DelayAnimation(
                delay: 1000,
                child: SizedBox(
                  height: 250,
                  child: Image.asset('asset/didactiel3.jpg'),
                ),
              ),
              DelayAnimation(
                delay: 1500,
                child: Container(
                  margin: const EdgeInsets.only(
                    top: 100,
                  ),
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
                          builder: (context) => DidactielFour(),
                        ),
                      );
                    },
                  ),
                ),
              ),
            ],
          ),
        ));
  }
}
