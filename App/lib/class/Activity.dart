class Activity {
  final String? activityKey;
  final String? name;
  final String? startTime;
  final String? endTime;
  final String? description;
  final String? studyLevel;

  const Activity({
    required this.activityKey,
    required this.name,
    required this.startTime,
    required this.endTime,
    required this.description,
    required this.studyLevel,
  });

  factory Activity.fromJson(Map<String, dynamic> map) {
    return Activity(
      activityKey: map['activityKey'],
      name: map['name'],
      startTime: map['startTime'],
      endTime: map['endTime'],
      description: map['description'] ?? '',
      studyLevel: map['studyLevel'] ?? '',
    );
  }
}