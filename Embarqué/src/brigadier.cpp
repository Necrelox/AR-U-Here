/*
** brigadier.cpp for Embarqué in /home/ruby/Documents/Scolaire/ar-u-here/AR-U-Here/Embarqué/src
**
** Made by Ruby
** Login   <necrelox@gmail.com>
**
** Started on  Mon Jul 11 14:08:56 2022 Ruby
** Last update Tue Jul 18 14:12:17 2022 Ruby
*/

#include "brigadier.hpp"
#include <Arduino.h>

short Brigadier::commandManager()
{
    const uint16_t remoteCommandInput = this->_irremote.getCommand();
    if (remoteCommandInput != static_cast<uint16_t>(-1)) {
        switch (remoteCommandInput) {
        case POWER:
            this->_isRunning = !this->_isRunning;
            break;
        case PLAY:
            break;
        default:
            break;
        }
    }
    return OK;
} 

void Brigadier::run()
{
    this->commandManager();
    if (this->_isRunning) {
        Serial.println(this->_thermo.getTemperature(CELCIUS));
        //
    }

}

void Brigadier::setup()
{
    Serial.println("Brigadier setup");
    Serial.begin(9600);
    this->_irremote.setup();
    this->_thermo.setup();
}

Brigadier::Brigadier()
{
}
