// ignore_for_file: unnecessary_new
import '../welcome_page.dart';
import 'didactiel4.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../animation.dart';
import '../myapp.dart';

class DidactielThree extends StatelessWidget {
  const DidactielThree({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: MyApp.primaryColor,
        appBar: AppBar(
          elevation: 0,
          backgroundColor: MyApp.primaryColor,
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
                      color: MyApp.quinaryColor,
                      // ignore: prefer_const_constructors
                      borderRadius: new BorderRadius.only(
                        bottomRight: const Radius.circular(51.0),
                        topRight: const Radius.circular(51.0),
                      )),
                  padding: const EdgeInsets.only(top: 25, bottom: 45),
                  child: RichText(
                    textAlign: TextAlign.center,
                    text: TextSpan(children: <TextSpan>[
                      TextSpan(
                          text: "La solution au probl??me de signature sur ",
                          style: TextStyle(
                            color: MyApp.primaryColor,
                            fontSize: 26,
                          )),
                      TextSpan(
                          text: "feuille, edusign ",
                          style: TextStyle(
                            color: MyApp.secondaryColor,
                            fontSize: 26,
                            fontWeight: FontWeight.bold,
                          )),
                      TextSpan(
                          text: 'et de ',
                          style: TextStyle(
                            color: MyApp.primaryColor,
                            fontSize: 26,
                          )),
                      TextSpan(
                          text: 'carte ??tudiante ',
                          style: TextStyle(
                            color: MyApp.secondaryColor,
                            fontWeight: FontWeight.bold,
                            fontSize: 26,
                          )),
                      TextSpan(
                          text: 'perdue.',
                          style: TextStyle(
                            color: MyApp.primaryColor,
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
                      primary: MyApp.quinaryColor,
                      shape: const StadiumBorder(),
                      padding: const EdgeInsets.all(14),
                    ),
                    child: Text(
                      "Suivant",
                      style: GoogleFonts.poppins(
                        color: MyApp.primaryColor,
                        fontWeight: FontWeight.w600,
                        fontSize: 26,
                      ),
                    ),
                    onPressed: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => const DidactielFour(),
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
