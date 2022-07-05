import 'dart:convert';

import 'package:flutter_application_1/api/api.dart';

import 'login.dart';
import 'package:flutter/material.dart';
import '../dashboard/Home.dart';
import '../api/api.dart';

class Register extends StatefulWidget {
  @override
  Register_state createState() => Register_state();
}

class Register_state extends State<Register> {
  final _mailControler = TextEditingController();
  final _passwControler = TextEditingController();
  final _usernameControler = TextEditingController();

  String mail = '';
  String pwd = '';
  String username = '';
  var response;
  bool error = false;

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
              color: Color(0XFF303C6C),
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
                color: Color(0xFFB4DFE5),
                fontSize: 20.0,
                fontFamily: 'OpenSans',
              ),
              decoration: const InputDecoration(
                border: InputBorder.none,
                contentPadding: EdgeInsets.only(top: 12, left: 30.0),
                prefixIcon: Icon(
                  Icons.email,
                  color: Color(0xFFB4DFE5),
                ),
                hintText: 'Email',
                hintStyle: TextStyle(
                  fontSize: 20.0,
                  fontWeight: FontWeight.bold,
                  color: Color(0xFFB4DFE5),
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
              color: Color(0XFF303C6C),
              borderRadius: BorderRadius.circular(51.0),
              boxShadow: const [
                BoxShadow(
                  color: Color(0xFFB4DFE5),
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
                color: Color(0xFFB4DFE5),
                fontFamily: 'OpenSans',
              ),
              decoration: const InputDecoration(
                border: InputBorder.none,
                contentPadding: EdgeInsets.only(top: 14.0),
                prefixIcon: Icon(
                  Icons.lock,
                  color: Color(0xFFB4DFE5),
                ),
                hintText: 'Mot de passe',
                hintStyle: TextStyle(
                  fontSize: 20.0,
                  fontWeight: FontWeight.bold,
                  color: Color(0xFFB4DFE5),
                  fontFamily: 'OpenSans',
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _username() {
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
              color: Color(0XFF303C6C),
              borderRadius: BorderRadius.circular(51.0),
              boxShadow: const [
                BoxShadow(
                  color: Color(0xFFB4DFE5),
                  blurRadius: 6.0,
                  offset: Offset(0, 2),
                ),
              ],
            ),
            height: 60.0,
            child: TextField(
              controller: _usernameControler,
              style: const TextStyle(
                color: Color(0xFFB4DFE5),
                fontFamily: 'OpenSans',
              ),
              decoration: const InputDecoration(
                border: InputBorder.none,
                contentPadding: EdgeInsets.only(top: 14.0),
                prefixIcon: Icon(
                  color: Color(0xFFB4DFE5),
                  IconData(0xe042, fontFamily: 'MaterialIcons'),
                ),
                hintText: 'Identifiant',
                hintStyle: TextStyle(
                  fontSize: 20.0,
                  fontWeight: FontWeight.bold,
                  color: Color(0xFFB4DFE5),
                  fontFamily: 'OpenSans',
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _signupBtn() {
    return Container(
      padding: EdgeInsets.only(top: 120.0),
      width: double.infinity,
      child: RaisedButton(
        elevation: 5.0,
        onPressed: () async {
          setState(() {
            mail = _mailControler.text;
            pwd = _passwControler.text;
            username = _usernameControler.text;
          });
          response =
              await post_register("/account/signup/", mail, pwd, username);
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
        padding: const EdgeInsets.all(15.0),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(51.0),
        ),
        color: const Color(0XFF303C6C),
        child: const Text(
          "S'INSCRIRE",
          style: TextStyle(
            color: Color(0xFFB4DFE5),
            letterSpacing: 1.5,
            fontSize: 18.0,
            fontWeight: FontWeight.bold,
            fontFamily: 'OpenSans',
          ),
        ),
      ),
    );
  }

  Widget _login(BuildContext context) {
    return Container(
      alignment: Alignment.center,
      child: MaterialButton(
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => Login(),
            ),
          );
        },
        padding: const EdgeInsets.only(top: 0.0),
        child: const Text(
          "Déjà un compte ? Connexion",
          style: TextStyle(
            color: Color(0XFF303C6C),
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

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0XFFD2FDFF),
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
                    child: Text("Bienvenue sur ",
                        style: TextStyle(
                          color: Color(0XFF303C6C),
                          fontFamily: 'OpenSans',
                          fontSize: 30.0,
                          fontWeight: FontWeight.bold,
                        )),
                  ),
                  const Align(
                    alignment: Alignment.topLeft,
                    child: Padding(
                      padding: EdgeInsets.only(top: 15),
                      child: Text("AR U-HERE !",
                          style: TextStyle(
                            color: Color(0XFFF49767),
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
                      _username(),
                      _password(),
                      _dispError(),
                      _signupBtn(),
                      _login(context),
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
