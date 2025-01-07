/**
 * define api
 */

import { emitAjaxGet, emitAjaxPost } from './index';

/**
 * @param {*} headers
 * get current term id
 */
export async function getTermId(headers) {
  const path = '/api/terms';
  const res = await emitAjaxGet(path, headers);
  console.log(res.code);

  for (const term of res.data.content) {
    if (term.currentTerm === 1) return term.id;
  }
}

/**
 * get classid and teacher id
 * @param {string} teacherName
 * @param {string} studentUid
 * @param {*} headers
 */
export async function getClassIdAndTeacherId(teacherName, studentUid, headers) {
  const path = `/api/term/${await getTermId(
    headers
  )}/student/${studentUid}/course/classes`;
  const res = await emitAjaxGet(path, headers);
  const lists = res.data;
  for (const course of lists) {
    if (course.teacherName === teacherName) {
      return {
        courseClassId: course.id.toString(),
        teacherUid: course.teacherUid,
      };
    }
  }
}
/**
 * choose function
 * @param {string} courseClassId
 * @param {string} teacherUid
 * @param {string} teacherName
 * @param {string} studentUid
 * @param {*} headers
 */
export async function choose(
  courseClassId,
  teacherUid,
  teacherName,
  studentUid,
  headers
) {
  const path = '/api/courses/students';
  const data = {
    courseClassId,
    studentUid,
    teacherUid,
    teacherName,
  };
  const res = await emitAjaxPost(path, data, headers);
  if (res.code === 200 && res.message === 'OK') return true;
  else return false;
}

export async function startTimer(teacherName, studentUid, callback, headers) {
  const { courseClassId, teacherUid } = await getClassIdAndTeacherId(
    teacherName,
    studentUid,
    headers
  );
  let count = 1;
  const timer = setInterval(async () => {
    const res = await choose(
      courseClassId,
      teacherUid,
      teacherName,
      studentUid,
      headers
    );
    if (res === true) {
      callback('选课成功');
      clearInterval(timer);
    } else {
      callback(`已经选课${count}次`);
      count++;
    }
  }, 1000);
  return timer;
}
