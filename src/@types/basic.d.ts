import { ReactNode } from 'react';

export type SignInCredentials = {
  email: string;
  password: string;
};

export type AuthContextData = {
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
  isAuthenticated: boolean;
  user: User;
  modalSelectChurchOpen: boolean;
};

export type AuthProviderProps = {
  children: ReactNode;
};

export type User = {
  email: string;
  id?: string;
};

export type CourseType = {
  id: string,
  name: string,
  slug: string,
  group: string,
  status: string
  lessons: Array<LessonType>
}

export type CoursesType = {
  id: string,
  name: string,
  group: string,
  status: string
}

export type VideoPlatformType = {
  Youtube
  Vimeo
}

export type FileFormatType = {
  fdf
  image
  excel
  word
  powerpoint
  zip
  audio
  video
  script
  csv
}

export type FileType = {
  id: string
  format: FileFormatType,
  name: string
  url: string
}

export type LessonType = {
  id:           string,
  name:          string,
  isVideo:       boolean,
  videoIdentify: string,
  videoPlatform: VideoPlatformType,
  hasMaterial: boolean,
  teacher: TeacherType
  participed: boolean?,
  decription: string
  material: array<FileType>
}

type TeacherType = {
  id: string
  name: string
  bio: string
  photo: string
}

