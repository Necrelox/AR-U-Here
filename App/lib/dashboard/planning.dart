import 'package:flutter/material.dart';
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
            asset: 'asset/unknow.jpg',
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
                padding: const EdgeInsets.fromLTRB(25, 0, 25, 0),
                decoration: BoxDecoration(
                    color: MyApp.tertiaryColor,
                    borderRadius: BorderRadius.circular(51.0)),
                margin: const EdgeInsets.only(
                  top: 20,
                  bottom: 10,
                  left: 20,
                  right: 20,
                ),
                child: TableCalendar(
                  focusedDay: selectedDay,
                  firstDay: DateTime(1990),
                  lastDay: DateTime(2050),
                  calendarFormat: format,
                  onFormatChanged: (CalendarFormat _format) {
                    setState(() {
                      format = _format;
                    });
                  },
                  startingDayOfWeek: StartingDayOfWeek.sunday,
                  daysOfWeekVisible: true,
                  onDaySelected: (DateTime selectDay, DateTime focusDay) {
                    setState(() {
                      selectedDay = selectDay;
                      focusedDay = focusDay;
                    });
                    print(focusedDay);
                  },
                  selectedDayPredicate: (DateTime date) {
                    return isSameDay(selectedDay, date);
                  },
                  calendarStyle: CalendarStyle(
                    isTodayHighlighted: true,
                    selectedDecoration: BoxDecoration(
                      color: MyApp.quinaryColor,
                      shape: BoxShape.rectangle,
                      borderRadius: BorderRadius.circular(5.0),
                    ),
                    selectedTextStyle: const TextStyle(color: Colors.black),
                    todayDecoration: BoxDecoration(
                      color: MyApp.quaternaryColor,
                      shape: BoxShape.rectangle,
                      borderRadius: BorderRadius.circular(5.0),
                    ),
                    todayTextStyle: const TextStyle(color: Colors.black),
                    defaultDecoration: BoxDecoration(
                      shape: BoxShape.rectangle,
                      borderRadius: BorderRadius.circular(5.0),
                    ),
                    weekendDecoration: BoxDecoration(
                      shape: BoxShape.rectangle,
                      borderRadius: BorderRadius.circular(5.0),
                    ),
                  ),
                  headerStyle: const HeaderStyle(
                    formatButtonVisible: false,
                    titleCentered: true,
                    formatButtonShowsNext: false,
                  ),
                ),
              ),
            ),
            DelayAnimation(
              delay: 500,
              child: Container(
                width: double.infinity,
                alignment: Alignment.center,
                padding: const EdgeInsets.fromLTRB(25, 10, 25, 0),
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
                  width: double.infinity,
                  alignment: Alignment.center,
                  margin: const EdgeInsets.only(
                    top: 10,
                    bottom: 10,
                    left: 20,
                    right: 20,
                  ),
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
                      margin: const EdgeInsets.fromLTRB(20, 20, 20, 5),
                      child: Table(
                        children: [
                          TableRow(children: [
                            Column(children: const [
                              Text('Heure', style: TextStyle(fontSize: 20.0))
                            ]),
                            Column(children: const [
                              Text('Cours', style: TextStyle(fontSize: 20.0))
                            ]),
                            Column(children: const [
                              Text('Salle', style: TextStyle(fontSize: 20.0))
                            ]),
                            Column(children: const [
                              Text('Prof.', style: TextStyle(fontSize: 20.0))
                            ]),
                          ]),
                        ],
                      ),
                    ),
                    Container(
                      padding: const EdgeInsets.all(20),
                      child: Table(
                        children: [
                          TableRow(children: [
                            Column(children: const [Text('9h')]),
                            Column(children: const [Text('E.P.S')]),
                            Column(children: const [Text('Gymnase')]),
                            Column(children: const [Text('Mr. Sarde')]),
                          ]),
                          TableRow(children: [
                            Column(children: const [Text('12h')]),
                            Column(children: const [Text('Repas')]),
                            Column(children: const [Text('Cantine')]),
                            Column(children: const [Text('Mr. Brun')]),
                          ]),
                          TableRow(children: [
                            Column(children: const [Text('13h')]),
                            Column(children: const [Text('S.V.T.')]),
                            Column(children: const [Text('Math')]),
                            Column(children: const [Text('Mr. Rose')]),
                          ]),
                        ],
                      ),
                    ),
                  ])),
            ),
          ],
        ),
      ),
    );
  }
}
