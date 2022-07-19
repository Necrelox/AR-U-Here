import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart';
import '../myapp.dart';
import 'login.dart';

class VerifMail extends StatefulWidget {
  final String mail;
  const VerifMail({Key? key, required this.mail}) : super(key: key);
  @override
  _VerifMailTool createState() => _VerifMailTool();
}

class _VerifMailTool extends State<VerifMail> {
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: MyApp.quinaryColor,
        body: Stack(children: <Widget>[
          Align(
            alignment: Alignment.center - Alignment(0, 0.2),
            child: Text("Merci de vérifier votre mail",
                style: TextStyle(
                  color: MyApp.primaryColor,
                  fontFamily: 'OpenSans',
                  fontSize: 30.0,
                  fontWeight: FontWeight.bold,
                )),
          ),
          Align(
              alignment: Alignment.center,
              child: RaisedButton(
                elevation: 5.0,
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => const Login(),
                    ),
                  );
                },
                padding: const EdgeInsets.all(15.0),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(51.0),
                ),
                color: MyApp.tertiaryColor,
                child: Text(
                  'Connectez-vous',
                  style: TextStyle(
                    color: MyApp.primaryColor,
                    letterSpacing: 1.5,
                    fontSize: 18.0,
                    fontWeight: FontWeight.bold,
                    fontFamily: 'OpenSans',
                  ),
                ),
              ))
        ]));
  }
}
