import type { Course } from '../http';

export function findTeacher(findTeacherName: string, courses: Course[]) {
  for (const course of courses) {
    const { id, teacherName, teacherUid } = course;
    if (teacherName === findTeacherName) {
      return {
        teacherName,
        courseId: id,
        teacherUid,
      };
    }
  }
  return null;
}