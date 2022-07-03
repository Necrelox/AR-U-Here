import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../animation.dart';
import '../components/navbar.dart';
import '../animation.dart';

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
            Container(
              width: double.infinity,
              height: MediaQuery.of(context).size.height * 0.35,
              color: const Color(0XFF303C6C),
              child: ClipRRect(
              borderRadius: BorderRadius.circular(20), // Image border
              child: SizedBox.fromSize(
                size: const Size.fromRadius(23),
                  child: Image.asset(
                    "asset/marin.jpg",
                  ),
                ),
              )
            ),
            DelayAnimation(
              delay: 500,
              child: Container(
                width: double.infinity,
                height: MediaQuery.of(context).size.height * 0.1,
                alignment: Alignment.bottomLeft,
                padding: const EdgeInsets.fromLTRB(40, 0, 40, 0),
                child: RichText(
                  textAlign: TextAlign.center,
                  text: TextSpan(children: <TextSpan>[
                    TextSpan(
                        text: "Account Information",
                        style: GoogleFonts.inter(
                          color: const Color(0XFF303C6C),
                          fontSize: 22,
                          fontWeight: FontWeight.w800,
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
