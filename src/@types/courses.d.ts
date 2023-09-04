export interface StudantOnClassesType {
  id: String;
  class: ClassType;
  StudantOnLesson: Array<StudantOnLessonType>;
  _count: any;
}

export interface ClassType {
  id: String;
  name: String;
  slug: String;
  CourseClassLesson: Array<CourseClassLessonType>;
  course: CourseType;
}

export interface CourseType {
  id: String;
  churchId: String;
  courseGroupId: String;
  name: String;
  description: String;
  image: String | null;
  slug: String;
  active: Boolean;
  createdAt: Date | String;
  updatedAt: Date | String;
}

export interface StudantOnLessonType {
  id: String;
  churchId: String;
  personId: String;
  studantOnClassId: String;
  courseClassLessonId: String;
  eadStatus: EadStats;
  eadTime: String;
  eadViewDate: Date | String;
  presence: Boolean;
  concluded: Boolean;
  active: Boolean;
  createdAt: Date | String;
  updatedAt: Date | String;
}

enum EadStatsEnum {
  "UNSUBSCRIBED",
  "SUBSCRIBED",
  "CONCLUDED",
  "SUSPENSE",
}

export type EadStats = (typeof EadStatsEnum)[keyof typeof EadStatsEnum];
