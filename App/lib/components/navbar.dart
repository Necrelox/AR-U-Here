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
      elevation: 1.0,
      onPressed: () => print('Login Button Pressed'),
      color: const Color(0XFF303C6C),
      child: Column(
        children: <Widget>[
          Image.asset(asset, width: 60, height: 60),
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
        height: 100,
        child: Row(
            children: <Widget>[
              icon('Accueil', 'asset/home.png'),
              icon('Statistiques', 'asset/stats.png'),
              icon('Calendrier', 'asset/calendar.png'),
              icon('Profile', 'asset/profile.png')
            ]));
  }

  //   @override
  // Widget build(BuildContext context) {
  //   return Container(
  //       // body : Stack (
  //       // children: <Widget>[
  //       height: 100,
  //       width: double.infinity,
  //       child: RaisedButton(
  //           elevation: 5.0,
  //           onPressed: () => print('Login Button Pressed'),
  //           color: const Color(0XFF303C6C),
  //           child: Row(
  //               mainAxisAlignment: MainAxisAlignment.spaceBetween,
  //               children: <Widget>[
  //                 icon('Accueil', 'asset/home.png'),
  //                 icon('Statistiques', 'asset/home.png'),
  //                 icon('Calendrier', 'asset/home.png'),
  //                 icon('Profile', 'asset/home.png')
  //               ])));
  // }
}
