import 'package:flutter/material.dart';
import '../myapp.dart';

void main() => runApp(const NavBar());

class NavBar extends StatelessWidget {
  const NavBar({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      home: MyStatefulWidget(),
    );
  }
}

class MyStatefulWidget extends StatefulWidget {
  const MyStatefulWidget({Key? key}) : super(key: key);

  @override
  State<MyStatefulWidget> createState() => _MyStatefulWidgetState();
}

class _MyStatefulWidgetState extends State<MyStatefulWidget> {
  int _selectedIndex = 0;
  static const TextStyle optionStyle =
      TextStyle(fontSize: 30, fontWeight: FontWeight.bold);
  static const List<Widget> _widgetOptions = <Widget>[
    Text(
      'Index 0: Accueil',
      style: optionStyle,
    ),
    Text(
      'Index 1: Statistiques',
      style: optionStyle,
    ),
    Text(
      'Index 2: Calendrier',
      style: optionStyle,
    ),
    Text(
      'Index 3: Profile',
      style: optionStyle,
    ),
  ];

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      bottomNavigationBar: BottomNavigationBar(
        items: <BottomNavigationBarItem>[
          BottomNavigationBarItem(
            icon: const ImageIcon(
              AssetImage('asset/home.png')
            ),
            label: 'Accueil',
            backgroundColor: MyApp.primaryColor,
          ),
          BottomNavigationBarItem(
            icon: const ImageIcon(
              AssetImage('asset/stats.png')
            ),
            label: 'Statistiques',
            backgroundColor: MyApp.secondaryColor,
          ),
          BottomNavigationBarItem(
            icon: const ImageIcon(
              AssetImage('asset/calendar.png')
            ),
            label: 'Calendrier',
            backgroundColor: MyApp.tertiaryColor,
          ),
          BottomNavigationBarItem(
            icon: const ImageIcon(
              AssetImage('asset/profile.png')
            ),
            label: 'Settings',
            backgroundColor: MyApp.quaternaryColor,
          ),
        ],
        currentIndex: _selectedIndex,
        onTap: _onItemTapped,
      ),
    );
  }
}
