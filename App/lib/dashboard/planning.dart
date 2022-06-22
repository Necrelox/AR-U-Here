import 'package:flutter/material.dart';
import 'package:table_calendar/table_calendar.dart';
import '../animation.dart';

class Planning extends StatefulWidget {
  @override
  _PlanningState createState() => _PlanningState();
}

class _PlanningState extends State<Planning> {
  CalendarFormat format = CalendarFormat.month;
  DateTime selectedDay = DateTime.now();
  DateTime focusedDay = DateTime.now();

  TextEditingController _eventController = TextEditingController();

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
      backgroundColor: Color(0XFFF4976C),
      appBar: AppBar(
        centerTitle: false,
        actions: [
          Padding(
            padding: EdgeInsets.fromLTRB(0, 0, 15, 5),
            child:
              ClipRRect(
                borderRadius: BorderRadius.circular(20), // Image border
                child: SizedBox.fromSize(
                  size: Size.fromRadius(28),
                  child: Image.asset(
                    './asset/marin.jpg',
                    fit: BoxFit.cover,
                  ),
                ),
              ) 
          ),
        ],
        title: Text(
          "Planning",
          style: TextStyle(
            color: Color(0XFFFBE8A6),
            fontSize: 28.0,
            fontWeight: FontWeight.bold),
          ),
        backgroundColor: Color(0XFFF4976C),
        automaticallyImplyLeading: false,
      ),
      body: SingleChildScrollView(
        child: Column(
          children: <Widget>[

            DelayAnimation(
              delay: 500,
              child: Container (
                width: double.infinity,
                alignment: Alignment.center,
                padding: EdgeInsets.fromLTRB(25,10,25,0),
                decoration: BoxDecoration(
                color: Color(0XFFFBE8A6),
                // ignore: prefer_const_constructors
                borderRadius: new BorderRadius.only(
                  bottomRight: const Radius.circular(51.0),
                  bottomLeft: const Radius.circular(51.0),
                  topLeft: const Radius.circular(51.0),
                  topRight: const Radius.circular(51.0),
                )),
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
                    color: Color(0XFFD2FDFF),
                    shape: BoxShape.rectangle,
                    borderRadius: BorderRadius.circular(5.0),
                  ),
                  selectedTextStyle: TextStyle(color: Colors.black),
                  todayDecoration: BoxDecoration(
                    color: Color(0XFFB4DFE5),
                    shape: BoxShape.rectangle,
                    borderRadius: BorderRadius.circular(5.0),
                  ),
                  todayTextStyle: TextStyle(color: Colors.black),
                  defaultDecoration: BoxDecoration(
                    shape: BoxShape.rectangle,
                    borderRadius: BorderRadius.circular(5.0),
                  ),
                  weekendDecoration: BoxDecoration(
                    shape: BoxShape.rectangle,
                    borderRadius: BorderRadius.circular(5.0),
                  ),
                ),

                headerStyle: HeaderStyle(
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
                  padding: EdgeInsets.fromLTRB(25,10,25,0),
                  margin: const EdgeInsets.only(
                    top: 20,
                    bottom: 10,
                    left: 20,
                    right: 20,
                  ),
                  child: RichText(
                    textAlign: TextAlign.center,
                    text: const TextSpan(children: <TextSpan>[
                      TextSpan(
                          text:
                              "Aujourd'hui",
                          style: TextStyle(
                            color: Color(0XFF303C6C),
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
                  padding: EdgeInsets.fromLTRB(25,75,25,75),
                  margin: const EdgeInsets.only(
                    top: 10,
                    bottom: 10,
                    left: 20,
                    right: 20,
                  ),
                  decoration: BoxDecoration(
                      color: Color(0XFFD2FDFF),
                      // ignore: prefer_const_constructors
                      borderRadius: new BorderRadius.only(
                        bottomRight: const Radius.circular(51.0),
                        bottomLeft: const Radius.circular(51.0),
                        topLeft: const Radius.circular(51.0),
                        topRight: const Radius.circular(51.0),
                      )),
                  child: RichText(
                    textAlign: TextAlign.center,
                    text: const TextSpan(children: <TextSpan>[
                      TextSpan(
                          text:
                              "Calendrier",
                          style: TextStyle(
                            color: Color(0XFF303C6C),
                            fontSize: 24,
                          )),
                    ]),
                  ),
                ),
              ),

            
          ],
        ),
      ),
    );
  }
}