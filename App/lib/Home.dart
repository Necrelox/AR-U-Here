import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'api/api.dart';

class Home extends StatefulWidget {
  const Home({Key? key}) : super(key: key);
  @override
  Home_state createState() => Home_state();
}

class Home_state extends State<Home> {
  Widget navBar() {
    return AppBar(
      centerTitle: false,
      actions: [
        Padding(
            padding: const EdgeInsets.fromLTRB(0, 0, 15, 5),
            child: ClipRRect(
              borderRadius: BorderRadius.circular(20), // Image border
              child: SizedBox.fromSize(
                size: const Size.fromRadius(28),
                child: Image.asset(
                  './asset/logo.png',
                  fit: BoxFit.cover,
                ),
              ),
            )),
      ],
      backgroundColor: const Color(0xFF3F74B0),
      automaticallyImplyLeading: false,
    );
  }

  Widget helloBox() {
    return (Stack(children: const <Widget>[
      Padding(
        padding: EdgeInsets.only(top: 100.0, left: 50),
        child: Text("Hello Marin !",
            style: TextStyle(
              color: Color(0XFFFBE8A6),
              fontFamily: 'OpenSans',
              fontSize: 30.0,
              fontWeight: FontWeight.bold,
            )),
      ),
      Padding(
        padding: EdgeInsets.only(top: 140, left: 50),
        child: Text("Hello Marin !",
            style: TextStyle(
              color: Color(0XFFFBE8A6),
              fontFamily: 'OpenSans',
              fontSize: 10.0,
              fontWeight: FontWeight.bold,
            )),
      ),
    ]));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: const Color(0XFF303C6C),
        body: Stack(
          children: <Widget>[
            navBar(),
            helloBox(),
          ],
        ));
  }
}
