import { ApiService } from './apiService';
import { Course, ParamType } from './apiTypes';

export class Api {
  constructor(public apiService: ApiService) {}

  async login({
    username,
    password,
  }: {
    username: string;
    password: string;
    apiService: ApiService;
  }): Promise<{ username: string; token: string }> {
    const path = '/api/login';
    const data = {
      username,
      password,
    };

    const res = await this.apiService.post({ path, data });

    if (res.data?.username) {
      return {
        username,
        token: res.data.token.access_token,
      };
    }

    return null;
  }

  /**
   * 当前学期id
   */
  async getTermId(): Promise<ParamType> {
    const path = '/api/terms';
    const res = await this.apiService.get({ path });

    for (const term of res.data.content) {
      if (term.currentTerm === 1) return term.id;
    }
    throw new Error('无法找到当前学期');
  }

  /**
   * 当前学期所有课程
   */
  async getCourses({ studentUid, termId }): Promise<Course[]> {
    const path = `/api/term/${termId}/student/${studentUid}/course/classes`;
    const res = await this.apiService.get({ path });
    const lists = res.data;
    return lists;
  }

  async choose({ courseClassId, teacherUid, teacherName, studentUid }) {
    const path = '/api/courses/students';
    const data = {
      courseClassId,
      studentUid,
      teacherUid,
      teacherName,
    };
    const res = await this.apiService.post({ path, data });
    if (res.code === 200 && res.message === 'OK') {
      return true;
    } else {
      return false;
    }
  }
}
