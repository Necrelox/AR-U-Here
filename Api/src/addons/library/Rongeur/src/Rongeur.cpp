#include "Rongeur.hpp"
#include <uuid/uuid.h>

Rongeur::Rongeur(const std::filesystem::path &path, const int wantedWidth, const int wantedHeight) {
    if (!std::filesystem::exists(path))
        throw MyException("The file doesn't exist");
    this->_image = cv::imread(path.string());
    this->_width = this->_image.cols;
    this->_height = this->_image.rows;
    this->crop(wantedWidth, wantedHeight);
    this->resize(wantedWidth, wantedHeight);

    std::string userDir = std::filesystem::current_path().string();
    if (!std::filesystem::exists(std::filesystem::current_path().string() + "/../Rongeur"))
        std::filesystem::create_directory(std::filesystem::current_path().string() + "/../Rongeur");
    this->_newPath = std::filesystem::current_path().string() + "/../Rongeur/" + Rongeur::generateUUID() + ".jpg";
    cv::imwrite(this->_newPath, this->_image);
}

void Rongeur::crop(int width, int height) {
    if (width > this->_width || height > this->_height)
        throw MyException("Crop size is bigger than image size");
    int mul = std::min((this->_width / width), (this->_height / height));
    int x = (this->_width - (width * mul)) / 2;
    int y = (this->_height - (height * mul)) / 2;
    this->_height = height * mul;
    this->_width = width * mul;
    this->_image = this->_image(cv::Rect(x, y, this->_width, this->_height));
}

void Rongeur::resize(int width, int height) {
    cv::resize(this->_image, this->_image, cv::Size(width, height));
}

std::string Rongeur::generateUUID() {
    uuid_t uuid;
    uuid_generate_random(uuid);
    char uuid_str[37];
    uuid_unparse(uuid, uuid_str);
    return uuid_str;
}

std::string Rongeur::getNewPath() const {
    return this->_newPath;
}