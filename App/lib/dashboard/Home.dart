import 'package:flutter/material.dart';
import '../animation.dart';
import '../api/api.dart';
import '../components/appbar.dart';
import '../components/navbar.dart';
import '../myapp.dart';

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
      case "Present":
        return Colors.green;
      case "Absent":
        return Colors.red;
      case "Retard":
        return const Color(0XFFFF7A30);
      case "Exclus":
        return Colors.black;
      default:
    }
    return Colors.blue;
  }

  Widget recap() {
    return Container(
      width: MediaQuery.of(context).size.width * 0.9,
      height: MediaQuery.of(context).size.height * 0.25,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(20),
        color: MyApp.quaternaryColor,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          Container(
            width: MediaQuery.of(context).size.width * 0.8,
            height: MediaQuery.of(context).size.height * 0.05,
            alignment: Alignment.centerLeft,
            child: Text("Activité récentes",
                style: TextStyle(
                  color: MyApp.primaryColor,
                  fontFamily: 'OpenSans',
                  fontSize: 20.0,
                  fontWeight: FontWeight.bold,
                )),
          ),
          Container(
              width: MediaQuery.of(context).size.width * 0.8,
              decoration: BoxDecoration(
                border: Border(
                  bottom: BorderSide(
                    color: MyApp.primaryColor,
                    width: 2,
                  ),
                ),
              )),
          SizedBox(
            width: MediaQuery.of(context).size.width * 0.8,
            child: DataTable(
              headingRowHeight: 0,
              columns: const [
                DataColumn(
                    label: Text('Matières',
                        style: TextStyle(
                            fontSize: 15, fontWeight: FontWeight.w300))),
                DataColumn(
                  label: Expanded(
                      child: Text('Présence',
                          textAlign: TextAlign.right,
                          style: TextStyle(
                              fontSize: 15, fontWeight: FontWeight.w300))),
                ),
              ],
              rows: [
                activity("Pré-MSc", "lol", "Absent", "01/01/01", "13h", "14h"),
                activity("Pré-MSc", "lol", "Retard", "01/01/01", "13h", "14h"),
                activity("Pré-MSc", "lol", "Exclus", "01/01/01", "13h", "14h"),
              ],
            ),
          ),
        ],
      ),
    );
  }

  activity(classe, salle, presence, date, heureD, heureF) {
    String str = classe + ' - ' + salle;
    String heure = heureD + ' - ' + heureF;
    Color coulor = getColor(presence);

    return DataRow(cells: [
      DataCell(
        Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              Text(
                str,
                style: TextStyle(fontSize: 15, color: MyApp.primaryColor),
              ),
              Row(children: <Widget>[
                Text(
                  date,
                  style: TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 15,
                      color: MyApp.primaryColor),
                ),
                const Text(
                  'ㅤ', // NE PAS RETIRER
                ),
                Text(
                  heure,
                  style: TextStyle(fontSize: 15, color: MyApp.primaryColor),
                ),
              ]),
            ]),
      ),
      DataCell(
        Align(
          alignment: Alignment.centerRight,
          child: Text(
            presence,
            style: TextStyle(fontSize: 15, color: coulor),
          ),
        ),
      ),
    ]);
  }

  Widget totalSession() {
    return Column(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
    children: <Widget>[
      Row(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        children: <Widget>[
          Container(
            width: MediaQuery.of(context).size.width * 0.35,
            height: MediaQuery.of(context).size.height * 0.15,
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(30),
              color: MyApp.tertiaryColor,
            ),
            child: Column(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: <Widget>[
                  Text("10",
                      style: TextStyle(
                        color: MyApp.primaryColor,
                        fontFamily: 'OpenSans',
                        fontSize: 32.0,
                        fontWeight: FontWeight.w400,
                      )),
                  Text("Absence(s)",
                      style: TextStyle(
                        color: MyApp.primaryColor,
                        fontFamily: 'OpenSans',
                        fontSize: 16.0,
                        fontWeight: FontWeight.w400,
                      )),
                ]),
          ),
          Container(
            width: MediaQuery.of(context).size.width * 0.35,
            height: MediaQuery.of(context).size.height * 0.15,
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(30),
              color: MyApp.secondaryColor,
            ),
            child: Column(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: <Widget>[
                  Text("48",
                      style: TextStyle(
                        color: MyApp.primaryColor,
                        fontFamily: 'OpenSans',
                        fontSize: 32.0,
                        fontWeight: FontWeight.w400,
                      )),
                  Text("Présence(s)",
                      style: TextStyle(
                        color: MyApp.primaryColor,
                        fontFamily: 'OpenSans',
                        fontSize: 16.0,
                        fontWeight: FontWeight.w400,
                      )),
                ]),
          ),
        ],
      ),

      SizedBox(
        height: MediaQuery.of(context).size.height * 0.05,
      ),

      Container(
          width: MediaQuery.of(context).size.width * 0.35,
          height: MediaQuery.of(context).size.height * 0.15,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(30),
            color: MyApp.quaternaryColor,
          ),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: <Widget>[
              Text("101",
                  style: TextStyle(
                    color: MyApp.primaryColor,
                    fontFamily: 'OpenSans',
                    fontSize: 32.0,
                    fontWeight: FontWeight.w400,
                  )),
              Text("Session(s)",
                  style: TextStyle(
                    color: MyApp.primaryColor,
                    fontFamily: 'OpenSans',
                    fontSize: 16.0,
                    fontWeight: FontWeight.w400,
                  )),
            ],
          )),
    ],
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: MyApp.primaryColor,
      appBar: PreferredSize(
          preferredSize: const Size.fromHeight(50),
          child: ApplicationBar(
              asset: "asset/marin.jpg", color: MyApp.primaryColor, title: '')),
      bottomNavigationBar: const NavbarDemo(),
      body: SingleChildScrollView(
        child: SizedBox(
          width: double.infinity,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: <Widget>[
              SizedBox(
                height: MediaQuery.of(context).size.height * 0.10,
                width: MediaQuery.of(context).size.width * 0.9,
                child: Column(
                  children: <Widget>[
                  DelayAnimation(
                    delay: 200,
                    child: Align(
                      alignment: Alignment.centerLeft,
                      child: Text("Salut Marin",
                        style: TextStyle(
                          color: MyApp.tertiaryColor,
                          fontFamily: 'OpenSans',
                          fontSize: 48.0,
                          fontWeight: FontWeight.w400,
                        ))),
                  ),
                  DelayAnimation(
                    delay: 500,
                    child: Align(
                      alignment: Alignment.centerLeft,
                      child: Text("Nouvelles Notifications",
                        style: TextStyle(
                          color: MyApp.tertiaryColor,
                          fontFamily: 'OpenSans',
                          fontSize: 14.0,
                          fontWeight: FontWeight.w400,
                        ))),
                  ),
              ]),
            ),
            DelayAnimation(delay: 500, child: recap()),
            DelayAnimation(
                delay: 800,
                child: SizedBox(
                  height: MediaQuery.of(context).size.height * 0.075,
                  width: MediaQuery.of(context).size.width * 0.85,
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: <Widget>[
                      Text("Résumé du mois",
                          style: TextStyle(
                            color: MyApp.tertiaryColor,
                            fontFamily: 'Inter',
                            fontSize: 24.0,
                            fontWeight: FontWeight.w400,
                          )),
                    ],
                  ),
                  )
                  ),
            DelayAnimation(delay: 1000, child: totalSession()),
          ],
        ),
      )),
    );
  }
}
