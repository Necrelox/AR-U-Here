import 'package:flutter/material.dart';
import 'package:flutter_application_1/dashboard/statistique.dart';
import '../animation.dart';
import 'package:datetime_picker_formfield/datetime_picker_formfield.dart';
import 'package:intl/intl.dart';
import 'package:file_picker/file_picker.dart';
import '../myapp.dart';

class Absent extends StatefulWidget {
  @override
  // ignore: library_private_types_in_public_api
  _PlanningState createState() => _PlanningState();
}

class _PlanningState extends State<Absent> {
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

  List<DropdownMenuItem<String>> get dropdownItems {
    List<DropdownMenuItem<String>> menuItems = [
      const DropdownMenuItem(
          value: "Sélectionner", child: Text("Sélectionner")),
      const DropdownMenuItem(value: "Maladie", child: Text("Maladie")),
      const DropdownMenuItem(
          value: "Motif familial", child: Text("Motif familial")),
      const DropdownMenuItem(value: "Autres", child: Text("Autres")),
    ];
    return menuItems;
  }

  final format = DateFormat("yyyy-MM-dd HH:mm");

  String selectedValue = "Sélectionner";
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: MyApp.quinaryColor,
      body: SingleChildScrollView(
        child: Column(
          children: <Widget>[
            DelayAnimation(
              delay: 500,
              child: Container(
                width: double.infinity,
                alignment: Alignment.topLeft,
                padding: const EdgeInsets.fromLTRB(25, 10, 25, 0),
                margin: const EdgeInsets.only(
                  top: 60,
                  bottom: 10,
                  left: 20,
                  right: 20,
                ),
                child: RichText(
                    text: TextSpan(
                  children: [
                    TextSpan(
                      text: "Justifier une absence",
                      style: TextStyle(
                        color: MyApp.primaryColor,
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
                  top: 15,
                  bottom: 0,
                  left: 20,
                  right: 20,
                ),
                child: RichText(
                    text: TextSpan(
                  children: [
                    TextSpan(
                      text:
                          "La demande de justificatif sera envoyé à un administrateur pour validation.",
                      style: TextStyle(
                        color: MyApp.primaryColor,
                        fontSize: 14,
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
                  top: 10,
                  bottom: 0,
                  left: 30,
                  right: 20,
                ),
                child: RichText(
                    text: TextSpan(
                  children: [
                    TextSpan(
                      text: "Justification",
                      style: TextStyle(
                        color: MyApp.primaryColor,
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
                padding: const EdgeInsets.fromLTRB(10, 0, 10, 0),
                decoration: BoxDecoration(
                    color: MyApp.tertiaryColor,
                    // ignore: prefer_const_constructors
                    borderRadius: BorderRadius.all(Radius.circular(10))),
                child: DropdownButton<String>(
                  value: selectedValue,
                  icon: const Icon(Icons.arrow_downward),
                  isExpanded: true,
                  elevation: 16,
                  style: TextStyle(color: MyApp.primaryColor),
                  underline: const SizedBox(),
                  onChanged: (String? newValue) {
                    setState(() {
                      selectedValue = newValue!;
                    });
                  },
                  items: dropdownItems,
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
                    text: TextSpan(
                  children: [
                    TextSpan(
                      text: "Date de début",
                      style: TextStyle(
                        color: MyApp.primaryColor,
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
                padding: const EdgeInsets.all(10),
                margin: const EdgeInsets.only(
                  top: 10,
                  bottom: 10,
                  left: 50,
                  right: 50,
                ),
                decoration: BoxDecoration(
                    color: MyApp.tertiaryColor,
                    // ignore: prefer_const_constructors
                    borderRadius: BorderRadius.all(Radius.circular(10))),
                child: Column(children: <Widget>[
                  DateTimeField(
                    format: format,
                    decoration: const InputDecoration.collapsed(
                      hintText: "Choisir une date de début",
                      border: InputBorder.none,
                    ),
                    onShowPicker: (context, currentValue) async {
                      final date = await showDatePicker(
                          context: context,
                          firstDate: DateTime(1900),
                          initialDate: currentValue ?? DateTime.now(),
                          lastDate: DateTime(2100));
                      if (date != null) {
                        final time = await showTimePicker(
                          context: context,
                          initialTime: TimeOfDay.fromDateTime(
                              currentValue ?? DateTime.now()),
                        );
                        return DateTimeField.combine(date, time);
                      } else {
                        return currentValue;
                      }
                    },
                  ),
                ]),
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
                    text: TextSpan(
                  children: [
                    TextSpan(
                      text: "Date de fin",
                      style: TextStyle(
                        color: MyApp.primaryColor,
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
                padding: const EdgeInsets.all(10),
                margin: const EdgeInsets.only(
                  top: 10,
                  bottom: 10,
                  left: 50,
                  right: 50,
                ),
                decoration: BoxDecoration(
                    color: MyApp.tertiaryColor,
                    // ignore: prefer_const_constructors
                    borderRadius: BorderRadius.all(Radius.circular(10))),
                child: Column(children: <Widget>[
                  DateTimeField(
                    format: format,
                    decoration: const InputDecoration.collapsed(
                      hintText: "Choisir une date de fin",
                      border: InputBorder.none,
                    ),
                    onShowPicker: (context, currentValue) async {
                      final date = await showDatePicker(
                          context: context,
                          firstDate: DateTime(1900),
                          initialDate: currentValue ?? DateTime.now(),
                          lastDate: DateTime(2100));
                      if (date != null) {
                        final time = await showTimePicker(
                          context: context,
                          initialTime: TimeOfDay.fromDateTime(
                              currentValue ?? DateTime.now()),
                        );
                        return DateTimeField.combine(date, time);
                      } else {
                        return currentValue;
                      }
                    },
                  ),
                ]),
              ),
            ),
            DelayAnimation(
              delay: 500,
              child: Container(
                width: double.infinity,
                alignment: Alignment.topLeft,
                padding: const EdgeInsets.fromLTRB(25, 10, 25, 0),
                margin: const EdgeInsets.only(
                  top: 0,
                  bottom: 0,
                  left: 30,
                  right: 20,
                ),
                child: RichText(
                    text: TextSpan(
                  children: [
                    TextSpan(
                      text: "Commentaire",
                      style: TextStyle(
                        color: MyApp.primaryColor,
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
                  left: 40,
                  right: 40,
                ),
                decoration: BoxDecoration(
                    color: MyApp.tertiaryColor,
                    // ignore: prefer_const_constructors
                    borderRadius: BorderRadius.all(Radius.circular(10))),
                child: Row(
                  children: <Widget>[
                    Row(
                      children: const <Widget>[
                        SizedBox(
                          width: 250,
                          height: 150,
                          child: TextField(
                            keyboardType: TextInputType.multiline,
                            textInputAction: TextInputAction.newline,
                            minLines: 1,
                            maxLines: 6,
                            decoration: InputDecoration(
                                border: InputBorder.none,
                                focusedBorder: InputBorder.none,
                                enabledBorder: InputBorder.none,
                                errorBorder: InputBorder.none,
                                disabledBorder: InputBorder.none,
                                hintText: "À compléter..."),
                          ),
                        ),
                      ],
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
                child: InkWell(
                    onTap: () async {
                      final result = await FilePicker.platform.pickFiles();
                    },
                    child: Text(
                      'Importer un document',
                      style: TextStyle(
                        color: MyApp.primaryColor,
                        fontSize: 11,
                        fontWeight: FontWeight.bold,
                      ),
                    )),
              ),
            ),
            DelayAnimation(
              delay: 500,
              child: Container(
                margin: const EdgeInsets.only(top: 20),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: <Widget>[
                    ElevatedButton(
                        style: ButtonStyle(
                            foregroundColor: MaterialStateProperty.all<Color>(
                                MyApp.primaryColor),
                            backgroundColor: MaterialStateProperty.all<Color>(
                                MyApp.secondaryColor),
                            shape: MaterialStateProperty.all<
                                RoundedRectangleBorder>(RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(18.0),
                            ))),
                        onPressed: () => {
                              Navigator.push(
                                context,
                                MaterialPageRoute(
                                  builder: (context) => const Statistique(),
                                ),
                              )
                            },
                        child: const Text("Envoyer",
                            style: TextStyle(fontSize: 16))),
                    ElevatedButton(
                        style: ButtonStyle(
                            foregroundColor: MaterialStateProperty.all<Color>(
                                MyApp.secondaryColor),
                            backgroundColor: MaterialStateProperty.all<Color>(
                                MyApp.primaryColor),
                            shape: MaterialStateProperty.all<
                                RoundedRectangleBorder>(RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(18.0),
                            ))),
                        onPressed: () => {
                              Navigator.push(
                                context,
                                MaterialPageRoute(
                                  builder: (context) => const Statistique(),
                                ),
                              )
                            },
                        child: const Text("Annuler",
                            style: TextStyle(fontSize: 16))),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
