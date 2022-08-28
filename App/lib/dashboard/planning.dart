import 'package:flutter/material.dart';
import 'package:table_calendar/table_calendar.dart';
import '../animation.dart';
import '../components/navbar.dart';
import '../components/appbar.dart';
import '../class/Activity.dart';
import '../api/api.dart';
import '../myapp.dart';

class Planning extends StatefulWidget {
  const Planning({Key? key}) : super(key: key);

  @override
  // ignore: library_private_types_in_public_api
  _PlanningState createState() => _PlanningState();
}

class _PlanningState extends State<Planning> {
  CalendarFormat format = CalendarFormat.month;
  late Future<List<Activity>> futureActivity;
  DateTime selectedDay = DateTime.now();
  DateTime focusedDay = DateTime.now();

  final TextEditingController _eventController = TextEditingController();

  @override
  void initState() {
    super.initState();
    futureActivity = fetchActivity();
  }

  @override
  void dispose() {
    _eventController.dispose();
    super.dispose();
  }

  TableRow table(String startHour, endHour, prof) {
    return TableRow(children: [
      Column(children: [
        Text(startHour,
        textAlign: TextAlign.center,
        style: TextStyle(
          fontSize:  MediaQuery.of(context).size.width * 0.035,
          color: MyApp.primaryColor,
        ),),
      ]),
      Column(children: [
        Text(endHour,
        textAlign: TextAlign.center,
        style: TextStyle(
          fontSize: MediaQuery.of(context).size.width * 0.035,
          color: MyApp.primaryColor,
        ),)
      ]),
      Column(children: [
        Text(prof,
        textAlign: TextAlign.center,
        style: TextStyle(
          fontSize: MediaQuery.of(context).size.width * 0.035,
          color: MyApp.primaryColor,
        ),)
      ]),
    ]);
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
                      margin: const EdgeInsets.fromLTRB(5, 20, 5, 20),
                      child: Table(
                        children: [
                          TableRow(children: [
                            Column(children: [
                              Text('Heure',
                                  style: TextStyle(
                                      fontWeight: FontWeight.bold,
                                      fontSize: 20.0,
                                      color: MyApp.primaryColor))
                            ]),
                            Column(children: [
                              Text('Cours',
                                  style: TextStyle(
                                      fontWeight: FontWeight.bold,
                                      fontSize: 20.0,
                                      color: MyApp.primaryColor))
                            ]),
                            Column(children: [
                              Text('Prof.',
                                  style: TextStyle(
                                      fontWeight: FontWeight.bold,
                                      fontSize: 20.0,
                                      color: MyApp.primaryColor))
                            ]),
                          ]),
                        ],
                      ),
                    ),
                    Container(
                      margin: const EdgeInsets.fromLTRB(5, 0, 5, 20),
                      child: FutureBuilder<List<Activity>>(
                        future: futureActivity,
                        builder: (context, snapshot) {
                          if (snapshot.hasData) {
                            return Table(
                              children: [
                                table('${snapshot.data![0].startTime!.substring(11, 13)}h - ${snapshot.data![0].endTime!.substring(11, 13)}h', '${snapshot.data![0].name}', 'Mr. Eric'),
                                table('${snapshot.data![1].startTime!.substring(11, 13)}h - ${snapshot.data![1].endTime!.substring(11, 13)}h', '${snapshot.data![1].name}', 'Mr. Maxime'),
                                table('${snapshot.data![2].startTime!.substring(11, 13)}h - ${snapshot.data![2].endTime!.substring(11, 13)}h', '${snapshot.data![2].name}', 'Mr. Sarde'),
                              ],
                            );
                          } else if (snapshot.hasError) {
                            return Text("${snapshot.error}");
                          }
                          return CircularProgressIndicator();
                        },
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
