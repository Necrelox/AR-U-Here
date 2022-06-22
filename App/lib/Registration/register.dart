// ignore_for_file: unnecessary_new
import 'dart:developer';
import 'package:flutter_application_1/api.dart';

import 'login.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class Register extends StatefulWidget {
  @override
  Register_state createState() => Register_state();
}

class Register_state extends State<Register> {
  final _mailControler = TextEditingController();
  final _passwControler = TextEditingController();
  final _schoolControler = TextEditingController();

  String mail = '';
  String pwd = '';
  String school = '';

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
                hintText: 'Enter your Email',
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
                hintText: 'Enter your Password',
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

  Widget _etablissement() {
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
              controller: _schoolControler,
              style: const TextStyle(
                color: Color(0xFFB4DFE5),
                fontFamily: 'OpenSans',
              ),
              decoration: const InputDecoration(
                border: InputBorder.none,
                contentPadding: EdgeInsets.only(top: 14.0),
                prefixIcon: Icon(
                    color: Color(0xFFB4DFE5),
                    IconData(0xe040, fontFamily: 'MaterialIcons')),
                hintText: 'Etablissement',
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
      padding: EdgeInsets.only(top: 160.0),
      width: double.infinity,
      child: RaisedButton(
        elevation: 5.0,
        onPressed: () async {
          setState(() {
            mail = _mailControler.text;
            pwd = _passwControler.text;
            school = _schoolControler.text;
          });
          print(mail);
          print(pwd);
          print(school);
          // post_register("https://jsonplaceholder.typicode.com/posts", , pwd, school)
        },
        padding: EdgeInsets.all(15.0),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(51.0),
        ),
        color: Color(0XFF303C6C),
        child: const Text(
          'SIGN IN',
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
          "Already registered ? Sign-in",
          style: TextStyle(
            color: Color(0XFF303C6C),
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
                    child: Text("Welcome to ",
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
                      _password(),
                      _etablissement(),
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
