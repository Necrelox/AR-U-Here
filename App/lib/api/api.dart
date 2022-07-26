import 'dart:convert';

import 'package:http/http.dart' as http;

var ip = 'http://10.0.2.2:3002';

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
  return response;
}

Future<http.Response> verify_token(String url, String token) async {
  var uri = Uri.parse(ip + url);
  var response = await http.post(uri, headers: <String, String>{
    'Authorization': 'Bearer $token',
  });
  return response;
}
