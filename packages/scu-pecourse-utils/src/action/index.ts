import { Api, ApiService } from '../http';
import { findTeacher } from './utils';

export async function start({
  teacherName,
  studentUid,
  password,
  timeout,
  callback,
}: {
  teacherName: string;
  studentUid: string;
  password: string;
  timeout?: number;
  callback?: Function;
}) {
  const apiService = new ApiService();
  const api = new Api(apiService);
  const { token } = await api.login({ username: studentUid, password, apiService });
  apiService.initAuth(token);

  const termId = await api.getTermId();
  const courses = await api.getCourses({ studentUid, termId });
  const { courseId, teacherUid } = findTeacher(teacherName, courses);
  console.log(`已找到${teacherName}的课课程号为${courseId}`);

  let count = 1;

  const timer = setTimeout(async () => {
    const res = await api.choose({
      courseClassId: courseId,
      studentUid,
      teacherName,
      teacherUid,
    });
    if (res) {
      callback?.({
        status: true,
        msg: '选课成功',
      });
      console.log('选课成功');
      clearInterval(timer);
    } else {
      const msg = `已经选课${count++}次`;
      callback?.({
        status: false,
        msg,
      });
      console.log(msg);
    }
  }, timeout || 1000);

  return () => {
    clearInterval(timer);
  };
}
