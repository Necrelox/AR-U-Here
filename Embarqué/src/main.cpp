/*
** main.cpp for Embarqué in /home/ruby/Documents/Scolaire/ar-u-here/AR-U-Here/Embarqué/src
**
** Made by Ruby
** Login   <necrelox@gmail.com>
**
** Started on  Mon Jun 20 22:42:35 2022 Ruby
** Last update Mon Aug 28 19:21:44 2022 Ruby
*/

#include "brigadier.hpp"
#include <Arduino.h>

Brigadier brigadier;

void setup()
{
    brigadier.setup();
}

void loop()
{
    brigadier.run();
}