/*
** recognition.hpp for Embarqué in /home/ruby/Documents/Scolaire/ar-u-here/AR-U-Here/Embarqué/include
**
** Made by Ruby
** Login   <necrelox@gmail.com>
**
** Started on  Mon Jun 20 22:42:41 2022 Ruby
** Last update Tue Aug 29 02:25:22 2022 Ruby
*/

#ifndef RECOGNITION_HPP_
# define RECOGNITION_HPP_

#include <HUSKYLENS.h>

class Recognition
{
    private:
        HUSKYLENS _huskylens;
    public:
        Recognition();
        ~Recognition();
        String run();
        
        void setup();
};


#endif /* !RECOGNITION_HPP_ */
