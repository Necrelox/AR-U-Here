#ifndef RONGEUR_LIBRARY_H
#define RONGEUR_LIBRARY_H

#include "visibility.hpp"
#include "MyException.hpp"
#include <opencv2/opencv.hpp>
#include <filesystem>

class Rongeur {
private:
    cv::Mat _image;
    std::string _newPath;
    int _width {0};
    int _height {0};

    ////////////////////////////////////////////////////////////
    ///
    /// \brief Crop the image to the wanted size
    ///
    /// \param width of the wanted rectangle
    /// \param height of the wanted rectangle
    ///
    ////////////////////////////////////////////////////////////
    DLL_LOCAL
    void crop(int width, int height);

    ////////////////////////////////////////////////////////////
    ///
    /// \brief Resize the image to the wanted size
    ///
    /// \param width of the wanted size
    /// \param height of the wanted size
    ///
    ////////////////////////////////////////////////////////////
    DLL_LOCAL
    void resize(int width, int height);

    ////////////////////////////////////////////////////////////
    ///
    /// \brief Generate a UUID
    ///
    /// \return a UUID as a string
    ///
    ////////////////////////////////////////////////////////////
    static DLL_LOCAL
    std::string generateUUID();

public:
    ////////////////////////////////////////////////////////////
    ///
    /// \brief Construct a new Rongeur object, (Crop, resize and save the image in a temporary file)
    ///
    /// \return a UUID as a string
    ///
    ////////////////////////////////////////////////////////////
    DLL_PUBLIC
    explicit Rongeur(const std::filesystem::path& path = "", int wantedWidth = 240, int wantedHeight = 320);

    DLL_PUBLIC
    Rongeur(const Rongeur&) = delete;
    DLL_PUBLIC
    Rongeur(Rongeur&&) = delete;

    DLL_PUBLIC
    std::string getNewPath() const;
};


#endif //RONGEUR_LIBRARY_H
