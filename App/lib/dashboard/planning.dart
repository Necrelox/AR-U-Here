// ignore_for_file: unnecessary_new
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import '../animation.dart';

class Planning extends StatelessWidget {
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
                child: Container(
                  width: double.infinity,
                  alignment: Alignment.center,
                  padding: EdgeInsets.fromLTRB(25,25,25,25),
                  margin: const EdgeInsets.only(
                    top: 40,
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
                              "Janvier 2021",
                          style: TextStyle(
                            color: Color(0XFF303C6C),
                            fontSize: 24,
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
                  padding: EdgeInsets.fromLTRB(25,100,25,100),
                  margin: const EdgeInsets.only(
                    top: 40,
                    bottom: 10,
                    left: 20,
                    right: 20,
                  ),
                  decoration: BoxDecoration(
                      color: Color(0XFFFBE8A6),
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
