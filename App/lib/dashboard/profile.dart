import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_application_1/myapp.dart';
import 'package:google_fonts/google_fonts.dart';
import '../animation.dart';
import '../components/navbar.dart';
import '../animation.dart';
import '../api/api.dart';

class Profile extends StatefulWidget {
  const Profile({Key? key}) : super(key: key);

  @override
  // ignore: library_private_types_in_public_api
  _ProfileState createState() => _ProfileState();
}

bool error = false;
var response;

Widget label(String textLabel) {
  return Container(
    margin: const EdgeInsets.only(top: 10),
    width: double.infinity,
    child: Text(textLabel,
        textAlign: TextAlign.left,
        style: const TextStyle(
          fontSize: 17,
          color: Color(0XFF303C6C),
          fontWeight: FontWeight.w700,
        )),
  );
}

Widget _dispError() {
  if (error == true) {
    Map<String, dynamic> temp = json.decode(response.body);
    return Container(
      height: 50,
      child: Text(temp['error']['message'],
          style: const TextStyle(
            color: Color(0XFFF49767),
            fontFamily: 'OpenSans',
            fontSize: 20.0,
            fontWeight: FontWeight.bold,
          )),
    );
  } else {
    return Container(height: 30);
  }
}

Widget input(String textInput) {
  return Container(
    width: double.infinity,
    decoration: const BoxDecoration(
        border: Border(
      bottom: BorderSide(
        color: Color(0XFFFBE8A6),
        width: 2,
      ),
    )),
    child: const TextField(
      keyboardType: TextInputType.multiline,
      textInputAction: TextInputAction.newline,
      decoration: InputDecoration(
          border: InputBorder.none,
          focusedBorder: InputBorder.none,
          enabledBorder: InputBorder.none,
          errorBorder: InputBorder.none,
          disabledBorder: InputBorder.none,
          hintText: "À compléter..."),
    ),
  );
}

class _ProfileState extends State<Profile> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0XFFD2FDFF),
      bottomNavigationBar: const NavbarDemo(),
      floatingActionButton: FloatingActionButton(
      onPressed: () {
        // Logout
      },
      backgroundColor: MyApp.secondaryColor,
      child: Icon(Icons.logout_rounded, color: MyApp.primaryColor),
      ),
      body: SingleChildScrollView(
        child: Column(
          children: <Widget>[
            Container(
              width: double.infinity,
              height: MediaQuery.of(context).size.height * 0.30,
              color: const Color(0XFF303C6C),
              child: ClipRRect(
                borderRadius: BorderRadius.circular(20), // Image border
                child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: <Widget>[
                      DelayAnimation(
                        delay: 500,
                        child: Container(
                            padding: const EdgeInsets.only(top: 20),
                            width: double.infinity,
                            alignment: Alignment.center,
                            child: ClipRRect(
                              borderRadius:
                                  BorderRadius.circular(50), // Image border
                              child: SizedBox.fromSize(
                                size: const Size.fromRadius(70),
                                child: Image.asset(
                                  'asset/marin.jpg',
                                  fit: BoxFit.cover,
                                ),
                              ),
                            )),
                      ),
                      DelayAnimation(
                          delay: 500,
                          child: Container(
                            width: double.infinity,
                            padding: const EdgeInsets.only(top: 20),
                            alignment: Alignment.center,
                            child: Text(
                              '@relog#123',
                              style: GoogleFonts.inter(
                                fontSize: 25,
                                fontWeight: FontWeight.w900,
                                fontStyle: FontStyle.italic,
                                color: const Color(0XFFFBE8A6),
                              ),
                            ),
                          )),
                    ]),
              ),
            ),
            Container(
              width: double.infinity,
              height: MediaQuery.of(context).size.height * 0.07,
              padding: const EdgeInsets.fromLTRB(100, 0, 100, 0),
              decoration: BoxDecoration(
                  border: Border.all(
                    color: Colors.transparent,
                    width: 5,
                  ),
                  gradient: const LinearGradient(
                      begin: Alignment.topCenter,
                      end: Alignment.bottomCenter,
                      stops: [0.5, 0.5],
                      colors: [Color(0XFF303C6C), Color(0XFFD2FDFF)])),
              child: ElevatedButton(
                style: ButtonStyle(
                    foregroundColor: MaterialStateProperty.all<Color>(
                        const Color(0XFF303C6C)),
                    backgroundColor: MaterialStateProperty.all<Color>(
                        const Color(0XFFFBE8A6)),
                    shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                        RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(51.0),
                    ))),
                onPressed: () => {},
                child: RichText(
                  textAlign: TextAlign.center,
                  text: TextSpan(children: <TextSpan>[
                    TextSpan(
                        text: "Etudiant Epitech" "\n",
                        style: GoogleFonts.inter(
                          color: const Color(0XFF303C6C),
                          fontSize: 15,
                          fontWeight: FontWeight.w700,
                        )),
                    TextSpan(
                        text: "Pre Msc",
                        style: GoogleFonts.inter(
                          color: const Color(0XFF303C6C),
                          fontSize: 15,
                          fontWeight: FontWeight.w700,
                        )),
                  ]),
                ),
              ),
            ),
            DelayAnimation(
              delay: 500,
              child: Container(
                width: double.infinity,
                alignment: Alignment.bottomLeft,
                padding: const EdgeInsets.fromLTRB(40, 20, 40, 0),
                child: RichText(
                  textAlign: TextAlign.center,
                  text: TextSpan(children: <TextSpan>[
                    TextSpan(
                        text: "Votre compte",
                        style: GoogleFonts.inter(
                          shadows: <Shadow>[
                            const Shadow(
                              offset: Offset(3.0, 3.0),
                              blurRadius: 15.0,
                              color: Color.fromARGB(255, 157, 157, 157),
                            )
                          ],
                          color: const Color(0XFF303C6C),
                          fontSize: 22,
                          fontWeight: FontWeight.w800,
                        )),
                  ]),
                ),
              ),
            ),
            DelayAnimation(
              delay: 500,
              child: Container(
                width: double.infinity,
                height: MediaQuery.of(context).size.height * 0.40,
                margin: const EdgeInsets.fromLTRB(80, 0, 150, 0),
                alignment: Alignment.center,
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: <Widget> [
                    label('Nom'),
                    input('Marin'),
                    label('Téléphone'),
                    input('+33 6 71 94 23 15'),
                    label('Email'),
                    input('marin.pavel@epitech.eu'),
                    label('Adresse'),
                    input('Nice'),
                  ],
                ),
              ),
            ),
            DelayAnimation(
              delay: 500,
              child: Container(
                width: double.infinity,
                alignment: Alignment.center,
                child: ElevatedButton(
                    style: ButtonStyle(
                        foregroundColor: MaterialStateProperty.all<Color>(
                            const Color(0XFF303C6C)),
                        backgroundColor: MaterialStateProperty.all<Color>(
                            const Color(0XFFF4976C)),
                        shape:
                            MaterialStateProperty.all<RoundedRectangleBorder>(
                                RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(18.0),
                        ))),
                    onPressed: () async {
                      response = await get_user();
                      if (response.statusCode == 200) {
                        // ignore: use_build_context_synchronously
                        Map<String, dynamic> temp = json.decode(response.body);
                        print(temp['user']['username']);
                      } else {
                        error = true;
                      }
                    },
                    child: const Text("Sauvegarder",
                        style: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.w700,
                        ))),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
