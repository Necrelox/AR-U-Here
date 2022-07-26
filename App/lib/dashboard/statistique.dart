import 'package:flutter/material.dart';
import '../animation.dart';
import '../components/appbar.dart';
import '../components/navbar.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:fl_chart/fl_chart.dart';
import '../myapp.dart';

import 'absent.dart';

Widget _graph_fl(BuildContext context) {
return Stack(
      children: <Widget>[
        AspectRatio(
          aspectRatio: 1.70,
          child: SizedBox(
            child: Padding(
              padding: const EdgeInsets.only(
                 left: 12.0, top: 24, bottom: 12),
              child: LineChart(
                mainData(),
              ),
            ),
          ),
        ),
      ],
    );
  }

Widget bottomTitleWidgets(double value, TitleMeta meta) {
  var style = TextStyle(
    color: MyApp.tertiaryColor,
    fontWeight: FontWeight.bold,
    fontSize: 16,
  );
  Widget text;
  switch (value.toInt()) {
    case 1:
      text = Text('Lun', style: style);
      break;
    case 3:
      text = Text('Mar', style: style);
      break;
    case 5:
      text = Text('Mer', style: style);
      break;
    case 7:
      text = Text('Jeu', style: style);
      break;
    case 9:
      text = Text('Ven', style: style);
      break;
    default:
      text = Text('', style: style);
      break;
  }

  return SideTitleWidget(
    axisSide: meta.axisSide,
    space: 8.0,
    child: text,
  );
}

Widget leftTitleWidgets(double value, TitleMeta meta) {
  var style = TextStyle(
    color: MyApp.tertiaryColor,
    fontWeight: FontWeight.bold,
    fontSize: 15,
  );
  String text;
  switch (value.toInt()) {
    case 1:
      text = '1';
      break;
    case 3:
      text = '4';
      break;
    case 5:
      text = '8';
      break;
    default:
      return Container();
  }

  return Text(text, style: style, textAlign: TextAlign.left);
}

LineChartData mainData() {
    return LineChartData(
      gridData: FlGridData(
        show: true,
        drawVerticalLine: true,
        horizontalInterval: 1,
        verticalInterval: 1,
        getDrawingHorizontalLine: (value) {
          return FlLine(
            color: MyApp.quaternaryColor,
            strokeWidth: 1,
          );
        },
        getDrawingVerticalLine: (value) {
          return FlLine(
            color: MyApp.quaternaryColor,
            strokeWidth: 1,
          );
        },
      ),
      titlesData: FlTitlesData(
        show: true,
        rightTitles: AxisTitles(
          sideTitles: SideTitles(showTitles: false),
        ),
        topTitles: AxisTitles(
          sideTitles: SideTitles(showTitles: false),
        ),
        bottomTitles: AxisTitles(
          sideTitles: SideTitles(
            showTitles: true,
            reservedSize: 30,
            interval: 1,
            getTitlesWidget: bottomTitleWidgets,
          ),
        ),
        leftTitles: AxisTitles(
          sideTitles: SideTitles(
            showTitles: true,
            interval: 1,
            getTitlesWidget: leftTitleWidgets,
            reservedSize: 42,
          ),
        ),
      ),
      borderData: FlBorderData(
          show: true,
          border: Border.all(color: MyApp.quaternaryColor, width: 1)),
      minX: 0,
      maxX: 11,
      minY: 0,
      maxY: 6,
      lineBarsData: [
        LineChartBarData(
          spots: const [
            FlSpot(0, 3),
            FlSpot(2.6, 2),
            FlSpot(4.9, 5),
            FlSpot(6.8, 3.1),
            FlSpot(8, 4),
            FlSpot(9.5, 3),
            FlSpot(11, 4),
          ],
          isCurved: true,
          barWidth: 5,
          isStrokeCapRound: true,
          dotData: FlDotData(
            show: false,
          ),
        ),
      ],
    );
  }

Widget _graph(BuildContext context) {
return(
  Center(
    child: Padding(
      padding: const EdgeInsets.only(top: 25),
      child: Align(
        alignment: Alignment.topCenter,
        child: Container(
          width: MediaQuery.of(context).size.width * 0.85,
          height: MediaQuery.of(context).size.height * 0.25,
          alignment: const Alignment(0.0, -1.0),
          //BoxDecoration Widget
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(51),
            color: MyApp.primaryColor,
          ), //BoxDecoration
          child: Padding(
            padding: const EdgeInsets.only(top: 20),
            child: Align(
              alignment: Alignment.topCenter,
              child: Stack(
                children: <Widget>[
                  Align(
                    alignment: Alignment.topCenter,
                  child: Text(
                    'Absence(s) du mois',
                    style: TextStyle(
                      color: MyApp.tertiaryColor,
                      fontSize: 12,
                      fontWeight: FontWeight.bold,
                    ),
                    textAlign: TextAlign.center,
                  ),
                  ),
                  _graph_fl(context),
                ],
              ),
            ),
          )
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
      padding: const EdgeInsets.only(top: 6),
      child: Align(
        alignment: Alignment.topCenter,
          child: RichText(
            textAlign: TextAlign.right,
            text: TextSpan(
              text: "Pendant les 3 derniers mois...",
              style: TextStyle(
                color: MyApp.primaryColor,
                fontSize: 15,
                fontWeight: FontWeight.bold,
              )),
          ),
        ),
    )
  )
);
}

Widget _card1(BuildContext context) {
return(
  Center(
    child: Padding(
      padding: const EdgeInsets.only(top: 25),
      child: Container(
        alignment: const Alignment(0.0, -1.0),
        //BoxDecoration Widget
        child: Padding(
          padding: const EdgeInsets.all(0.0),
          child: IntrinsicHeight(
          // ignore: unnecessary_new
            child: new Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: <Widget>[
                Container(
                  width: MediaQuery.of(context).size.width * 0.4,
                  height: MediaQuery.of(context).size.height * 0.14,
                  padding: const EdgeInsets.all(10.0),
                  alignment: const Alignment(0.0, -1.0),
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(51),
                    color: MyApp.primaryColor,
                  ),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: <Widget>[
                      Align(
                        alignment: Alignment.center,
                        child: RichText(
                          textAlign: TextAlign.center,
                          text: TextSpan(children: <TextSpan>[
                            TextSpan(
                                text: 'Total Session(s)\n',
                                style: TextStyle(
                                  color: MyApp.quinaryColor,
                                  fontWeight: FontWeight.bold,
                                  fontSize: 15,
                                )), 
                            TextSpan(
                                text: '500 ',
                                style: TextStyle(
                                  color: MyApp.quinaryColor,
                                  fontWeight: FontWeight.bold,
                                  fontSize: 20,
                                )),
                                
                          ]),
                        ),
                      ),
                    ]), //BoxDecoration
                ),
                Container(
                  width: MediaQuery.of(context).size.width * 0.4,
                  height: MediaQuery.of(context).size.height * 0.14,
                  padding: const EdgeInsets.all(10.0),
                  alignment: const Alignment(0.0, -1.0),
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(51),
                    color: MyApp.quaternaryColor,
                  ),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: <Widget>[
                      RichText(
                        textAlign: TextAlign.center,
                        text: TextSpan(children: <TextSpan>[
                          TextSpan(
                              text: 'Présence(s)\n',
                              style: TextStyle(
                                color: MyApp.primaryColor,
                                fontWeight: FontWeight.bold,
                                fontSize: 15,
                              )),
                          TextSpan(
                              text: '45',
                              style: TextStyle(
                                color: MyApp.primaryColor,
                                fontWeight: FontWeight.bold,
                                fontSize: 20,
                              )),
                        ]),
                      ),
                    ]), //BoxDecoration
                ),
              ],
            )
          )
        ),
      ),
    )
  )
);
}

Widget _card2(BuildContext context) {
return(
  Center(
    child: Padding(
      padding: const EdgeInsets.fromLTRB(0, 25, 0, 50),
      child: Container(
        alignment: const Alignment(0.0, -1.0),
        //BoxDecoration Widget
        child: Padding(
          padding: const EdgeInsets.all(0.0),
          child: IntrinsicHeight(
          // ignore: unnecessary_new
            child: new Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: <Widget>[
                Container(
                  width: MediaQuery.of(context).size.width * 0.4,
                  height: MediaQuery.of(context).size.height * 0.14,
                  padding: const EdgeInsets.all(10.0),
                  alignment: const Alignment(0.0, -1.0),
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(51),
                    color: MyApp.quinaryColor,
                  ),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: <Widget>[
                      RichText(
                        textAlign: TextAlign.center,
                        text: TextSpan(children: <TextSpan>[
                          TextSpan(
                              text: 'Absences justifiée(s)\n',
                              style: TextStyle(
                                color: MyApp.primaryColor,
                                fontWeight: FontWeight.bold,
                                fontSize: 15,
                              )),
                          TextSpan(
                              text: '2',
                              style: TextStyle(
                                color: MyApp.primaryColor,
                                fontWeight: FontWeight.bold,
                                fontSize: 20,
                              )),
                        ]),
                      ),
                    ]), //BoxDecoration
                ),
                Container(
                  width: MediaQuery.of(context).size.width * 0.4,
                  height: MediaQuery.of(context).size.height * 0.14,
                  padding: const EdgeInsets.all(10.0),
                  alignment: const Alignment(0.0, -1.0),
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(51),
                    color: MyApp.secondaryColor,
                  ),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: <Widget>[
                      RichText(
                        textAlign: TextAlign.center,
                        text: TextSpan(children: <TextSpan>[
                          TextSpan(
                              text: 'Absence(s)\n',
                              style: TextStyle(
                                color: MyApp.primaryColor,
                                fontWeight: FontWeight.bold,
                                fontSize: 15,
                              )),
                          TextSpan(
                              text: '5',
                              style: TextStyle(
                                color: MyApp.primaryColor,
                                fontWeight: FontWeight.bold,
                                fontSize: 20,
                              )),
                        ]),
                      ),
                    ]), //BoxDecoration
                ),
              ],
            )
          )
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
          alignment: const Alignment(0.0, -1.0),
          width: 250,
          child: ElevatedButton(
              style: ElevatedButton.styleFrom(
                primary: MyApp.secondaryColor,
                shape: const StadiumBorder(),
                padding: const EdgeInsets.all(14),
              ),
              child: Text(
                "Justifier une absence",
                style: GoogleFonts.poppins(
                  color: MyApp.primaryColor,
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                ),
              ),
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => Absent(),
                  ),
                );
              }),
        ))
    )
  );
}

class Statistique extends StatelessWidget {
  const Statistique({Key? key}) : super(key: key);


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: MyApp.tertiaryColor,
      bottomNavigationBar: const NavbarDemo(),
      appBar: PreferredSize(
        preferredSize: const Size.fromHeight(50),
        child: ApplicationBar(
          color:  MyApp.tertiaryColor,
          asset: 'asset/marin.jpg', 
          title: 'Statistiques',
          titleColor: MyApp.primaryColor,
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
                      _card1(context),
                      _card2(context),
                      _absence(context),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}