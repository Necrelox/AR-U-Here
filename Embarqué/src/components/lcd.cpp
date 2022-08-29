/*
** lcd.cpp for Embarqué in /home/ruby/Documents/Scolaire/ar-u-here/AR-U-Here/Embarqué/src/components
**
** Made by Ruby
** Login   <necrelox@gmail.com>
**
** Started on  Mon Jul 11 15:23:53 2022 Ruby
** Last update Tue Aug 29 03:28:05 2022 Ruby
*/

#include "components/lcd.hpp"

LCD::LCD()
{
}

LCD::~LCD()
{}


void LCD::print(const String text)
{
    if (this->_text != text) {
        this->_text = text;
        LiquidCrystal lcd(DIG_PIN_LCD_RS, DIG_PIN_LCD_EN, DIG_PIN_LCD_D4, DIG_PIN_LCD_D5, DIG_PIN_LCD_D6, DIG_PIN_LCD_D7);
        lcd.print(text);
        lcd.scrollDisplayRight();
    }
}

void LCD::cleanLcd()
{
    LiquidCrystal lcd(DIG_PIN_LCD_RS, DIG_PIN_LCD_EN, DIG_PIN_LCD_D4, DIG_PIN_LCD_D5, DIG_PIN_LCD_D6, DIG_PIN_LCD_D7);
    lcd.clear();
    lcd.noDisplay();
}

void LCD::setText(const String text)
{
    this->_text = text;
}