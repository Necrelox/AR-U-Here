// ignore_for_file: unnecessary_new
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

Widget _loginBtn() {
  return Container(
    padding: const EdgeInsets.symmetric(vertical: 340.0),
    width: double.infinity,
    child: RaisedButton(
      elevation: 5.0,
      onPressed: () => print('Login Button Pressed'),
      padding: const EdgeInsets.fromLTRB(0, 0, 0, 10),
      color: const Color(0XFF303C6C),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        children: [
          Expanded(
            child: Column(
              children: <Widget>[
                Image.asset(
                  'asset/home.png',
                  width: 60,
                  height: 60
                ),
                Text(
                  'Accueil',
                  style: GoogleFonts.inter(
                    color: const Color(0XFFFBE8A6),
                    fontSize: 10,
                    fontWeight: FontWeight.w400,
                  ),
                )
              ],
            ),
          ),
          Expanded(
            child: Column(
              children: <Widget>[
                Image.asset(
                  'asset/stats.png',
                  width: 60,
                  height: 60
                ),
                Text(
                  'Statistiques',
                  style: GoogleFonts.inter(
                    color: const Color(0XFFFBE8A6),
                    fontSize: 10,
                    fontWeight: FontWeight.w400,
                  ),
                )
              ],
            ),
          ),
          Expanded(
            child: Column(
              children: <Widget>[
                Image.asset(
                  'asset/calendar.png',
                  width: 60,
                  height: 60
                ),
                Text(
                  'Calendrier',
                  style: GoogleFonts.inter(
                    color: const Color(0XFFFBE8A6),
                    fontSize: 10,
                    fontWeight: FontWeight.w400,
                  ),
                )
              ],
            ),
          ),
          Expanded(
            child: Column(
              children: <Widget>[
                Image.asset(
                  'asset/profile.png',
                  width: 60,
                  height: 60
                ),
                Text(
                  'Profile',
                  style: GoogleFonts.inter(
                    color: const Color(0XFFFBE8A6),
                    fontSize: 10,
                    fontWeight: FontWeight.w400,
                  ),
                )
              ],
            ),
          ),
        ]
      )
    ),
  );
}

class NavBar extends StatelessWidget {
  const NavBar({Key? key}) : super(key: key);


  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: Column(
          children: <Widget>[_loginBtn()],
        ));
  }
}

