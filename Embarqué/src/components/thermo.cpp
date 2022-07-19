/*
** thermo.cpp for Embarqué in /home/ruby/Documents/Scolaire/ar-u-here/AR-U-Here/Embarqué/src/components
**
** Made by Ruby
** Login   <necrelox@gmail.com>
**
** Started on  Mon Jul 11 15:24:05 2022 Ruby
** Last update Wed Jul 12 15:53:46 2022 Ruby
*/

#include "components/thermo.hpp"
#include "config.hpp"
#include <Arduino.h>

void Thermo::setup()
{
    Serial.println("Thermo setup");
}

double Thermo::getTemperature(const unsigned char format) const
{
    int tempReading = analogRead(ANALOG_PIN_THERMO);
    double tempK = log(10000.0 * ((1024.0 / tempReading - 1)));
    tempK = 1 / (0.001129148 + (0.000234125 + (0.0000000876741 * tempK * tempK ))* tempK );
    switch (format) {
    case CELCIUS:
        return tempK - 273.15;
        break;
    case KELVIN:
        return tempK;
        break;
    case FAHRENHEIT:
        return (tempK - 273.15) * 9 / 5 + 32;
        break;
    default:
        return tempK;
        break;
    }
}

Thermo::Thermo()
{
}

Thermo::~Thermo()
{
}