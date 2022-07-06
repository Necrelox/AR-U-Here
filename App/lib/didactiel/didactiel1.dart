// ignore_for_file: unnecessary_new
import 'didactiel2.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../animation.dart';
import '../myapp.dart';

class DidactielOne extends StatelessWidget {
  const DidactielOne({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: MyApp.primaryColor,
      appBar: AppBar(
        elevation: 0,
        backgroundColor: MyApp.primaryColor,
        actions: [
          Container(
            margin:
                const EdgeInsets.only(left: 10, top: 10, right: 20, bottom: 0),
            width: 40,
            child: Image.asset('asset/didac-bar2.png'),
          ),
          Container(
            margin:
                const EdgeInsets.only(left: 20, top: 10, right: 20, bottom: 0),
            width: 40,
            child: Image.asset('asset/didac-bar1.png'),
          ),
          Container(
            margin:
                const EdgeInsets.only(left: 20, top: 10, right: 20, bottom: 0),
            width: 40,
            child: Image.asset('asset/didac-bar1.png'),
          ),
          Container(
            margin:
                const EdgeInsets.only(left: 20, top: 10, right: 20, bottom: 0),
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
                padding: const EdgeInsets.only(top: 25, bottom: 25),
                margin: const EdgeInsets.only(
                  right: 40,
                  top: 40,
                  bottom: 10,
                ),
                decoration: BoxDecoration(
                    color: MyApp.quinaryColor,
                    // ignore: prefer_const_constructors
                    borderRadius: new BorderRadius.only(
                      bottomRight: const Radius.circular(51.0),
                      topRight: const Radius.circular(51.0),
                    )),
                child: RichText(
                  textAlign: TextAlign.center,
                  text: TextSpan(children: <TextSpan>[
                    TextSpan(
                        text:
                            "Nous souhaitons que l'identification des élèves au sein de votre établissement soit  ",
                        style: TextStyle(
                          color: MyApp.primaryColor,
                          fontSize: 26,
                        )),
                    TextSpan(
                        text: 'plus simple, sûre et accessible.',
                        style: TextStyle(
                          color: MyApp.secondaryColor,
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
                        builder: (context) => const DidactielTwoo(),
                      ),
                    );
                  },
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
