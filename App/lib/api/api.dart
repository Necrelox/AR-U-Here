import 'package:http/http.dart' as http;

var ip = 'http://127.0.0.1:3002';

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

Future<http.Response> get_user() async {
  String token = "jidosvhdif";
  var uri = Uri.parse('$ip/user/me/');
  var response = await http.get(uri, headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Token $token'
  });
  return response;
}