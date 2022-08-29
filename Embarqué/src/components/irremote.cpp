/*
** irremote.cpp for Embarqué in /home/ruby/Documents/Scolaire/ar-u-here/AR-U-Here/Embarqué/src/components
**
** Made by Ruby
** Login   <necrelox@gmail.com>
**
** Started on  Mon Jul 11 15:23:48 2022 Ruby
** Last update Tue Aug 29 03:21:28 2022 Ruby
*/

#include "components/irremote.hpp"
#include "config.hpp"
#include <IRremote.hpp>

bool IRremote::verifInput(const unsigned int code) const
{
    return (code == POWER || code == PLAY);
}

bool IRremote::verifInputNoRepeat(const unsigned int flag) const
{
    return (flag != IRDATA_FLAGS_IS_AUTO_REPEAT && flag != IRDATA_FLAGS_IS_REPEAT);
}

unsigned int IRremote::getCommand() const
{
    if (IrReceiver.decode()) {
        const IRData signal = IrReceiver.decodedIRData;
        IrReceiver.resume();
        if (verifInput(signal.command) && verifInputNoRepeat(signal.flags))
            return signal.command;
    }
    return -1;
}

void IRremote::setup()
{
    Serial.println("IR-Remote setup");
    IrReceiver.begin(DIG_PIN_IR, ENABLE_LED_FEEDBACK);
}

IRremote::IRremote()
{
}

IRremote::~IRremote()
{

}

