import 'dart:convert';
import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter_application_1/myapp.dart';
import 'package:google_fonts/google_fonts.dart';
import '../animation.dart';
import '../components/navbar.dart';
import '../animation.dart';
import '../api/api.dart';
import '../class/User.dart';

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

class _ProfileState extends State<Profile> {
  late Future<User> futureUser;
  final TextEditingController _controllerName = TextEditingController();
  final TextEditingController _controllerEmail = TextEditingController();

  @override
  void initState() {
    super.initState();
      futureUser = fetchUser();
  }

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
                              child: FutureBuilder<User>(
                                future: futureUser,
                                builder: (context, snapshot) {
                                  if (snapshot.hasData) {
                                    return Text(
                                      '@${snapshot.data!.username}',
                                      style: const TextStyle(
                                        color: Color(0XFFFBE8A6),
                                        fontFamily: 'OpenSans',
                                        fontSize: 24.0,
                                        fontWeight: FontWeight.w900,
                                        fontStyle: FontStyle.italic,
                                      ),
                                    );
                                  } else if (snapshot.hasError) {
                                    return Text("${snapshot.error}");
                                  }
                                  return const CircularProgressIndicator();
                                },
                              ))),
                    ]),
              ),
            ),
            Container(
              width: double.infinity,
              height: MediaQuery.of(context).size.height * 0.05,
              padding: const EdgeInsets.fromLTRB(100, 0, 100, 0),
              decoration: BoxDecoration(
                  border: Border.all(
                    color: Colors.transparent,
                    width: 0,
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
                width: MediaQuery.of(context).size.width * 0.8,
                alignment: Alignment.centerLeft,
                height: MediaQuery.of(context).size.height * 0.05,
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
                  width: MediaQuery.of(context).size.width * 0.8,
                  height: MediaQuery.of(context).size.height * 0.45,
                  alignment: Alignment.center,
                  child: FutureBuilder<User>(
                    future: futureUser,
                    builder: (context, snapshot) {
                      if (snapshot.hasData) {
                        return Column(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: <Widget>[
                            label('Nom'),
                            Container(
                              width: double.infinity,
                              decoration: const BoxDecoration(
                                  border: Border(
                                bottom: BorderSide(
                                  color: Color(0XFFFBE8A6),
                                  width: 2,
                                ),
                              )),
                              child: TextField(
                                controller: _controllerName,
                                keyboardType: TextInputType.multiline,
                                textInputAction: TextInputAction.newline,
                                decoration: InputDecoration(
                                    border: InputBorder.none,
                                    focusedBorder: InputBorder.none,
                                    enabledBorder: InputBorder.none,
                                    errorBorder: InputBorder.none,
                                    disabledBorder: InputBorder.none,
                                    hintText: snapshot.data!.username),
                              ),
                            ),
                            label('Téléphone'),
                            Container(
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
                                    hintText: "067836396309"),
                              ),
                            ),
                            label('Email'),
                            Container(
                              width: double.infinity,
                              decoration: const BoxDecoration(
                                  border: Border(
                                bottom: BorderSide(
                                  color: Color(0XFFFBE8A6),
                                  width: 2,
                                ),
                              )),
                              child: TextField(
                                controller: _controllerEmail,
                                keyboardType: TextInputType.multiline,
                                textInputAction: TextInputAction.newline,
                                decoration: InputDecoration(
                                    border: InputBorder.none,
                                    focusedBorder: InputBorder.none,
                                    enabledBorder: InputBorder.none,
                                    errorBorder: InputBorder.none,
                                    disabledBorder: InputBorder.none,
                                    hintText: snapshot.data!.email),
                              ),
                            ),
                            label('Adresse'),
                            Container(
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
                                    hintText: 'Nice'),
                              ),
                            ),
                            ElevatedButton(
                                style: ButtonStyle(
                                    foregroundColor:
                                        MaterialStateProperty.all<Color>(
                                            const Color(0XFF303C6C)),
                                    backgroundColor:
                                        MaterialStateProperty.all<Color>(
                                            const Color(0XFFF4976C)),
                                    shape: MaterialStateProperty.all<
                                            RoundedRectangleBorder>(
                                        RoundedRectangleBorder(
                                      borderRadius: BorderRadius.circular(18.0),
                                    ))),
                                onPressed: () async {
                                  setState(() {
                                    futureUser = updateUser(_controllerName.text, _controllerEmail.text);
                                  });
                                },
                                child: const Text("Sauvegarder",
                                    style: TextStyle(
                                      fontSize: 16,
                                      fontWeight: FontWeight.w700,
                                    ))),
                          ],
                        );
                      } else if (snapshot.hasError) {
                        return Text("${snapshot.error}");
                      }
                      return const CircularProgressIndicator();
                    },
                  )),
            ),
          ],
        ),
      ),
    );
  }
}
