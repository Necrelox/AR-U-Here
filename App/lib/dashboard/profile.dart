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
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: <Widget>[
                    DelayAnimation(
                    delay: 500,
                    child: Container(
                      width: double.infinity,
                      alignment: Alignment.center,
                      child: ClipRRect(
                        borderRadius: BorderRadius.circular(50), // Image border
                        child: SizedBox.fromSize(
                          size: const Size.fromRadius(70),
                          child: Image.asset(
                            'asset/marin.jpg',
                            fit: BoxFit.cover,
                          ),
                        ),
                      )
                    ),
                  ),
                  DelayAnimation(
                    delay: 500,
                    child: Container(
                      width: double.infinity,
                      padding: const EdgeInsets.only(top: 20),
                      alignment: Alignment.center,
                      child: Text(
                        '@relog#123',
                        style: GoogleFonts.inter(
                          fontSize: 25,
                          fontWeight: FontWeight.w900,
                          fontStyle: FontStyle.italic,
                          color: const Color(0XFFFBE8A6),
                        ),
                      ),
                    )
                  ),
                ]),
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
                          shadows: <Shadow>[
                            const Shadow(
                              offset: Offset(3.0, 3.0),
                              blurRadius: 15.0,
                              color: Color.fromARGB(255, 93, 93, 93),
                            )],
                          color: const Color(0XFF303C6C),
                          fontSize: 22,
                          fontWeight: FontWeight.w800,
                        )),
                  ]),
                ),
              ),
            ),
            DelayAnimation(
              delay: 500,
              child: Container(
                width: double.infinity,
                height: MediaQuery.of(context).size.height * 0.35,
                margin: const EdgeInsets.fromLTRB(80, 0, 150, 0),
                alignment: Alignment.center,
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: <Widget>[ 
                    const SizedBox(
                      width: double.infinity,
                      child: Text(
                        "Name",
                        textAlign: TextAlign.left,
                        style: TextStyle(
                          fontSize: 20,
                          color:  Color(0XFF303C6C),
                          fontWeight: FontWeight.w700,
                        )
                      ),
                    ),
                    Container(
                      width: double.infinity,
                      padding: const EdgeInsets.only(bottom: 5),
                      decoration: const BoxDecoration(
                        border: Border(
                          bottom: BorderSide(
                            color: Color(0XFFFBE8A6),
                            width: 2,
                          ),
                      )),
                      child: const Text(
                        "Relog",
                        textAlign: TextAlign.left,
                        style: TextStyle(
                          fontSize: 15,
                          color: Color(0XFF303C6C),
                          fontWeight: FontWeight.w400,
                        )
                      ),
                    ),
                  ],
                ),
              ),
            ),
            DelayAnimation(
              delay: 500,
              child: Container(
                width: double.infinity,
                alignment: Alignment.center,
                padding: const EdgeInsets.only(top: 10),
                child: ElevatedButton(
                  style: ButtonStyle(
                      foregroundColor: MaterialStateProperty.all<Color>(
                          const Color(0XFF303C6C)),
                      backgroundColor: MaterialStateProperty.all<Color>(
                          const Color(0XFFF4976C)),
                      shape:
                          MaterialStateProperty.all<RoundedRectangleBorder>(
                              RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(18.0),
                      ))),
                  onPressed: () => {},
                  child: const Text("Logout",
                      style: TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.w700,
                      ))),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
