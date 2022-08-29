/*
** brigadier.hpp for Embarqué in /home/ruby/Documents/Scolaire/ar-u-here/AR-U-Here/Embarqué/include
**
** Made by Ruby
** Login   <necrelox@gmail.com>
**
** Started on  Mon Jul 11 14:09:12 2022 Ruby
** Last update Tue Aug 29 03:09:42 2022 Ruby
*/

#ifndef BRIGADIER_HPP_
# define BRIGADIER_HPP_

#include "components/irremote.hpp"
#include "components/led.hpp"
#include "components/thermo.hpp"
#include "components/lcd.hpp"
#include "components/recognition.hpp"

// #include "components/button.hpp"
// #include "components/motor.hpp"

#define OFF false
#define ON true

#define OK 0
#define ERROR -1

class Brigadier
{
    private:
        bool _isRunning = OFF;
        IRremote _irremote;
        Thermo _thermo;
        Led _led;
        LCD _lcd;
        Recognition _recognition;
        bool _demo = false;
        // Button button;
        // Motor motor;
        
        /**
         * @brief      Manage command of remote and button input
         * @return     OK o ERROR
         */
        short commandManager();
        

    public:
        Brigadier();
        void setup();
        
        /**
         * @brief      Execute the brigadier;
         */
        void run(); 
};

#endif /* !BRIGADIER_HPP_ */
