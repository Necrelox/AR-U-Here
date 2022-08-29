/*
** led.hpp for Embarqué in /home/ruby/Documents/Scolaire/ar-u-here/AR-U-Here/Embarqué/include/components
**
** Made by Ruby
** Login   <necrelox@gmail.com>
**
** Started on  undefined Aug 28 22:24:37 2022 Ruby
** Last update Mon Aug 28 23:07:58 2022 Ruby
*/

#ifndef LED_HPP_
# define LED_HPP_

#include <Arduino.h>

class Led
{
private:
public:
    void run(bool isRunning);

    Led();
    ~Led();
    void setup();

};



#endif /* !LED_HPP_ */
