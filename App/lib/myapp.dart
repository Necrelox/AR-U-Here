import 'package:flutter/material.dart';
import 'welcome_page.dart';

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  static Color primaryColor = const Color(0XFF303C6C);
  static Color secondaryColor = const Color(0XFFF4976C);
  static Color tertiaryColor = const Color(0XFFFBE8A6);
  static Color quaternaryColor = const Color(0XFFB4DFE5);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        debugShowCheckedModeBanner: false,
        title: 'AR U-Here',
        home: WelcomePage());
  }
}
