// ignore_for_file: unnecessary_new
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:http/http.dart' as http;
import '../forgot_password.dart';
import 'register.dart';
import '../dashboard/Home.dart';
import '../admin/home_admin.dart';
import '../api/api.dart';
import '../myapp.dart';

class Login extends StatefulWidget {
  const Login({Key? key}) : super(key: key);

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
      padding: const EdgeInsets.only(top: 40.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          const SizedBox(height: 10.0),
          Container(
            alignment: Alignment.centerLeft,
            decoration: BoxDecoration(
              color: MyApp.quaternaryColor,
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
                color: MyApp.primaryColor,
                fontSize: 20.0,
                fontFamily: 'OpenSans',
              ),
              decoration: InputDecoration(
                border: InputBorder.none,
                contentPadding: const EdgeInsets.only(top: 12, left: 30.0),
                prefixIcon: Icon(
                  const IconData(0xe042, fontFamily: 'MaterialIcons'),
                  color: MyApp.primaryColor,
                ),
                hintText: 'Identifiant',
                hintStyle: TextStyle(
                  fontSize: 20.0,
                  fontWeight: FontWeight.bold,
                  color: MyApp.primaryColor,
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
              color: MyApp.quaternaryColor,
              borderRadius: BorderRadius.circular(51.0),
              boxShadow: [
                BoxShadow(
                  color: MyApp.primaryColor,
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
                color: MyApp.primaryColor,
                fontFamily: 'OpenSans',
              ),
              decoration: InputDecoration(
                border: InputBorder.none,
                contentPadding: const EdgeInsets.only(top: 14.0),
                prefixIcon: Icon(
                  Icons.lock,
                  color: MyApp.primaryColor,
                ),
                hintText: 'Mot de passe',
                hintStyle: TextStyle(
                  fontSize: 20.0,
                  fontWeight: FontWeight.bold,
                  color: MyApp.primaryColor,
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
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => forgot_password(),
            ),
          );
        },
        padding: const EdgeInsets.only(right: 0.0),
        child: Text(
          'Mot de passe oublié ?',
          style: TextStyle(
            color: MyApp.tertiaryColor,
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

  Widget _loginBtn() {
    return Container(
      padding: const EdgeInsets.only(top: 80.0),
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
            // Verify roles of user getRoles in api.dart
            var temp = await get_roles();
            if (temp == 'admin') {
              // ignore: use_build_context_synchronously
              Navigator.pushReplacement<void, void>(
                context,
                MaterialPageRoute<void>(
                  builder: (BuildContext context) => const HomeAdmin(),
                ),
              );
              MaterialPageRoute(builder: (context) => const HomeAdmin());
            } else {
              // ignore: use_build_context_synchronously
              Navigator.pushReplacement<void, void>(
                context,
                MaterialPageRoute<void>(
                  builder: (BuildContext context) => const Home(),
                ),
              );
              MaterialPageRoute(builder: (context) => const Home());
            }
            // ignore: use_build_context_synchronously
          } else {
            error = true;
          }
        },
        padding: const EdgeInsets.all(15.0),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(51.0),
        ),
        color: MyApp.tertiaryColor,
        child: Text(
          'CONNEXION',
          style: TextStyle(
            color: MyApp.primaryColor,
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
              builder: (context) => const Register(),
            ),
          );
        },
        // padding: const EdgeInsets.only(top: 0.0),
        child: Text(
          "Pas de compte ? Inscrivez-vous",
          style: TextStyle(
            color: MyApp.tertiaryColor,
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
      backgroundColor: MyApp.primaryColor,
      body: Stack(
        children: <Widget>[
          SizedBox(
            width: double.infinity,
            height: double.infinity,
            child: SingleChildScrollView(
            padding: const EdgeInsets.only(left: 30.0, right: 30.0, top: 70.0),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: <Widget>[
                  Align(
                    alignment: Alignment.topLeft,
                    child: Text("Connectez-vous !",
                        style: TextStyle(
                          color: MyApp.tertiaryColor,
                          fontFamily: 'OpenSans',
                          fontSize: 30.0,
                          fontWeight: FontWeight.bold,
                        )),
                  ),
                  Align(
                    alignment: Alignment.topLeft,
                    child: Padding(
                      padding: const EdgeInsets.only(top: 15),
                      child: Text(
                          "Bon retour parmis nous.\nVous nous avez manqué !",
                          style: TextStyle(
                            color: MyApp.quinaryColor,
                            fontFamily: 'OpenSans',
                            fontSize: 26.0,
                          )),
                    ),
                  ),
                  Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: <Widget>[
                      const SizedBox(height: 40),
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
