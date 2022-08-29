/*
** remote.hpp for Embarqué in /home/ruby/Documents/Scolaire/ar-u-here/AR-U-Here/Embarqué/include
**
** Made by Ruby
** Login   <necrelox@gmail.com>
**
** Started on  Tue Jun 21 12:02:24 2022 Ruby
** Last update Tue Aug 29 09:41:40 2022 Ruby
*/

#ifndef REMOTE_HPP_
#define REMOTE_HPP_

#define POWER 0x45
#define PLAY 0x40
#define STOP 0x47


class IRremote
{
    private:
        /**
         * @brief      Verif input is POWER or PLAY Button.
         * @param[in]  code  correspond to the command number of decodedIRData.
         * @return     true if code is POWER or PLAY, false otherwise.
        */
        bool verifInput(const unsigned int code) const;
        
        /**
         * @brief      Verif input is not a repeat.
         * @param[in]  flag  correspond to the flag of decodedIRData.
         * @return     true if flag is not a repeat, false otherwise.
        */
        bool verifInputNoRepeat(const unsigned int flag) const;
    public:
        IRremote();
        ~IRremote();
        
        /**
         * @brief      Setup IrReceiver with begin on specific pin on config.hpp;
         */
        void setup();

        /**
         * @brief      Get the Commande.
         * @return     The command.
         */
        unsigned int getCommand() const;
};

#endif /* !REMOTE_HPP_ */
