import 'package:flutter/material.dart';
import '../animation.dart';
import 'package:datetime_picker_formfield/datetime_picker_formfield.dart';
import 'package:intl/intl.dart';
import 'package:file_picker/file_picker.dart';

class ChoicePresence extends StatefulWidget {
  @override
  // ignore: library_private_types_in_public_api
  _ChoicePresenceState createState() => _ChoicePresenceState();
}

class _ChoicePresenceState extends State<ChoicePresence> {
  @override
  void initState() {
    super.initState();
  }

  Widget button(color, text) {
    return SizedBox(
      width: double.infinity,
      height: MediaQuery.of(context).size.height * 0.05,
      child: ElevatedButton(
          style: ButtonStyle(
              foregroundColor:
                  MaterialStateProperty.all<Color>(const Color(0XFF303C6C)),
              backgroundColor:
                  MaterialStateProperty.all<Color>(Color(color)),
              shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                  RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(30.0),
              ))),
          onPressed: () => {},
          child: Text(text,
              style: TextStyle(fontSize: 17, fontWeight: FontWeight.w700))),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      color: const Color(0XFFD2FDFF),
      width: double.infinity,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: <Widget>[
          DelayAnimation(
            delay: 500,
            child: Container(
              alignment: Alignment.centerLeft,
              width: MediaQuery.of(context).size.width * 0.9,
              height: MediaQuery.of(context).size.height * 0.30,
              child: RichText(
                  text: const TextSpan(
                children: [
                  TextSpan(
                    text: "Choix de présence",
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
              height: MediaQuery.of(context).size.height * 0.3,
              width: MediaQuery.of(context).size.width * 0.7,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: <Widget>[
                  button(0XFF29E8C5, "Scanner les élèves"),
                  button(0XFF42F5A0, "Faire signer un élève"),
                  button(0XFF42F5A0, "Contacter un parent d'élève"),
                ],
              ),
            ),
          ),
          DelayAnimation(
            delay: 500,
            child: Container(
              width: MediaQuery.of(context).size.width * 0.7,
              height: MediaQuery.of(context).size.height * 0.3,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.end,
                children: <Widget>[
                  ElevatedButton(
                      style: ButtonStyle(
                          foregroundColor: MaterialStateProperty.all<Color>(
                              const Color(0XFFF4976C)),
                          backgroundColor: MaterialStateProperty.all<Color>(
                              const Color(0XFF303C6C)),
                          shape:
                              MaterialStateProperty.all<RoundedRectangleBorder>(
                                  RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(18.0),
                          ))),
                      onPressed: () => {},
                      child: const Text("Annuler",
                          style: TextStyle(fontSize: 16))),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
