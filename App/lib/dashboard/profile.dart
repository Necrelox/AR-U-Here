import 'package:flutter/material.dart';
import 'package:table_calendar/table_calendar.dart';
import '../animation.dart';
import '../components/navbar.dart';
import '../components/appbar.dart';

class Profile extends StatefulWidget {
  const Profile({Key? key}) : super(key: key);

  @override
  // ignore: library_private_types_in_public_api
  _ProfileState createState() => _ProfileState();
}

class _ProfileState extends State<Profile> {
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
    return Scaffold(
      backgroundColor: const Color(0XFFD2FDFF),
      bottomNavigationBar: const NavbarDemo(),
      
      body: SingleChildScrollView(
        child: Column(
          children: <Widget>[
            
            
          ],
        ),
      ),
    );
  }
}
