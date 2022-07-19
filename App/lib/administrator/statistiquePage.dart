import 'package:flutter/material.dart';
import '../animation.dart';
import '../welcome_page.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:fl_chart/fl_chart.dart';

Widget _graph_fl(BuildContext context) {
return Stack(
      children: <Widget>[
        AspectRatio(
          aspectRatio: 1.70,
          child: Container(
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
    const style = TextStyle(
      color: Color(0xffFBE8A6),
      fontWeight: FontWeight.bold,
      fontSize: 16,
    );
    Widget text;
    switch (value.toInt()) {
      case 1:
        text = const Text('Lun', style: style);
        break;
      case 3:
        text = const Text('Mar', style: style);
        break;
      case 5:
        text = const Text('Mer', style: style);
        break;
      case 7:
        text = const Text('Jeu', style: style);
        break;
      case 9:
        text = const Text('Ven', style: style);
        break;
      default:
        text = const Text('', style: style);
        break;
    }

    return SideTitleWidget(
      axisSide: meta.axisSide,
      space: 8.0,
      child: text,
    );
  }

  Widget leftTitleWidgets(double value, TitleMeta meta) {
    const style = TextStyle(
      color: Color(0xffFBE8A6),
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
            color: const Color(0xffB4DFE5),
            strokeWidth: 1,
          );
        },
        getDrawingVerticalLine: (value) {
          return FlLine(
            color: const Color(0xffB4DFE5),
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
          border: Border.all(color: const Color(0xffB4DFE5), width: 1)),
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
      padding: EdgeInsets.fromLTRB(0, 25, 0, 0),
      child: Align(
        alignment: Alignment.topCenter,
        child: Container(
          width: MediaQuery.of(context).size.width * 0.85,
          height: MediaQuery.of(context).size.height * 0.25,
          alignment: Alignment(0.0, -1.0),
          //BoxDecoration Widget
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(51),
            color: Color(0xFF303C6C),
          ), //BoxDecoration
          child: Padding(
            padding: const EdgeInsets.only(top: 20),
            child: Align(
              alignment: Alignment.topCenter,
              child: Stack(
                children: <Widget>[
                  const Align(
                    alignment: Alignment.topCenter,
                  child: Text(
                    'Absence(s) du mois',
                    style: TextStyle(
                      color: Color(0xFFFBE8A6),
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

Widget _card1(BuildContext context) {
return(
  Center(
    child: Padding(
      padding: EdgeInsets.fromLTRB(0, 25, 0, 0),
      child: Container(
        alignment: Alignment(0.0, -1.0),
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
                  alignment: Alignment(0.0, -1.0),
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(51),
                    color: Color(0xFF303C6C),
                  ),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: <Widget>[
                      Align(
                        alignment: Alignment.center,
                        child: RichText(
                          textAlign: TextAlign.center,
                          text: const TextSpan(children: <TextSpan>[
                            TextSpan(
                                text: 'Total Session(s)\n',
                                style: TextStyle(
                                  color: Color(0xFFD2FDFF),
                                  fontWeight: FontWeight.bold,
                                  fontSize: 15,
                                )), 
                            TextSpan(
                                text: '500 ',
                                style: TextStyle(
                                  color: Color(0xFFD2FDFF),
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
                  alignment: Alignment(0.0, -1.0),
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(51),
                    color: Color(0xFFB4DFE5),
                  ),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: <Widget>[
                      RichText(
                        textAlign: TextAlign.center,
                        text: const TextSpan(children: <TextSpan>[
                          TextSpan(
                              text: 'Présence(s)\n',
                              style: TextStyle(
                                color: Color(0xFF303C6C),
                                fontWeight: FontWeight.bold,
                                fontSize: 15,
                              )),
                          TextSpan(
                              text: '45',
                              style: TextStyle(
                                color: Color(0xFF303C6C),
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
      padding: EdgeInsets.fromLTRB(0, 25, 0, 50),
      child: Container(
        alignment: Alignment(0.0, -1.0),
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
                  alignment: Alignment(0.0, -1.0),
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(51),
                    color: Color(0xFFD2FDFF),
                  ),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: <Widget>[
                      RichText(
                        textAlign: TextAlign.center,
                        text: const TextSpan(children: <TextSpan>[
                          TextSpan(
                              text: 'Absences justifiée(s)\n',
                              style: TextStyle(
                                color: Color(0xFF303C6C),
                                fontWeight: FontWeight.bold,
                                fontSize: 15,
                              )),
                          TextSpan(
                              text: '2',
                              style: TextStyle(
                                color: Color(0xFF303C6C),
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
                  alignment: Alignment(0.0, -1.0),
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(51),
                    color: Color(0xFFF4976C),
                  ),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: <Widget>[
                      RichText(
                        textAlign: TextAlign.center,
                        text: const TextSpan(children: <TextSpan>[
                          TextSpan(
                              text: 'Absence(s)\n',
                              style: TextStyle(
                                color: Color(0xFF303C6C),
                                fontWeight: FontWeight.bold,
                                fontSize: 15,
                              )),
                          TextSpan(
                              text: '5',
                              style: TextStyle(
                                color: Color(0xFF303C6C),
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
      appBar: AppBar(
        centerTitle: false,
        elevation: 0,
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
          "Statistiques",
          style: TextStyle(
            color: Color(0XFF303C6C),
            fontSize: 28.0,
            fontWeight: FontWeight.bold),
          ),
        backgroundColor: const Color(0xFFFBE8A6),
        automaticallyImplyLeading: false,
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
    ));
  }
}