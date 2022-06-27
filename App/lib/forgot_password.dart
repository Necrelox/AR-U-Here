// ignore_for_file: unnecessary_new
import 'dart:math';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'welcome_page.dart';

  Widget _email() {
    return Container(
      padding: EdgeInsets.only(top: 40.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          const SizedBox(height: 10.0),
          Container(
            alignment: Alignment.centerLeft,
            decoration: BoxDecoration(
              color: const Color(0xFFB4DFE5),
              borderRadius: BorderRadius.circular(51.0),
              boxShadow: const [
                BoxShadow(
                  color: Colors.black12,
                  blurRadius: 6.0,
                  offset: Offset(0, 2),
                ),
              ],
            ),
            height: 60.0,
            child: const TextField(
              keyboardType: TextInputType.emailAddress,
              style: TextStyle(
                color: Color(0XFF303C6C),
                fontSize: 20.0,
                fontFamily: 'OpenSans',
              ),
              decoration: InputDecoration(
                border: InputBorder.none,
                contentPadding: EdgeInsets.only(top: 12, left: 30.0),
                prefixIcon: Icon(
                  Icons.email,
                  color: Color(0XFF303C6C),
                ),
                hintText: 'Entrer votre email',
                hintStyle: TextStyle(
                  fontSize: 20.0,
                  fontWeight: FontWeight.bold,
                  color: Color(0XFF303C6C),
                  fontFamily: 'OpenSans',
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _retourBtn(BuildContext context) {
    return Container(
      padding: EdgeInsets.only(top: 10.0),
      width: double.infinity,
      child: RaisedButton(
        elevation: 5.0,
        onPressed: () {
            Navigator.push(
            context,
            MaterialPageRoute(
            builder: (context) => WelcomePage(),
            ),
          );
        },
        padding: EdgeInsets.all(15.0),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(51.0),
        ),
        color: Color(0XFFF4976C),
        child: const Text(
          'Annuler',
          style: TextStyle(
            color: Color(0XFF303C6C),
            letterSpacing: 1.5,
            fontSize: 18.0,
            fontWeight: FontWeight.bold,
            fontFamily: 'OpenSans',
          ),
        ),
      ),
    );
  }

  Widget _forgot_passwordBtn(BuildContext context) {
    return Container(
      padding: EdgeInsets.only(top: 350.0),
      width: double.infinity,
      child: RaisedButton(
        elevation: 5.0,
        onPressed: () {
            Navigator.push(
            context,
            MaterialPageRoute(
            builder: (context) => WelcomePage(),
            ),
          );
        },
        padding: EdgeInsets.all(15.0),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(51.0),
        ),
        color: Color(0XFFFBE8A6),
        child: const Text(
          'Recevoir un mail',
          style: TextStyle(
            color: Color(0XFF303C6C),
            letterSpacing: 1.5,
            fontSize: 18.0,
            fontWeight: FontWeight.bold,
            fontFamily: 'OpenSans',
          ),
        ),
      ),
    );
  }

class forgot_password extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0XFF303C6C),
      body: Stack(
        children: <Widget>[
          Container(
            height: double.infinity,
            child: SingleChildScrollView(
              physics: const AlwaysScrollableScrollPhysics(),
              padding: const EdgeInsets.symmetric(
                horizontal: 40.0,
                vertical: 100,
              ),
              child: Column(
                children: <Widget>[
                  const Align(
                    alignment: Alignment.topLeft,
                    child: Text("Mot de passe oubié ?",
                        style: TextStyle(
                          color: Color(0XFFFBE8A6),
                          fontFamily: 'OpenSans',
                          fontSize: 30.0,
                          fontWeight: FontWeight.bold,
                        )),
                  ),
                  const Align(
                    alignment: Alignment.topLeft,
                    child: Padding(
                      padding: EdgeInsets.only(top: 15),
                      child: Text("Laisse nous t’aider ! 😉 renseigne ton mail si dessous !",
                          style: TextStyle(
                            color: Color(0XFFD2FDFF),
                            fontFamily: 'OpenSans',
                            fontSize: 30.0,
                          )),
                    ),
                  ),
                  Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: <Widget>[
                      SizedBox(height: 40),
                      _email(),
                      _forgot_passwordBtn(context),
                      _retourBtn(context),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
