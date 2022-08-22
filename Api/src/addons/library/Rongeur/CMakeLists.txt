cmake_minimum_required(VERSION 3.22)
project(Rongeur
        VERSION 0.1
        LANGUAGES CXX
    )

set(CMAKE_DEBUG_POSTFIX d)
set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED True)

find_package(OpenCV REQUIRED)

add_library(${PROJECT_NAME} SHARED ${CMAKE_CURRENT_SOURCE_DIR}/src/Rongeur.cpp)

target_include_directories(${PROJECT_NAME} PUBLIC ${CMAKE_CURRENT_SOURCE_DIR}/include)
target_link_libraries( ${PROJECT_NAME}
        PRIVATE
        opencv_highgui
        uuid
        )

if (MSVC)
    target_compile_options(${PROJECT_NAME} PUBLIC /W4 /WX)
else()
    target_compile_options(${PROJECT_NAME} PUBLIC -g3 -O3 -Wall -Wextra -Werror -pedantic -fvisibility=hidden)
endif()
