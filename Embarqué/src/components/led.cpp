/*
** led.cpp for Embarqué in /home/ruby/Documents/Scolaire/ar-u-here/AR-U-Here/Embarqué/src/components
**
** Made by Ruby
** Login   <necrelox@gmail.com>
**
** Started on  undefined Aug 28 22:27:05 2022 Ruby
** Last update Tue Aug 29 01:20:42 2022 Ruby
*/

#include "components/led.hpp"
#include "config.hpp"

Led::Led()
{
}

Led::~Led()
{
}

void Led::run(bool isRunning)
{
    if (isRunning) {
        digitalWrite(DIG_PIN_GREEN_LED, HIGH);
        digitalWrite(DIG_PIN_RED_LED, LOW);
    } else {
        digitalWrite(DIG_PIN_GREEN_LED, LOW);
        digitalWrite(DIG_PIN_RED_LED, HIGH);
    }
}

void Led::setup()
{
    Serial.println("Led setup");
    pinMode(DIG_PIN_GREEN_LED, OUTPUT);
    pinMode(DIG_PIN_RED_LED, OUTPUT);
}