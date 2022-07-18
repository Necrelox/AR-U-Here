
class User {
  final int? uuid;
  final String? email;
  final String? username;

  const User({
    required this.uuid,
    required this.email,
    required this.username,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      uuid: json['user']['uuid'],
      email: json['user']['email'],
      username: json['user']['username'],
    );
  }
}