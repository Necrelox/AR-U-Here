class User {
  final int? uuid;
  final String? email;
  final String? username;
  final String? phone;
  final String? address;

  const User({
    required this.uuid,
    required this.email,
    required this.username,
    required this.phone,
    required this.address,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      uuid: json['user']['uuid'],
      email: json['user']['email'],
      username: json['user']['username'],
      phone: json['user']['phone'],
      address: json['user']['address'],
    );
  }
}
