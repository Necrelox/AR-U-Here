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
  Widget icon_bar(String name, String asset, int redirect) {
    return Expanded(
        child: RaisedButton(
      onPressed: () async {
        if (await fetch_roles() == 'admin') {
          if (redirect == 1) {
            Navigator.push(
                context, MaterialPageRoute(builder: (context) => HomeAdmin()));
          } else if (redirect == 2) {
            Navigator.push(
                context, MaterialPageRoute(builder: (context) => StatistiqueAdmin()));
          } else if (redirect == 3) {
            Navigator.push(
                context, MaterialPageRoute(builder: (context) => PlanningAdmin()));
          } else if (redirect == 4) {
            Navigator.push(
                context, MaterialPageRoute(builder: (context) => ProfileAdmin()));
          }
        } else if (await fetch_roles() == 'user') {
          if (redirect == 1) {
            Navigator.push(
                context, MaterialPageRoute(builder: (context) => Home()));
          } else if (redirect == 2) {
            Navigator.push(
                context, MaterialPageRoute(builder: (context) => Statistique()));
          } else if (redirect == 3) {
            Navigator.push(
                context, MaterialPageRoute(builder: (context) => Planning()));
          } else if (redirect == 4) {
            Navigator.push(
                context, MaterialPageRoute(builder: (context) => Profile()));
          }
        } else if (await fetch_roles() == 'professor') {
          if (redirect == 1) {
            Navigator.push(
                context, MaterialPageRoute(builder: (context) => HomeAdmin()));
          } else if (redirect == 2) {
            Navigator.push(
                context, MaterialPageRoute(builder: (context) => StatistiqueAdmin()));
          } else if (redirect == 3) {
            Navigator.push(
                context, MaterialPageRoute(builder: (context) => PlanningAdmin()));
          } else if (redirect == 4) {
            Navigator.push(
                context, MaterialPageRoute(builder: (context) => ProfileAdmin()));
          }
        } else {
          if (redirect == 1) {
            Navigator.push(
                context, MaterialPageRoute(builder: (context) => Home()));
          } else if (redirect == 2) {
            Navigator.push(
                context, MaterialPageRoute(builder: (context) => Statistique()));
          } else if (redirect == 3) {
            Navigator.push(
                context, MaterialPageRoute(builder: (context) => Planning()));
          } else if (redirect == 4) {
            Navigator.push(
                context, MaterialPageRoute(builder: (context) => Profile()));
          }
        }
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
          icon_bar('Accueil', 'asset/home.png', 1),
          icon_bar('Statistiques', 'asset/stats.png', 2),
          icon_bar('Calendrier', 'asset/calendar.png', 3),
          icon_bar('Profile', 'asset/profile.png', 4)
        ]));
  }
}
