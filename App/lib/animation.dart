import 'package:flutter/material.dart';
import 'dart:async';

class DelayAnimation extends StatefulWidget {
  final Widget child; // Widget
  final int delay; // Temps pour l'animation
  const DelayAnimation({required this.delay, required this.child});

  @override
  State<DelayAnimation> createState() => _DelayAnimationState();
}

class _DelayAnimationState extends State<DelayAnimation>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller; // Controller l'animation
  late Animation<Offset> _animOffset; //Préciser le comportement de l'animation
  @override
  void initState() {
    super.initState();
    //Donner une valeur à notre controller
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 500),
    );

    // AJouter un effet de fondu
    final curve =
        CurvedAnimation(parent: _controller, curve: Curves.decelerate);

    // Changer les valeurs pour faire arriver de bas en haut ou haut en bas
    // Fonction qui gère le comportement de l'animation
    _animOffset = Tween<Offset>(
      begin: const Offset(0.0, -0.5),
      end: Offset.zero,
    ).animate(curve);

    // Calcul de la durée de l'animation
    Timer(Duration(milliseconds: widget.delay), () {
      _controller.forward();
    });
  }

  @override
  Widget build(BuildContext context) {
    return FadeTransition(
      opacity: _controller,
      child: SlideTransition(position: _animOffset, child: widget.child),
    );
  }
}
