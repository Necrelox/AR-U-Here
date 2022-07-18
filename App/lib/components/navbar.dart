// ignore_for_file: unnecessary_new, deprecated_member_use
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../dashboard/Home.dart';
import '../dashboard/profile.dart';
import '../dashboard/planning.dart';
import '../myapp.dart';

class NavbarDemo extends StatefulWidget {
  const NavbarDemo({Key? key}) : super(key: key);

  @override
  Naviguation createState() => Naviguation();
}

class Naviguation extends State<NavbarDemo> {
  Widget icon_bar(String name, String asset, Widget redirect) {
    return Expanded(
        child: RaisedButton(
      onPressed: () => {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => redirect,
          ),
        )
      },
      color: MyApp.primaryColor,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: <Widget>[
          Image.asset(asset, width: 40, height: 40),
          Text(
            name,
            style: GoogleFonts.inter(
              color: MyApp.tertiaryColor,
              fontSize: 10,
              fontWeight: FontWeight.w500,
            ),
          )
        ],
      ),
    ));
  }

  @override
  Widget build(BuildContext context) {
    return Container(
        color: MyApp.primaryColor,
        height: MediaQuery.of(context).size.height * 0.10,
        child: Row(children: <Widget>[
          icon_bar('Accueil', 'asset/home.png', const Home()),
          icon_bar('Statistiques', 'asset/stats.png', const Home()),
          icon_bar('Calendrier', 'asset/calendar.png', const Planning()),
          icon_bar('Profile', 'asset/profile.png', const Profile())
        ]));
  }
}
