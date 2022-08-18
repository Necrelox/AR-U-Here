/**
* Created by ruby on 14/08/22.
*/

#ifndef RONGEUR_MYEXCEPTION_HPP
#define RONGEUR_MYEXCEPTION_HPP

#include <exception>
#include <string>

class MyException : public std::exception {
private:
    std::string _message;
public:
    MyException(const std::string& message) : _message(message) {}
    virtual const char* what() const throw() { return _message.c_str(); }
};

#endif //RONGEUR_MYEXCEPTION_HPP
