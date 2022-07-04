import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'api/api.dart';

class Home extends StatefulWidget {
  const Home({Key? key}) : super(key: key);
  @override
  Home_state createState() => Home_state();
}

class Home_state extends State<Home> {
  Widget navBar() {
    return AppBar(
      centerTitle: false,
      elevation: 0,
      actions: [
        Padding(
            padding: const EdgeInsets.fromLTRB(0, 0, 15, 5),
            child: ClipRRect(
              borderRadius: BorderRadius.circular(20), // Image border
              child: SizedBox.fromSize(
                size: const Size.fromRadius(23),
                child: Image.asset(
                  './asset/marin.jpg',
                  fit: BoxFit.cover,
                ),
              ),
            )),
      ],
      automaticallyImplyLeading: false,
    );
  }

  Widget recap() {
    return Container(
      margin: EdgeInsets.only(
          top: MediaQuery.of(context).size.width / 2.5,
          left: MediaQuery.of(context).size.width / 17,
          right: MediaQuery.of(context).size.width / 17),
      height: MediaQuery.of(context).size.height * 0.3,
      width: MediaQuery.of(context).size.height * 0.6,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(20),
        color: Color(0XFFFBE8A6),
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
          activity("Pré-Msc", "B201", "Absent", "03/05/2022", "14h", "17h"),
          Padding(
              padding: const EdgeInsets.only(top: 15),
              child: activity(
                  "Pré-Msc", "B201", "Absent", "03/05/2022", "14h", "17h")),
          Padding(
              padding: const EdgeInsets.only(top: 15),
              child: activity(
                  "Pré-Msc", "B201", "Absent", "03/05/2022", "14h", "17h")),
        ],
      ),
    );
  }

  Widget activity(classe, salle, presence, date, heureD, heureF) {
    String str = classe + ' -- ' + salle;
    String heure = heureD + ' - ' + heureF;
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
            Spacer(), // <-- SEE HERE
            Container(
                margin: const EdgeInsets.only(right: 20, top: 10),
                child: (Text(
                  presence,
                  style: const TextStyle(
                      fontSize: 14,
                      color: Colors.red,
                      fontWeight: FontWeight.bold),
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

  Widget box(number, presence) {
    return Container(
        margin: EdgeInsets.only(
            left: MediaQuery.of(context).size.width / 29,
            right: MediaQuery.of(context).size.width / 20),
        height: MediaQuery.of(context).size.height * 0.15,
        width: MediaQuery.of(context).size.height * 0.15,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(20),
          color: Color(0XFFFBE8A6),
        ),
        child: Column(children: <Widget>[
          Text(number,
              style: const TextStyle(
                color: Color(0XFF303C6C),
                fontFamily: 'OpenSans',
                fontSize: 20.0,
                fontWeight: FontWeight.bold,
              )),
          Text(presence,
              style: const TextStyle(
                color: Color(0XFF303C6C),
                fontFamily: 'OpenSans',
                fontSize: 20.0,
                fontWeight: FontWeight.bold,
              )),
        ]));
  }

  Widget totalSession() {
    return Stack(
      children: <Widget>[
        Padding(
          padding: EdgeInsets.only(
              top: MediaQuery.of(context).size.width * 1.15, left: 8),
          child: Row(children: [
            box("10", "Absence(s)"),
            Spacer(),
            box("48", "Présence(s)")
          ]),
        ),
        Container(
          margin: EdgeInsets.only(
              top: MediaQuery.of(context).size.width * 1.5,
              left: MediaQuery.of(context).size.width / 2.8,
              right: MediaQuery.of(context).size.width / 17),
          height: MediaQuery.of(context).size.height * 0.15,
          width: MediaQuery.of(context).size.height * 0.15,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(20),
            color: Color(0XFFFBE8A6),
          ),
          child: Column(
            children: const <Widget>[
              Text("101",
                  style: TextStyle(
                    color: Color(0XFF303C6C),
                    fontFamily: 'OpenSans',
                    fontSize: 20.0,
                    fontWeight: FontWeight.bold,
                  )),
              Text("Session(s)",
                  style: TextStyle(
                    color: Color(0XFF303C6C),
                    fontFamily: 'OpenSans',
                    fontSize: 20.0,
                    fontWeight: FontWeight.bold,
                  )),
            ],
          ),
        ),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: Color(0XFF303C6C),
        body: Stack(
          children: <Widget>[
            navBar(),
            Stack(children: const <Widget>[
              Padding(
                padding: EdgeInsets.only(top: 80.0, left: 50),
                child: Text("Hello Marin !",
                    style: TextStyle(
                      color: Color(0XFFFBE8A6),
                      fontFamily: 'OpenSans',
                      fontSize: 36.0,
                      fontWeight: FontWeight.bold,
                    )),
              ),
              Padding(
                padding: EdgeInsets.only(top: 120, left: 50),
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
                  top: MediaQuery.of(context).size.width * 1.05, left: 50),
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
