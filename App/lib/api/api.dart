import 'dart:convert';
import 'package:http/http.dart' as http;

var ip = 'http://127.0.0.1:3002';
var token = '';

get_token(response) {
  Map<String, dynamic> temp = json.decode(response.body);
  token = temp['token'];
  return token;
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

Future<http.Response> get_user() async {
  var uri = Uri.parse('$ip/user/me/');
  var response = await http.get(uri, headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Token $token'
  });
  return response;
}
