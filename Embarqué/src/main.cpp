/*
** main.cpp for Embarqué in /home/ruby/Documents/Scolaire/ar-u-here/AR-U-Here/Embarqué/src
**
** Made by Ruby
** Login   <necrelox@gmail.com>
**
** Started on  Mon Jun 20 22:42:35 2022 Ruby
** Last update Tue Jul 18 14:35:49 2022 Ruby
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