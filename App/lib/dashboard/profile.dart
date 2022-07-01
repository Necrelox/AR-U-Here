import 'package:flutter/material.dart';
import '../animation.dart';
import '../components/navbar.dart';

class Profile extends StatefulWidget {
  const Profile({Key? key}) : super(key: key);

  @override
  // ignore: library_private_types_in_public_api
  _ProfileState createState() => _ProfileState();
}

class _ProfileState extends State<Profile> {

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0XFFD2FDFF),
      bottomNavigationBar: const NavbarDemo(),
      body: SingleChildScrollView(
        child: Column(
          children: <Widget>[
            SizedBox(
              width: double.infinity,
              height: MediaQuery.of(context).size.height * 0.35,
              child: const DecoratedBox(
                decoration: BoxDecoration(
                  color: Color(0XFF303C6C)
                ),
              ),
            ),
            
          ],
        ),
      ),
    );
  }
}
