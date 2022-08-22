/*
** main.cpp for addons in /home/ruby/Documents/Perso/test-addon/addons/addons/src
**
** Made by Ruby
** Login   <necrelox@gmail.com>
**
** Started on  Mon Jul 18 22:04:35 2022 Ruby
** Last update Tue Aug 15 16:30:48 2022 Ruby
*/

#include <napi.h>
#include "Rongeur.hpp"

Napi::String RongeurModule(const Napi::CallbackInfo& info)
{
    Napi::Env env = info.Env();
    Napi::Object console = env.Global().Get("console").As<Napi::Object>();
    Napi::Function log = console.Get("log").As<Napi::Function>();
    
    try {
        if (info[0].IsNull())
            throw Napi::Error::New(env, "Error : no file path given.");
        
        const std::string path = info[0].As<Napi::String>().Utf8Value();
        Rongeur rongeur = Rongeur(path, 240, 320);
        return Napi::String::New(env, rongeur.getNewPath());
    } catch (const std::exception& e) {
        log.Call(console, {Napi::String::New(env, std::string(e.what()))});
        Napi::Error::New(env, e.what()).ThrowAsJavaScriptException();

        return Napi::String::New(env, "");
    }
    return Napi::String::New(env, "");
}

Napi::Object InitializeAddonsManager(Napi::Env env, Napi::Object exports)
{
    exports.Set(Napi::String::New(env, "Rongeur"), Napi::Function::New(env, RongeurModule));
    return exports;
}

NODE_API_MODULE(Orchestrateur, InitializeAddonsManager)
