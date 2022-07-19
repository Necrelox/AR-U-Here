/*
** thermo.hpp for Embarqué in /home/ruby/Documents/Scolaire/ar-u-here/AR-U-Here/Embarqué/include/components
**
** Made by Ruby
** Login   <necrelox@gmail.com>
**
** Started on  Mon Jul 11 14:18:27 2022 Ruby
** Last update Wed Jul 12 15:52:12 2022 Ruby
*/

#ifndef THERMO_HPP_
# define THERMO_HPP_

#define CELCIUS 0
#define KELVIN 1
#define FAHRENHEIT 2

class Thermo
{
    private:
    public:
        Thermo();
        ~Thermo();
        /**
         * @brief      Setup IrReceiver with begin on specific pin on config.hpp;
         */
        void setup();

         /**
         * @brief      Get temperature in format specified in parameter;
         * @param      format  The format (CELCIUS, KELVIN, FAHRENHEIT)
         * @return     The temperature.
         */
        double getTemperature(const unsigned char format) const;
};

#endif /* !THERMO_HPP_ */
