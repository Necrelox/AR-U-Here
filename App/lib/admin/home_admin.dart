import 'package:flutter/material.dart';
import '../animation.dart';
import '../api/api.dart';
import '../class/User.dart';
import '../class/Activity.dart';
import '../components/appbar.dart';
import '../components/navbar.dart';
import '../myapp.dart';

class HomeAdmin extends StatefulWidget {
  const HomeAdmin({Key? key}) : super(key: key);
  @override
  Home_state createState() => Home_state();
}

class Home_state extends State<HomeAdmin> {
  late Color c;
  late Future<User> futureUser;
  late Future<List<Activity>> futureActivity;
  @override
  void initState() {
    super.initState();
    futureUser = fetchUser();
    futureActivity = fetchActivity();
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
            width: MediaQuery.of(context).size.width * 0.9,
            child: FutureBuilder<List<Activity>>(
                future: futureActivity,
                builder: (context, snapshot) {
                  if (snapshot.hasData) {
                    return DataTable(
                      headingRowHeight: 0,
                      columns: const [
                        DataColumn(
                            label: Text('Matières',
                                style: TextStyle(
                                    fontSize: 15,
                                    fontWeight: FontWeight.w300))),
                        DataColumn(
                          label: Expanded(
                              child: Text('Présence',
                                  textAlign: TextAlign.right,
                                  style: TextStyle(
                                      fontSize: 15,
                                      fontWeight: FontWeight.w300))),
                        ),
                      ],
                      rows: [
                        activity(
                            "Pré-MSc",
                            "${snapshot.data![0].name}",
                            snapshot.data![0].startTime!.substring(0, 10),
                            "${snapshot.data![0].startTime!.substring(11, 13)}h",
                            "${snapshot.data![0].endTime!.substring(11, 13)}h"),
                        activity(
                            "Pré-MSc",
                            "${snapshot.data![1].name}",
                            snapshot.data![1].startTime!.substring(0, 10),
                            "${snapshot.data![1].startTime!.substring(11, 13)}h",
                            "${snapshot.data![1].endTime!.substring(11, 13)}h"),
                        activity(
                            "Pré-MSc",
                            "${snapshot.data![2].name}",
                            snapshot.data![2].startTime!.substring(0, 10),
                            "${snapshot.data![2].startTime!.substring(11, 13)}h",
                            "${snapshot.data![2].endTime!.substring(11, 13)}h"),
                      ],
                    );
                  } else if (snapshot.hasError) {
                    return Text("${snapshot.error}");
                  }
                  return const CircularProgressIndicator();
                }),
          ),
        ],
      ),
    );
  }

  activity(classe, salle, date, heureD, heureF) {
    String str = classe + ' - ' + salle;
    String heure = heureD + ' - ' + heureF;

    return DataRow(cells: [
      DataCell(
        Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              Text(
                str,
                style: TextStyle(fontSize: 11, color: MyApp.primaryColor),
              ),
              Row(children: <Widget>[
                Text(
                  date,
                  style: TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 13,
                      color: MyApp.primaryColor),
                ),
                const Text(
                  'ㅤ', // NE PAS RETIRER
                ),
                Text(
                  heure,
                  style: TextStyle(fontSize: 13, color: MyApp.primaryColor),
                ),
              ]),
            ]),
      ),
      DataCell(
        Align(
          alignment: Alignment.centerRight,
          child: Text(
            textAlign: TextAlign.right,
            "Voir fiche",
            style: TextStyle(
                fontSize: 13,
                color: MyApp.primaryColor,
                fontWeight: FontWeight.bold),
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
                    Text("Absence(s) d'élève(s)",
                        textAlign: TextAlign.center,
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
                    Text("Moyenne de la classe",
                        textAlign: TextAlign.center,
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
                    textAlign: TextAlign.center,
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
              asset: "asset/unknow.jpg",
              color: MyApp.primaryColor,
              title: '',
              titleColor: MyApp.primaryColor)),
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
              child: Column(children: <Widget>[
                DelayAnimation(
                  delay: 200,
                  child: Align(
                      alignment: Alignment.centerLeft,
                      child: FutureBuilder<User>(
                        future: futureUser,
                        builder: (context, snapshot) {
                          if (snapshot.hasData) {
                            return Text(
                              'Bienvenue ${snapshot.data!.username}',
                              style: TextStyle(
                                color: MyApp.tertiaryColor,
                                fontFamily: 'OpenSans',
                                fontSize: 38.0,
                                fontWeight: FontWeight.w400,
                              ),
                            );
                          } else if (snapshot.hasError) {
                            return Text("${snapshot.error}");
                          }
                          return const CircularProgressIndicator();
                        },
                      )),
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
                )),
            DelayAnimation(delay: 1000, child: totalSession()),
          ],
        ),
      )),
    );
  }
}
