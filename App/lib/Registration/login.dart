// ignore_for_file: unnecessary_new
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:http/http.dart' as http;
import 'register.dart';
import '../dashboard/Home.dart';
import '../api/api.dart';

class Login extends StatefulWidget {
  @override
  Login_state createState() => Login_state();
}

class Login_state extends State<Login> {
  final _mailControler = TextEditingController();
  final _passwControler = TextEditingController();
  String email = '';
  String pwd = '';
  bool error = false;
  var response;

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
            child: TextField(
              controller: _mailControler,
              keyboardType: TextInputType.emailAddress,
              style: const TextStyle(
                color: Color(0XFF303C6C),
                fontSize: 20.0,
                fontFamily: 'OpenSans',
              ),
              decoration: const InputDecoration(
                border: InputBorder.none,
                contentPadding: EdgeInsets.only(top: 12, left: 30.0),
                prefixIcon: Icon(
                  IconData(0xe042, fontFamily: 'MaterialIcons'),
                  color: Color(0XFF303C6C),
                ),
                hintText: 'Identifiant',
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

  Widget _password() {
    return Padding(
      padding: const EdgeInsets.only(top: 10.0),
      // padding: EdgeInsets.symmetric(vertical: 50.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          const SizedBox(height: 10.0),
          Container(
            alignment: Alignment.centerLeft,
            decoration: BoxDecoration(
              color: Color(0xFFB4DFE5),
              borderRadius: BorderRadius.circular(51.0),
              boxShadow: const [
                BoxShadow(
                  color: Color(0XFF303C6C),
                  blurRadius: 6.0,
                  offset: Offset(0, 2),
                ),
              ],
            ),
            height: 60.0,
            child: TextField(
              controller: _passwControler,
              obscureText: true,
              style: const TextStyle(
                color: Color(0XFF303C6C),
                fontFamily: 'OpenSans',
              ),
              decoration: const InputDecoration(
                border: InputBorder.none,
                contentPadding: EdgeInsets.only(top: 14.0),
                prefixIcon: Icon(
                  Icons.lock,
                  color: Color(0XFF303C6C),
                ),
                hintText: 'Mot de passe',
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

  Widget _forgotPwd() {
    return Container(
      alignment: Alignment.centerRight,
      child: FlatButton(
        onPressed: () => print('Mot de passe oublié'),
        padding: EdgeInsets.only(right: 0.0),
        child: const Text(
          'Mot de passe oublié ?',
          style: TextStyle(
            color: Color(0XFFFBE8A6),
            fontWeight: FontWeight.bold,
            fontFamily: 'OpenSans',
          ),
        ),
      ),
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

  Widget _loginBtn() {
    return Container(
      padding: EdgeInsets.only(top: 120.0),
      width: double.infinity,
      child: RaisedButton(
        elevation: 5.0,
        onPressed: () async {
          setState(() {
            email = _mailControler.text;
            pwd = _passwControler.text;
          });
          response = await post_login("/account/login/", email, pwd);
          if (response.statusCode == 200) {
            // ignore: use_build_context_synchronously
            Navigator.pushReplacement<void, void>(
              context,
              MaterialPageRoute<void>(
                builder: (BuildContext context) => const Home(),
              ),
            );
            MaterialPageRoute(builder: (context) => const Home());
          } else {
            error = true;
          }
        },
        padding: EdgeInsets.all(15.0),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(51.0),
        ),
        color: Color(0XFFFBE8A6),
        child: const Text(
          'CONNEXION',
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

  Widget _register(BuildContext context) {
    return Container(
      alignment: Alignment.center,
      child: FlatButton(
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => Register(),
            ),
          );
        },
        // padding: const EdgeInsets.only(top: 0.0),
        child: const Text(
          "Pas de compte ? Inscrivez-vous",
          style: TextStyle(
            color: Color(0XFFFBE8A6),
            fontWeight: FontWeight.bold,
            fontFamily: 'OpenSans',
          ),
        ),
      ),
    );
  }

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
                    child: Text("Connectez-vous !",
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
                      child: Text(
                          "Bon retour parmis nous.\nVous nous avez manqué !",
                          style: TextStyle(
                            color: Color(0XFFD2FDFF),
                            fontFamily: 'OpenSans',
                            fontSize: 26.0,
                          )),
                    ),
                  ),
                  Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: <Widget>[
                      SizedBox(height: 40),
                      _email(),
                      _password(),
                      _forgotPwd(),
                      _dispError(),
                      _loginBtn(),
                      _register(context),
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
