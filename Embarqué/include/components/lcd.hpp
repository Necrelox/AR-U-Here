/*
** lcd.hpp for Embarqué in /home/ruby/Documents/Scolaire/ar-u-here/AR-U-Here/Embarqué/include/components
**
** Made by Ruby
** Login   <necrelox@gmail.com>
**
** Started on  Mon Jul 11 14:14:09 2022 Ruby
** Last update Tue Aug 29 03:25:45 2022 Ruby
*/

#ifndef LCD_HPP_
#define LCD_HPP_

#include <LiquidCrystal.h>
#include "config.hpp"

class LCD
{
    private:
        String _text;
    public:
        LCD();
        ~LCD();
        void setup();
        
        void print(const String text);
        void cleanLcd();

        void setText(const String text);
};


#endif /* !LCD_HPP_ */
