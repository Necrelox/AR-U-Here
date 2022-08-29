/*
** recognition.cpp for Embarqué in /home/ruby/Documents/Scolaire/ar-u-here/AR-U-Here/Embarqué/src/components
**
** Made by Ruby
** Login   <necrelox@gmail.com>
**
** Started on  Mon Jul 11 15:24:01 2022 Ruby
** Last update Tue Aug 29 03:24:16 2022 Ruby
*/

#include "components/recognition.hpp"

Recognition::Recognition()
{
}

Recognition::~Recognition()
{
}

String Recognition::run()
{
    if (!this->_huskylens.request())
        Serial.println(F("Fail to request data from HUSKYLENS, recheck the connection!"));

    else if(!this->_huskylens.isLearned())
        Serial.println(F("Nothing learned, press learn button on HUSKYLENS to learn one!"));

    else if(!this->_huskylens.available()) {
        // Serial.println(F("No block or arrow appears on the screen!"));
        return "Approchez-vous";
    }

    else if (this->_huskylens.available()) {
        Serial.println("En cours...");
        return "En cours...";
    }
    return "";
}

void Recognition::setup()
{
    Wire.begin();
    
    while (!this->_huskylens.begin(Wire))
    {
        Serial.println(F("Begin failed!"));
        Serial.println(F("1.Please recheck the \"Protocol Type\" in HUSKYLENS (General Settings>>Protocol Type>>I2C)"));
        Serial.println(F("2.Please recheck the connection."));
        delay(100);
    }
    // this->_huskylens.
}