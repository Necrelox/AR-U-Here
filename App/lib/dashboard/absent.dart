import 'package:flutter/material.dart';
import 'package:table_calendar/table_calendar.dart';
import '../animation.dart';

class Absent extends StatefulWidget {
  @override
  // ignore: library_private_types_in_public_api
  _PlanningState createState() => _PlanningState();
}

class _PlanningState extends State<Absent> {
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
    String dropdownValue = 'One';
    return Scaffold(
      backgroundColor: const Color(0XFFD2FDFF),
      body: SingleChildScrollView(
        child: Column(
          children: <Widget>[
            DelayAnimation(
              delay: 500,
              child: Container(
                width: double.infinity,
                alignment: Alignment.center,
              ),
            ),
            DelayAnimation(
              delay: 500,
              child: Container(
                width: double.infinity,
                alignment: Alignment.topLeft,
                padding: const EdgeInsets.fromLTRB(25, 10, 25, 0),
                margin: const EdgeInsets.only(
                  top: 70,
                  bottom: 10,
                  left: 20,
                  right: 20,
                ),
                child: RichText(
                    text: const TextSpan(
                  children: [
                    TextSpan(
                      text: "Justifier une absence",
                      style: TextStyle(
                        color: Color(0XFF303C6C),
                        fontSize: 22,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                )),
              ),
            ),
            DelayAnimation(
              delay: 500,
              child: Container(
                width: double.infinity,
                alignment: Alignment.topLeft,
                padding: const EdgeInsets.fromLTRB(25, 10, 25, 0),
                margin: const EdgeInsets.only(
                  top: 20,
                  bottom: 10,
                  left: 20,
                  right: 20,
                ),
                child: RichText(
                    text: const TextSpan(
                  children: [
                    TextSpan(
                      text:
                          "La demande de justificatif sera envoyé à un administrateur pour validation.",
                      style: TextStyle(
                        color: Color(0XFF303C6C),
                        fontSize: 15,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                )),
              ),
            ),
            DelayAnimation(
              delay: 500,
              child: Container(
                width: double.infinity,
                alignment: Alignment.topLeft,
                padding: const EdgeInsets.fromLTRB(25, 10, 25, 0),
                margin: const EdgeInsets.only(
                  top: 20,
                  bottom: 0,
                  left: 30,
                  right: 20,
                ),
                child: RichText(
                    text: const TextSpan(
                  children: [
                    TextSpan(
                      text: "Justification",
                      style: TextStyle(
                        color: Color(0XFF303C6C),
                        fontSize: 13,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                )),
              ),
            ),
            DelayAnimation(
              delay: 500,
              child: Container(
                margin: const EdgeInsets.only(
                  top: 10,
                  bottom: 10,
                  left: 50,
                  right: 50,
                ),
                decoration: const BoxDecoration(
                    color: Color(0XFFFBE8A6),
                    // ignore: prefer_const_constructors
                    borderRadius: BorderRadius.all(Radius.circular(10))),
                child: Row(
                  children: [
                    DropdownButton<String>(
                      value: dropdownValue,
                      icon: const Icon(Icons.arrow_downward),
                      elevation: 16,
                      style: const TextStyle(color: Colors.grey),
                      onChanged: (String? newValue) {
                        setState(() {
                          dropdownValue = newValue!;
                        });
                      },
                      items: <String>['One', 'Two', 'Free', 'Four']
                          .map<DropdownMenuItem<String>>((String value) {
                        return DropdownMenuItem<String>(
                          value: value,
                          child: Text(value),
                        );
                      }).toList(),
                    ),
                  ],
                ),
              ),
            ),
            DelayAnimation(
              delay: 500,
              child: Container(
                width: double.infinity,
                alignment: Alignment.topLeft,
                padding: const EdgeInsets.fromLTRB(25, 0, 25, 0),
                margin: const EdgeInsets.only(
                  top: 10,
                  bottom: 0,
                  left: 30,
                  right: 20,
                ),
                child: RichText(
                    text: const TextSpan(
                  children: [
                    TextSpan(
                      text: "Date de début",
                      style: TextStyle(
                        color: Color(0XFF303C6C),
                        fontSize: 13,
                      ),
                    ),
                  ],
                )),
              ),
            ),
            DelayAnimation(
              delay: 500,
              child: Container(
                padding: const EdgeInsets.only(left: 15, bottom: 5),
                margin: const EdgeInsets.only(
                  top: 10,
                  bottom: 10,
                  left: 50,
                  right: 50,
                ),
                decoration: const BoxDecoration(
                    color: Color(0XFFFBE8A6),
                    // ignore: prefer_const_constructors
                    borderRadius: BorderRadius.all(Radius.circular(10))),
                child: Row(
                  children: <Widget>[
                    Row(
                      children: const <Widget>[
                        SizedBox(width: 300, child: TextField()),
                      ],
                    )
                  ],
                ),
              ),
            ),
            DelayAnimation(
              delay: 500,
              child: Container(
                width: double.infinity,
                alignment: Alignment.topLeft,
                padding: const EdgeInsets.fromLTRB(25, 0, 25, 0),
                margin: const EdgeInsets.only(
                  top: 0,
                  bottom: 0,
                  left: 30,
                  right: 20,
                ),
                child: RichText(
                    text: const TextSpan(
                  children: [
                    TextSpan(
                      text: "Date de fin",
                      style: TextStyle(
                        color: Color(0XFF303C6C),
                        fontSize: 13,
                      ),
                    ),
                  ],
                )),
              ),
            ),
            DelayAnimation(
              delay: 500,
              child: Container(
                padding: const EdgeInsets.only(left: 15, bottom: 5),
                margin: const EdgeInsets.only(
                  top: 10,
                  bottom: 10,
                  left: 50,
                  right: 50,
                ),
                decoration: const BoxDecoration(
                    color: Color(0XFFFBE8A6),
                    // ignore: prefer_const_constructors
                    borderRadius: BorderRadius.all(Radius.circular(10))),
                child: Row(
                  children: <Widget>[
                    Row(
                      children: const <Widget>[
                        SizedBox(width: 300, child: TextField()),
                      ],
                    )
                  ],
                ),
              ),
            ),
            DelayAnimation(
              delay: 500,
              child: Container(
                width: double.infinity,
                alignment: Alignment.topLeft,
                padding: const EdgeInsets.fromLTRB(25, 10, 25, 0),
                margin: const EdgeInsets.only(
                  top: 10,
                  bottom: 0,
                  left: 30,
                  right: 20,
                ),
                child: RichText(
                    text: const TextSpan(
                  children: [
                    TextSpan(
                      text: "Document",
                      style: TextStyle(
                        color: Color(0XFF303C6C),
                        fontSize: 13,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                )),
              ),
            ),
            DelayAnimation(
              delay: 500,
              child: Container(
                padding: const EdgeInsets.only(left: 15, bottom: 0),
                margin: const EdgeInsets.only(
                  top: 10,
                  bottom: 0,
                  left: 50,
                  right: 50,
                ),
                decoration: const BoxDecoration(
                    color: Color(0XFFFBE8A6),
                    // ignore: prefer_const_constructors
                    borderRadius: BorderRadius.all(Radius.circular(10))),
                child: Row(
                  children: <Widget>[
                    Row(
                      children: const <Widget>[
                        SizedBox(width: 300, height: 150, child: TextField()),
                      ],
                    )
                  ],
                ),
              ),
            ),
            DelayAnimation(
              delay: 500,
              child: Container(
                width: double.infinity,
                alignment: Alignment.topLeft,
                padding: const EdgeInsets.fromLTRB(25, 0, 25, 0),
                margin: const EdgeInsets.only(
                  top: 10,
                  bottom: 0,
                  left: 30,
                  right: 20,
                ),
                child: RichText(
                    text: const TextSpan(
                  children: [
                    TextSpan(
                      text: "Ou importer un document",
                      style: TextStyle(
                        color: Color(0XFF303C6C),
                        fontSize: 13,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                )),
              ),
            ),

            DelayAnimation(
              delay: 500,
              child: Container(
                width: double.infinity,
                alignment: Alignment.center,
                margin: const EdgeInsets.only(top: 20),
                child: ElevatedButton(
                  style: ButtonStyle(
                    foregroundColor: MaterialStateProperty.all<Color>(const Color(0XFF303C6C)),
                    backgroundColor: MaterialStateProperty.all<Color>(const Color(0XFFF4976C)),
                    shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                      RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(18.0),
                        side: const BorderSide(color: Color.fromARGB(255, 171, 79, 37)),
                      )
                    )
                  ),
                  onPressed: () => {},
                  child: const Text(
                    "Envoyer",
                    style: TextStyle(fontSize: 16)
                  )
                )
              ),
            ),

            DelayAnimation(
              delay: 500,
              child: Container(
                width: double.infinity,
                alignment: Alignment.center,
                margin: const EdgeInsets.only(top: 20,),
                child: ElevatedButton(
                  style: ButtonStyle(
                    foregroundColor: MaterialStateProperty.all<Color>(const Color(0XFFF4976C)),
                    backgroundColor: MaterialStateProperty.all<Color>(const Color(0XFF303C6C)),
                    shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                      RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(18.0),
                        side: const BorderSide(color: Color.fromARGB(255, 171, 79, 37)),
                      )
                    )
                  ),
                  onPressed: () => {},
                  child: const Text(
                    "Annuler",
                    style: TextStyle(fontSize: 16)
                  )
                )
              ),
            ),
          ],
        ),
      ),
    );
  }
}
