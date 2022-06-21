// ignore_for_file: unnecessary_new
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class Login extends StatelessWidget {
  Widget _email() {
    return Column(
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
              hintText: 'Enter your Email',
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
            child: const TextField(
              obscureText: true,
              style: TextStyle(
                color: Color(0XFF303C6C),
                fontFamily: 'OpenSans',
              ),
              decoration: InputDecoration(
                border: InputBorder.none,
                contentPadding: EdgeInsets.only(top: 14.0),
                prefixIcon: Icon(
                  Icons.lock,
                  color: Color(0XFF303C6C),
                ),
                hintText: 'Enter your Password',
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
        onPressed: () => print('Forgot Password Button Pressed'),
        padding: EdgeInsets.only(right: 0.0),
        child: const Text(
          'Forgot Password ?',
          style: TextStyle(
            color: Color(0XFFFBE8A6),
            fontWeight: FontWeight.bold,
            fontFamily: 'OpenSans',
          ),
        ),
      ),
    );
  }

  Widget _loginBtn() {
    return Container(
      padding: EdgeInsets.symmetric(vertical: 200.0),
      width: double.infinity,
      child: RaisedButton(
        elevation: 5.0,
        onPressed: () => print('Login Button Pressed'),
        padding: EdgeInsets.all(15.0),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(51.0),
        ),
        color: Color(0XFFFBE8A6),
        child: const Text(
          'SIGN IN',
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

  Widget _register() {
    return Container(
      alignment: Alignment.center,
      // ignore: deprecated_member_use
      child: FlatButton(
        onPressed: () => print("Register"),
        padding: const EdgeInsets.only(top: 0.0),
        child: const Text(
          "Don't have account ? Register",
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
                    child: Text("Let's sign you in !",
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
                      child: Text("Welcome back.\nWe've missed you!",
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
                      SizedBox(height: 30),
                      _email(),
                      _password(),
                      _forgotPwd(),
                      _loginBtn(),
                      _register(),
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
