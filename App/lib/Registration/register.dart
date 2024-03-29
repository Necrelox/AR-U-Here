import 'dart:convert';

import 'package:flutter_application_1/api/api.dart';

import 'login.dart';
import 'package:flutter/material.dart';
import '../dashboard/Home.dart';
import '../api/api.dart';
import '../myapp.dart';
import 'mail.dart';

class Register extends StatefulWidget {
  const Register({Key? key}) : super(key: key);

  @override
  Register_state createState() => Register_state();
}

class Register_state extends State<Register> {
  String mail = '';
  String pwd = '';
  String username = '';
  final _mailControler = TextEditingController();
  final _passwControler = TextEditingController();
  final _usernameControler = TextEditingController();

  var response;
  bool error = false;

  Widget _email() {
    return Container(
      padding: const EdgeInsets.only(top: 40.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          const SizedBox(height: 10.0),
          Container(
            alignment: Alignment.centerLeft,
            decoration: BoxDecoration(
              color: MyApp.primaryColor,
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
              style: TextStyle(
                color: MyApp.quaternaryColor,
                fontSize: 20.0,
                fontFamily: 'OpenSans',
              ),
              decoration: InputDecoration(
                border: InputBorder.none,
                contentPadding: const EdgeInsets.only(top: 12, left: 30.0),
                prefixIcon: Icon(
                  Icons.email,
                  color: MyApp.quaternaryColor,
                ),
                hintText: 'Email',
                hintStyle: TextStyle(
                  fontSize: 20.0,
                  fontWeight: FontWeight.bold,
                  color: MyApp.quaternaryColor,
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
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          const SizedBox(height: 10.0),
          Container(
            alignment: Alignment.centerLeft,
            decoration: BoxDecoration(
              color: MyApp.primaryColor,
              borderRadius: BorderRadius.circular(51.0),
              boxShadow: [
                BoxShadow(
                  color: MyApp.quaternaryColor,
                  blurRadius: 6.0,
                  offset: const Offset(0, 2),
                ),
              ],
            ),
            height: 60.0,
            child: TextField(
              controller: _passwControler,
              obscureText: true,
              style: TextStyle(
                color: MyApp.quaternaryColor,
                fontFamily: 'OpenSans',
              ),
              decoration: InputDecoration(
                border: InputBorder.none,
                contentPadding: const EdgeInsets.only(top: 14.0),
                prefixIcon: Icon(
                  Icons.lock,
                  color: MyApp.quaternaryColor,
                ),
                hintText: 'Mot de passe',
                hintStyle: TextStyle(
                  fontSize: 20.0,
                  fontWeight: FontWeight.bold,
                  color: MyApp.quaternaryColor,
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
              color: MyApp.primaryColor,
              borderRadius: BorderRadius.circular(51.0),
              boxShadow: [
                BoxShadow(
                  color: MyApp.quaternaryColor,
                  blurRadius: 6.0,
                  offset: const Offset(0, 2),
                ),
              ],
            ),
            height: 60.0,
            child: TextField(
              controller: _usernameControler,
              style: TextStyle(
                color: MyApp.quaternaryColor,
                fontFamily: 'OpenSans',
              ),
              decoration: InputDecoration(
                border: InputBorder.none,
                contentPadding: const EdgeInsets.only(top: 14.0),
                prefixIcon: Icon(
                  color: MyApp.quaternaryColor,
                  const IconData(0xe042, fontFamily: 'MaterialIcons'),
                ),
                hintText: 'Identifiant',
                hintStyle: TextStyle(
                  fontSize: 20.0,
                  fontWeight: FontWeight.bold,
                  color: MyApp.quaternaryColor,
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
      padding: const EdgeInsets.only(top: 120.0),
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
            Map<String, dynamic> rep = json.decode(response.body);
            verify_token('/account/verify/', rep['token']);
            Navigator.pushReplacement<void, void>(
              context,
              MaterialPageRoute<void>(
                builder: (BuildContext context) => VerifMail(mail: mail),
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
        color: MyApp.primaryColor,
        child: Text(
          "S'INSCRIRE",
          style: TextStyle(
            color: MyApp.quaternaryColor,
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
        child: Text(
          "Déjà un compte ? Connexion",
          style: TextStyle(
            color: MyApp.primaryColor,
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
      return SizedBox(
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
      backgroundColor: MyApp.quinaryColor,
      body: Stack(
        children: <Widget>[
          SizedBox(
            height: double.infinity,
            child: SingleChildScrollView(
              padding: const EdgeInsets.only(left: 30.0, right: 30.0, top: 70.0),
              child: Column(
                children: <Widget>[
                  Align(
                    alignment: Alignment.topLeft,
                    child: Text("Bienvenue sur ",
                        style: TextStyle(
                          color: MyApp.primaryColor,
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
                      const SizedBox(height: 40),
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
