import 'dart:io';

class FaceId {
  final File? photo;

  const FaceId({
    required this.photo,
  });

  factory FaceId.fromJson(Map<String, dynamic> json) {
    return FaceId(
      photo: File(json['idFile']),
    );
  }
}
