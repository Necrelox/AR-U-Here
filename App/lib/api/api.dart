import 'package:http/http.dart' as http;

void post_register(String url, String mail, String pwd, String school) async {
  print("Call A.P.I \n");
  print("Call mail" + mail + "\n");
  print("Call passowrd" + pwd + "\n");
  print("Call username" + school + "\n");
  var uri = Uri.parse(url);
  var response = await http
      .post(uri, body: {'username': school, 'email': mail, 'password': pwd});
  print('Response status: ${response.statusCode}');
  print('Response body: ${response.body}');
}

void post_login(String url, String mail, String pwd) async {
  var uri = Uri.parse(url);
  var response =
      await http.post(uri, body: {'name': 'doodle', 'color': 'blue'});
  print('Response status: ${response.statusCode}');
  print('Response body: ${response.body}');
}
