/*
** brigadier.cpp for Embarqué in /home/ruby/Documents/Scolaire/ar-u-here/AR-U-Here/Embarqué/src
**
** Made by Ruby
** Login   <necrelox@gmail.com>
**
** Started on  Mon Jul 11 14:08:56 2022 Ruby
** Last update Tue Aug 29 10:03:41 2022 Ruby
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
            if (this->_isRunning) {
                this->_lcd.print("Ar-U-Here");
                delay(2000);
            }
            break;
        case PLAY:
            this->_demo = !this->_demo;
            break;
        case STOP:
            this->_demoB = !this->_demoB;
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
    this->_led.run(this->_isRunning);
    if (this->_isRunning) {
        String display = this->_recognition.run();
        if (this->_demo) {
            display = "Bonjour Ruby !";
            this->_lcd.print(display);
            delay(1500);
            this->_demo = false;
        }
        if (this->_demoB) {
            display = "Non reconnu !";
            this->_lcd.print(display);
            delay(1500);
            this->_demoB = false;
        }
        else
            this->_lcd.print(display);
    } else {
        this->_lcd.cleanLcd();
        this->_demo = false;
        this->_lcd.setText("");
    }

}

void Brigadier::setup()
{
    Serial.println("Brigadier setup");
    Serial.begin(9600);
    this->_irremote.setup();
    this->_led.setup();
    this->_recognition.setup();
    // this->_thermo.setup();
}

Brigadier::Brigadier()
{
}
