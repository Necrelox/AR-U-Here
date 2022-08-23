import 'dart:convert';
import 'dart:async';
import 'package:http/http.dart' as http;
import '../class/User.dart';
import 'dart:io';
import 'package:flutter/material.dart';

var ip = 'http://10.0.2.2:3002';
var token = '';

get_token(response) {
  Map<String, dynamic> temp = json.decode(response.body);
  token = temp['token'];
  return token;
}

Future<http.Response> sendFile(String url, File idFile) async {
  var uri = Uri.parse(ip + url);
  var response = await http.post(uri, body: {
    'idFile': idFile.path
  }, headers: <String, String>{
    // 'Content-Type': 'application/json; charset=UTF-8',
    // 'Accept': 'application/json',
    'Authorization': 'Token $token'
  });
  return response;
}

Future<http.Response> post_register(
    String url, String mail, String pwd, String school) async {
  var uri = Uri.parse(ip + url);
  var response = await http
      .post(uri, body: {'username': school, 'email': mail, 'password': pwd});
  return response;
}

Future<http.Response> post_login(String url, String mail, String pwd) async {
  var uri = Uri.parse(ip + url);
  var response =
      await http.post(uri, body: {'username': mail, 'password': pwd});
  get_token(response);
  return response;
}

Future<http.Response> verify_token(String url, String token) async {
  var uri = Uri.parse(ip + url);
  var response = await http.post(uri, headers: <String, String>{
    'Authorization': 'Bearer $token',
  });
  return response;
}

Future<User> fetchUser() async {
  final response = await http.get(Uri.parse('$ip/user/me'), headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Token $token'
  });

  if (response.statusCode == 200) {
    print(json.decode(response.body));
    return User.fromJson(json.decode(response.body));
  } else {
    var temp = jsonDecode(response.body);
    throw Exception('Failed to get user. ${temp['error']['message']}');
  }
}

Future<User> updateUser(
    String username, String email, String phone, String address) async {
  final response = await http.put(
    Uri.parse('$ip/user/me'),
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8',
      'Accept': 'application/json',
      'Authorization': 'Token $token'
    },
    body: jsonEncode(<String, String>{
      if (username != null) 'username': username,
      if (email != null) 'email': email,
      // if (phone != null) 'phone': phone,
      if (address != null) 'address': address,
    }),
  );

  if (response.statusCode == 200) {
    return fetchUser();
  } else {
    var temp = jsonDecode(response.body);
    throw Exception('Failed to update user. ${temp['error']['message']}');
  }
}
