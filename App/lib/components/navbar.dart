// ignore_for_file: unnecessary_new, deprecated_member_use
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../dashboard/Home.dart';
import '../dashboard/profile.dart';
import '../dashboard/planning.dart';
import '../dashboard/statistique.dart';
import '../admin/home_admin.dart';
import '../admin/profile_admin.dart';
import '../admin/planning_admin.dart';
import '../admin/statistique_admin.dart';
import '../myapp.dart';
import '../api/api.dart';

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
        child:
          // if (temp == 'admin') {
            Row(children: <Widget>[
              icon_bar('Accueil', 'asset/home.png', const HomeAdmin()),
              icon_bar('Statistiques', 'asset/stats.png', const StatistiqueAdmin()),
              icon_bar('Calendrier', 'asset/calendar.png', const PlanningAdmin()),
              icon_bar('Profile', 'asset/profile.png', const ProfileAdmin())
            ])
          // } else {
            // Row(children: <Widget>[
            // icon_bar('Accueil', 'asset/home.png', const Home()),
            // icon_bar('Statistiques', 'asset/stats.png', const Statistique()),
            // icon_bar('Calendrier', 'asset/calendar.png', const Planning()),
            // icon_bar('Profile', 'asset/profile.png', const Profile())
            // ]);
          // }
    );
  }
}
