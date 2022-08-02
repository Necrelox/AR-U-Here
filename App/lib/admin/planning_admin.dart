import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:table_calendar/table_calendar.dart';
import '../animation.dart';
import '../components/navbar.dart';
import '../components/appbar.dart';
import '../myapp.dart';

class Planning extends StatefulWidget {
  const Planning({Key? key}) : super(key: key);

  @override
  // ignore: library_private_types_in_public_api
  _PlanningState createState() => _PlanningState();
}

tablePlanning(String hour, String cours, String room, String present) {
  return TableRow(children: [
    Column(children: [
      Text(hour,
          style: GoogleFonts.inter(
            color: MyApp.primaryColor,
            fontSize: 15,
            fontWeight: FontWeight.w500,
          )),
    ]),
    Column(
      children: [
        Text(cours,
            style: GoogleFonts.inter(
              color: MyApp.primaryColor,
              fontSize: 15,
              fontWeight: FontWeight.w500,
            )),
      ],
    ),
    Column(
      children: [
        Text(room,
            style: GoogleFonts.inter(
              color: MyApp.primaryColor,
              fontSize: 15,
              fontWeight: FontWeight.w500,
            )),
      ],
    ),
    Column(
      children: [
        Text(
          present,
          style: GoogleFonts.roboto(
            fontSize: 15,
            fontWeight: FontWeight.w500,
            backgroundColor: const Color.fromARGB(255, 9, 255, 0),
            color: MyApp.primaryColor,
          ),
        ),
      ],
    ),
  ]);
}

class _PlanningState extends State<Planning> {
  CalendarFormat format = CalendarFormat.month;
  DateTime selectedDay = DateTime.now();
  DateTime focusedDay = DateTime.now();

  final TextEditingController _eventController = TextEditingController();

  @override
  void initState() {
    super.initState();
  }

  @override
  void dispose() {
    _eventController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: MyApp.secondaryColor,
      bottomNavigationBar: const NavbarDemo(),
      appBar: PreferredSize(
        preferredSize: const Size.fromHeight(50),
        child: ApplicationBar(
            color: MyApp.secondaryColor,
            asset: 'asset/marin.jpg',
            title: 'Planning',
            titleColor: MyApp.tertiaryColor),
      ),
      body: SingleChildScrollView(
        child: Column(
          children: <Widget>[
            DelayAnimation(
              delay: 500,
              child: Container(
                width: double.infinity,
                alignment: Alignment.center,
                padding: const EdgeInsets.fromLTRB(25, 10, 25, 10),
                margin: const EdgeInsets.only(
                  top: 0,
                  bottom: 0,
                  left: 20,
                  right: 20,
                ),
                child: RichText(
                  textAlign: TextAlign.center,
                  text: TextSpan(children: <TextSpan>[
                    TextSpan(
                        text: "Aujourd'hui",
                        style: TextStyle(
                          color: MyApp.primaryColor,
                          fontSize: 22,
                          fontWeight: FontWeight.bold,
                        )),
                  ]),
                ),
              ),
            ),
            DelayAnimation(
              delay: 500,
              child: Container(
                  alignment: Alignment.center,
                  height: MediaQuery.of(context).size.height * 0.4,
                  width: MediaQuery.of(context).size.width * 0.9,
                  decoration: BoxDecoration(
                      color: MyApp.quinaryColor,
                      // ignore: prefer_const_constructors
                      borderRadius: BorderRadius.only(
                        bottomRight: const Radius.circular(51.0),
                        bottomLeft: const Radius.circular(51.0),
                        topLeft: const Radius.circular(51.0),
                        topRight: const Radius.circular(51.0),
                      )),
                  child: Column(children: <Widget>[
                    Container(
                      margin: const EdgeInsets.fromLTRB(20, 20, 20, 0),
                      child: Table(
                        children: [
                          TableRow(children: [
                            Column(children: [
                              Text('Heure',
                                  style: TextStyle(
                                      fontSize: 18.0,
                                      color: MyApp.primaryColor))
                            ]),
                            Column(children: [
                              Text('Cours',
                                  style: TextStyle(
                                      fontSize: 18.0,
                                      color: MyApp.primaryColor))
                            ]),
                            Column(children: [
                              Text('Salle',
                                  style: TextStyle(
                                      fontSize: 18.0,
                                      color: MyApp.primaryColor))
                            ]),
                            Column(children: [
                              Text('Présence',
                                  style: TextStyle(
                                      fontSize: 18.0,
                                      color: MyApp.primaryColor))
                            ]),
                          ]),
                        ],
                      ),
                    ),
                    Container(
                      height: MediaQuery.of(context).size.height * 0.2,
                      padding: const EdgeInsets.only(left: 20, right: 20),
                      alignment: Alignment.bottomCenter,
                      child: Table(
                        children: [
                          tablePlanning('8h', 'Dart', 'Salle 56', 'Validé'),
                          tablePlanning('9h', 'Dart', 'Gymnase', 'Validé'),
                          tablePlanning('10h', 'Dart', 'Salle 78', 'Validé'),
                          tablePlanning('13h', 'Dart', 'Gymnase', 'Validé'),
                          tablePlanning('15h', 'Dart', 'Gymnase', 'Validé'),
                          tablePlanning('16h', 'Dart', 'Gymnase', 'Validé'),
                          tablePlanning('17h', 'Dart', 'Gymnase', 'Validé'),
                        ],
                      ),
                    ),
                  ])),
            ),
            Container(
                margin: const EdgeInsets.only(left: 20, right: 20, top: 20),
                child: Divider(
                  color: MyApp.quaternaryColor,
                )),
            DelayAnimation(
              delay: 500,
              child: Container(
                width: double.infinity,
                height: MediaQuery.of(context).size.height * 0.05,
                alignment: Alignment.center,
                padding: const EdgeInsets.fromLTRB(25, 0, 25, 0),
                margin: const EdgeInsets.only(
                  top: 0,
                  bottom: 0,
                  left: 20,
                  right: 20,
                ),
                child: RichText(
                  textAlign: TextAlign.center,
                  text: TextSpan(children: <TextSpan>[
                    TextSpan(
                        text: "Information",
                        style: TextStyle(
                          color: MyApp.primaryColor,
                          fontSize: 22,
                          fontWeight: FontWeight.bold,
                        )),
                  ]),
                ),
              ),
            ),
            DelayAnimation(
              delay: 500,
              child: Container(
                width: MediaQuery.of(context).size.width * 0.9,
                alignment: Alignment.centerLeft,
                decoration: BoxDecoration(
                    color: MyApp.tertiaryColor,
                    // ignore: prefer_const_constructors
                    borderRadius: BorderRadius.only(
                      bottomRight: const Radius.circular(51.0),
                      bottomLeft: const Radius.circular(51.0),
                      topLeft: const Radius.circular(51.0),
                      topRight: const Radius.circular(51.0),
                    )),
                child: Column(
                    mainAxisAlignment: MainAxisAlignment.start,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Container(
                        margin: const EdgeInsets.fromLTRB(40, 10, 40, 10),
                        child: Table(
                          children: [
                            TableRow(children: [
                              Column(
                                mainAxisAlignment: MainAxisAlignment.start,
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                
                                Text('Début des cours:',
                                    style: TextStyle(
                                        fontSize: 18.0,
                                        fontWeight: FontWeight.w500,
                                        color: MyApp.primaryColor))
                              ]),
                              Column(
                                mainAxisAlignment: MainAxisAlignment.end,
                                crossAxisAlignment: CrossAxisAlignment.end,
                                children: [
                                Text('9h00',
                                    style: TextStyle(
                                        fontSize: 18.0,
                                        color: MyApp.primaryColor))
                              ]),
                            ]),
                            TableRow(children: [
                              Column(
                                mainAxisAlignment: MainAxisAlignment.start,
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                Text('Fin des cours:',
                                    style: TextStyle(
                                        fontSize: 18.0,
                                        fontWeight: FontWeight.w500,
                                        color: MyApp.primaryColor))
                              ]),
                              Column(
                                mainAxisAlignment: MainAxisAlignment.end,
                                crossAxisAlignment: CrossAxisAlignment.end,
                                children: [
                                Text('18h00',
                                    style: TextStyle(
                                        fontSize: 18.0,
                                        color: MyApp.primaryColor))
                              ]),
                            ]),
                            TableRow(children: [
                              Column(
                                mainAxisAlignment: MainAxisAlignment.start,
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                Text('Inter-cours:',
                                    style: TextStyle(
                                        fontSize: 18.0,
                                        fontWeight: FontWeight.w500,
                                        color: MyApp.primaryColor))
                              ]),
                              Column(
                                mainAxisAlignment: MainAxisAlignment.end,
                                crossAxisAlignment: CrossAxisAlignment.end,
                                children: [
                                Text('5min',
                                    style: TextStyle(
                                        fontSize: 18.0,
                                        color: MyApp.primaryColor))
                              ]),
                            ]),
                            TableRow(children: [
                              Column(
                                mainAxisAlignment: MainAxisAlignment.start,
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                Text('Récréation:',
                                    style: TextStyle(
                                        fontSize: 18.0,
                                        fontWeight: FontWeight.w500,
                                        color: MyApp.primaryColor))
                              ]),
                              Column(
                                mainAxisAlignment: MainAxisAlignment.end,
                                crossAxisAlignment: CrossAxisAlignment.end,
                                children: [
                                Text('15min',
                                    style: TextStyle(
                                        fontSize: 18.0,
                                        color: MyApp.primaryColor))
                              ]),
                            ]),
                            TableRow(children: [
                              Column(
                                mainAxisAlignment: MainAxisAlignment.start,
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                Text('Retard accepté au maximum:',
                                    style: TextStyle(
                                        fontSize: 18.0,
                                        fontWeight: FontWeight.w500,
                                        color: MyApp.primaryColor))
                              ]),
                              Column(
                                mainAxisAlignment: MainAxisAlignment.end,
                                crossAxisAlignment: CrossAxisAlignment.end,
                                children: [
                                Text('3min',
                                    style: TextStyle(
                                        fontSize: 18.0,
                                        color: MyApp.primaryColor))
                              ]),
                            ]),
                          ],
                        ),
                      ),
                    ]),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
