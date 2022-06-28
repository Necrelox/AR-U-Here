// ignore_for_file: unnecessary_new, deprecated_member_use
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class NavbarDemo extends StatefulWidget {
  const NavbarDemo({Key? key}) : super(key: key);

  @override
  Naviguation createState() => Naviguation();
}

class Naviguation extends State<NavbarDemo> {
  Widget icon(String name, String asset) {
    return Expanded(
      child: RaisedButton(
      onPressed: () => {},
      color: const Color(0XFF303C6C),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: <Widget>[
          Image.asset(asset, width: 40, height: 40),
          Text(
            name,
            style: GoogleFonts.inter(
              color: const Color(0XFFFBE8A6),
              fontSize: 10,
              fontWeight: FontWeight.w400,
            ),
          )
        ],
      ),
    ));
  }

  @override
  Widget build(BuildContext context) {
    return Container(
        color: const Color(0XFF303C6C),
        height: MediaQuery.of(context).size.height * 0.10,
        child: Row(
            children: <Widget>[
              icon('Accueil', 'asset/home.png'),
              icon('Statistiques', 'asset/stats.png'),
              icon('Calendrier', 'asset/calendar.png'),
              icon('Profile', 'asset/profile.png')
            ]));
  }
}
