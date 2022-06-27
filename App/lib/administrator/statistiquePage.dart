import 'package:flutter/material.dart';
import '../animation.dart';
import '../welcome_page.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

Widget _graph(BuildContext context) {
return(
  Center(
    child: Align(
      alignment: Alignment.topCenter,
      child: Container(
        width: 480,
        height: 300,
        alignment: Alignment(0.0, -1.0),
        //BoxDecoration Widget
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(51),
          color: Color(0xFF303C6C),
        ), //BoxDecoration
        child: Padding(
          padding: const EdgeInsets.all(25.0),
          child: Align(
            alignment: Alignment.topLeft,
            child: RichText(
              textAlign: TextAlign.right,
              text: const TextSpan(
                text: "Absences du mois",
                style: TextStyle(
                  color: Color(0xFFFBE8A6),
                  fontSize: 22,
                )),
            ),
          ),
        ),
      ),
    ),
  )
);
}

Widget _text(BuildContext context) {
return(
  Center(
    child: Padding(
      padding: EdgeInsets.fromLTRB(0, 6, 0, 0),
      child: Align(
        alignment: Alignment.topCenter,
          child: RichText(
            textAlign: TextAlign.right,
            text: const TextSpan(
              text: "Pendant les 3 derniers mois...",
              style: TextStyle(
                color: Color(0xff303C6C),
                fontSize: 15,
                fontWeight: FontWeight.bold,
              )),
          ),
        ),
    )
  )
);
}

Widget _card(BuildContext context) {
return(
  Center(
    child: Padding(
        padding: EdgeInsets.fromLTRB(0, 50, 0, 50),
      child: Container(
        width: 480,
        height: 300,
        alignment: Alignment(0.0, -1.0),
        //BoxDecoration Widget

        child: Padding(
          padding: const EdgeInsets.all(25.0),
         child: IntrinsicHeight(
        child: new Row(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      children: <Widget>[
        Container(
        width: 200,
        height: 100,
          child: Text("Total Sessions", style: TextStyle(fontSize: 15)),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(51),
          color: Color(0xFF303C6C),
        ), //BoxDecoration
        ),
        Container(
        width: 200,
        height: 100,
          child: Text("Présences", style: TextStyle(fontSize: 15)), 
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(51),
          color: Color(0xFFB4DFE5),
        ), //BoxDecoration
        ),
      ],
    ))
        ),
      ),
    )
  )
);
}

Widget _absence(BuildContext context) {
return(
  DelayAnimation(
      delay: 1500,
      child: Align(
        alignment: Alignment.bottomCenter,
        child: Container(
          alignment: Alignment(0.0, -1.0),
          width: 250,
          child: ElevatedButton(
              style: ElevatedButton.styleFrom(
                primary: Color(0XFFF4976C),
                shape: StadiumBorder(),
                padding: EdgeInsets.all(14),
              ),
              child: Text(
                "Justifier une absence",
                style: GoogleFonts.poppins(
                  color: Color(0XFF303C6C),
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                ),
              ),
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => statistiquePage(),
                  ),
                );
              }),
        ))
    )
  );
}

class statistiquePage extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Statistique',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(scaffoldBackgroundColor: const Color(0xFFFBE8A6)),
      home: Scaffold(
      appBar: PreferredSize(
          preferredSize: Size.fromHeight(100.0),
          child: AppBar(
            elevation: 0,
            backgroundColor: Color(0xFFFBE8A6),
            centerTitle: false,
            actions: [
              IconButton(
                icon: Image.asset('asset/logo.png'),
                padding: const EdgeInsets.fromLTRB(0.0, 0.0, 0.0, 0.0),
                onPressed: () => const WelcomePage(),
                iconSize: 55,
              ),
            ],
          title: const Text(
            'Statistiques',
            style: TextStyle(color: Color(0xff303C6C), fontWeight: FontWeight.bold, fontSize: 36),
          ),
        ),
      ),
      body: Stack(
        children: <Widget>[
          SizedBox(
            height: double.infinity,
            child: SingleChildScrollView(
              physics: const AlwaysScrollableScrollPhysics(),
              child: Column(
                children: <Widget>[
                  Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: <Widget>[
                      _graph(context),
                      _text(context),
                      _card(context),
                      _absence(context),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    ));
  }
}