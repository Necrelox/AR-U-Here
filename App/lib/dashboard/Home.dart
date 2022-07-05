import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../api/api.dart';
import '../components/appbar.dart';
import '../components/navbar.dart';

class Home extends StatefulWidget {
  const Home({Key? key}) : super(key: key);
  @override
  Home_state createState() => Home_state();
}

class Home_state extends State<Home> {
  late Color c;
  Color getColor(String presence) {
    switch (presence) {
      //add more color as your wish
      case "present":
        return Colors.green;
      case "absent":
        return Colors.red;
      case "retard":
        return Colors.yellow;
      case "exclus":
        return Colors.black;
      default:
    }
    return Colors.blue;
  }

  Widget recap() {
    return Container(
      margin: EdgeInsets.only(
          top: MediaQuery.of(context).size.width / 3.8,
          left: MediaQuery.of(context).size.width / 17,
          right: MediaQuery.of(context).size.width / 17),
      height: MediaQuery.of(context).size.height * 0.3,
      width: MediaQuery.of(context).size.height * 0.6,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(20),
        color: Color(0XFFB4DFE5),
      ),
      child: Column(
        children: <Widget>[
          const Text("Activité récentes",
              style: TextStyle(
                color: Color(0XFF303C6C),
                fontFamily: 'OpenSans',
                fontSize: 20.0,
                fontWeight: FontWeight.bold,
              )),
          Divider(color: Colors.black),
          activity("Pré-Msc", "B201", "absent", "03/05/2022", "14h", "17h"),
          Padding(
              padding: const EdgeInsets.only(top: 15),
              child: activity(
                  "Pré-Msc", "B201", "present", "03/05/2022", "14h", "17h")),
          Padding(
              padding: const EdgeInsets.only(top: 15),
              child: activity(
                  "Pré-Msc", "B201", "exclus", "03/05/2022", "14h", "17h")),
        ],
      ),
    );
  }

  Widget activity(classe, salle, presence, date, heureD, heureF) {
    String str = classe + ' -- ' + salle;
    String heure = heureD + ' - ' + heureF;
    Color coulor = getColor(presence);

    return Container(
      child: Column(children: [
        Row(
          children: [
            Container(
                margin: const EdgeInsets.only(left: 20),
                child: (Text(
                  str,
                  style: const TextStyle(fontSize: 14),
                ))),
            const Spacer(),
            Container(
                margin: const EdgeInsets.only(right: 20, top: 10),
                child: (Text(
                  presence,
                  style: TextStyle(
                      fontSize: 14, color: coulor, fontWeight: FontWeight.bold),
                )))
          ],
        ),
        Row(
          children: [
            Container(
                margin: const EdgeInsets.only(left: 20),
                child: (Text(
                  date,
                  style: const TextStyle(fontSize: 14),
                ))),
            Container(
                margin: const EdgeInsets.only(left: 20),
                child: (Text(
                  heure,
                  style: const TextStyle(fontSize: 14),
                ))),
          ],
        ),
      ]),
    );
  }

  Widget box(number, presence, couleur) {
    c = Color(couleur);
    return Container(
        margin: EdgeInsets.only(
            left: MediaQuery.of(context).size.width / 29,
            right: MediaQuery.of(context).size.width / 20),
        height: MediaQuery.of(context).size.height * 0.12,
        width: MediaQuery.of(context).size.height * 0.20,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(20),
          color: c,
        ),
        child: Column(children: <Widget>[
          Padding(
            padding: EdgeInsets.only(top: 20),
            child: Column(
              children: <Widget>[
                Text(number,
                    style: const TextStyle(
                      color: Color(0XFF303C6C),
                      fontFamily: 'OpenSans',
                      fontSize: 20.0,
                      fontWeight: FontWeight.bold,
                    )),
              ],
            ),
          ),
          Padding(
            padding: EdgeInsets.only(top: 0),
            child: Text(presence,
                style: const TextStyle(
                  color: Color(0XFF303C6C),
                  fontFamily: 'OpenSans',
                  fontSize: 20.0,
                  fontWeight: FontWeight.bold,
                )),
          ),
        ]));
  }

  Widget totalSession() {
    return Stack(
      children: <Widget>[
        Padding(
          padding: EdgeInsets.only(
              top: MediaQuery.of(context).size.width * 1.05, left: 8),
          child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                box("10", "Absence(s)", 0XFFFBE8A6),
                box("48", "Présence(s)", 0XFFF4976C)
              ]),
        ),
        Container(
          margin: EdgeInsets.only(
              top: MediaQuery.of(context).size.width * 1.31,
              left: MediaQuery.of(context).size.width / 3.1,
              right: MediaQuery.of(context).size.width / 17),
          height: MediaQuery.of(context).size.height * 0.15,
          width: MediaQuery.of(context).size.height * 0.20,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(20),
            color: Color(0XFFB4DFE5),
          ),
          child: Padding(
              padding: EdgeInsets.only(top: 20),
              child: Column(
                children: const <Widget>[
                  Text("101",
                      style: TextStyle(
                        color: Color(0XFF303C6C),
                        fontFamily: 'OpenSans',
                        fontSize: 20.0,
                        fontWeight: FontWeight.bold,
                      )),
                  Padding(
                    padding: EdgeInsets.only(top: 0),
                    child: Text("Session(s)",
                        style: TextStyle(
                          color: Color(0XFF303C6C),
                          fontFamily: 'OpenSans',
                          fontSize: 20.0,
                          fontWeight: FontWeight.bold,
                        )),
                  ),
                ],
              )),
        ),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: Color(0XFF303C6C),
        appBar: const PreferredSize(
            preferredSize: Size.fromHeight(50),
            child: ApplicationBar(
                asset: "asset/marin.jpg", color: Color(0XFF303C6C), title: '')),
        bottomNavigationBar: NavbarDemo(),
        body: Stack(
          children: <Widget>[
            Stack(children: const <Widget>[
              Padding(
                padding: EdgeInsets.only(top: 12.0, left: 50),
                child: Text("Hello Marin !",
                    style: TextStyle(
                      color: Color(0XFFFBE8A6),
                      fontFamily: 'OpenSans',
                      fontSize: 36.0,
                      fontWeight: FontWeight.bold,
                    )),
              ),
              Padding(
                padding: EdgeInsets.only(top: 51, left: 50),
                child: Text("Nouvelles Notifications",
                    style: TextStyle(
                      color: Color(0XFFFBE8A6),
                      fontFamily: 'OpenSans',
                      fontSize: 14.0,
                      fontWeight: FontWeight.bold,
                    )),
              ),
            ]),
            recap(),
            Padding(
              padding: EdgeInsets.only(
                  top: MediaQuery.of(context).size.width * 0.9, left: 50),
              child: const Text("Résumé du mois",
                  style: TextStyle(
                    color: Color(0XFFFBE8A6),
                    fontFamily: 'OpenSans',
                    fontSize: 30.0,
                    fontWeight: FontWeight.bold,
                  )),
            ),
            totalSession(),
          ],
        ));
  }
}
