import 'package:flutter/material.dart';
import 'package:table_calendar/table_calendar.dart';
import '../animation.dart';

class Planning extends StatefulWidget {
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
      backgroundColor: const Color(0XFFF4976C),
      appBar: AppBar(
        elevation: 0,
        centerTitle: false,
        actions: [
          Padding(
            padding: const EdgeInsets.fromLTRB(0, 0, 15, 5),
            child:
              ClipRRect(
                borderRadius: BorderRadius.circular(20), // Image border
                child: SizedBox.fromSize(
                  size: const Size.fromRadius(23),
                  child: Image.asset(
                    './asset/marin.jpg',
                    fit: BoxFit.cover,
                  ),
                ),
              ) 
          ),
        ],
        title: const Text(
          "Planning",
          style: TextStyle(
            color: Color(0XFFFBE8A6),
            fontSize: 28.0,
            fontWeight: FontWeight.bold),
          ),
        backgroundColor: const Color(0XFFF4976C),
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
                padding: const EdgeInsets.fromLTRB(25,10,25,0),
                decoration: const BoxDecoration(
                color: Color(0XFFFBE8A6),
                // ignore: prefer_const_constructors
                borderRadius: BorderRadius.only(
                  bottomRight: Radius.circular(51.0),
                  bottomLeft: Radius.circular(51.0),
                  topLeft: Radius.circular(51.0),
                  topRight: Radius.circular(51.0),
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
                    color: const Color(0XFFD2FDFF),
                    shape: BoxShape.rectangle,
                    borderRadius: BorderRadius.circular(5.0),
                  ),
                  selectedTextStyle: const TextStyle(color: Colors.black),
                  todayDecoration: BoxDecoration(
                    color: const Color(0XFFB4DFE5),
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
                  padding: const EdgeInsets.fromLTRB(25,10,25,0),
                  margin: const EdgeInsets.only(
                    top: 0,
                    bottom: 0,
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
                margin: const EdgeInsets.only(
                  top: 10,
                  bottom: 10,
                  left: 20,
                  right: 20,
                ),
                decoration: const BoxDecoration(
                    color: Color(0XFFD2FDFF),
                    // ignore: prefer_const_constructors
                    borderRadius: BorderRadius.only(
                      bottomRight: Radius.circular(51.0),
                      bottomLeft: Radius.circular(51.0),
                      topLeft: Radius.circular(51.0),
                      topRight: Radius.circular(51.0),
                    )),
                child: Column(children: <Widget>[
                  Container(
                    margin: const EdgeInsets.fromLTRB(20, 20, 20, 5),
                    child: Table(  
                      children: [
                        TableRow( children: [
                          Column(children:const [Text('Heure', style: TextStyle(fontSize: 20.0))]),  
                          Column(children:const [Text('Cours', style: TextStyle(fontSize: 20.0))]),  
                          Column(children:const [Text('Salle', style: TextStyle(fontSize: 20.0))]),  
                          Column(children:const [Text('Prof.', style: TextStyle(fontSize: 20.0))]),  
                        ]),
                      ],
                    ),
                  ),

                  Container(  
                    padding: const EdgeInsets.all(20),
                    child: Table(  
                      children: [ 
                        TableRow( children: [  
                          Column(children:const [Text('9h')]),  
                          Column(children:const [Text('E.P.S')]),  
                          Column(children:const [Text('Gymnase')]),  
                          Column(children:const [Text('Mr. Sarde')]),  
                        ]),  
                        TableRow( children: [  
                          Column(children:const [Text('12h')]),  
                          Column(children:const [Text('Repas')]),  
                          Column(children:const [Text('Cantine')]),  
                          Column(children:const [Text('Mr. Brun')]),  
                        ]),  
                        TableRow( children: [  
                          Column(children:const [Text('13h')]),  
                          Column(children:const [Text('S.V.T.')]),  
                          Column(children:const [Text('Math')]),  
                          Column(children:const [Text('Mr. Rose')]),  
                        ]),  
                      ],  
                    ),  
                  ), 
                ])  
              ),
            ),
          ],
        ),
      ),
    );
  }
}