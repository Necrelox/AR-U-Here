cmake_minimum_required(VERSION 3.9)
cmake_policy(SET CMP0042 NEW)
include_directories(${CMAKE_JS_INC})


project (Orchestrateur)

set (CMAKE_CXX_STANDARD 20)
set (CMAKE_CXX_STANDARD_REQUIRED True)

file(GLOB SOURCE_FILES "src/ManagerAddons.cpp")

find_package(OpenCV REQUIRED)


add_library(${PROJECT_NAME} SHARED ${SOURCE_FILES} ${CMAKE_JS_SRC})
set_target_properties(${PROJECT_NAME} PROPERTIES PREFIX "" SUFFIX ".node")
target_link_libraries(${PROJECT_NAME} ${CMAKE_JS_LIB})

add_subdirectory(${CMAKE_CURRENT_SOURCE_DIR}/library/Rongeur)
target_link_libraries(${PROJECT_NAME} PUBLIC Rongeur)

target_link_libraries( ${PROJECT_NAME}
        PRIVATE
        opencv_highgui
        uuid
        )
add_compile_options(-g3 -O3 -Wall -Wextra -Werror -pedantic)

# Include Node-API wrappers
execute_process(COMMAND node -p "require('node-addon-api').include"
        WORKING_DIRECTORY ${CMAKE_SOURCE_DIR}
        OUTPUT_VARIABLE NODE_ADDON_API_DIR
        )
string(REGEX REPLACE "[\r\n\"]" "" NODE_ADDON_API_DIR ${NODE_ADDON_API_DIR})
target_include_directories(${PROJECT_NAME} PRIVATE ${NODE_ADDON_API_DIR})

target_link_libraries(${PROJECT_NAME} )

# define NAPI_VERSION
add_definitions(-DNAPI_VERSION=5)