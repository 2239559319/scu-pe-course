import React, { useEffect, useRef, useState } from 'react';
import type { Course, ParamType } from '@xiaochuan-dev/scu-pecourse-utils';
import { api, isLogined } from '../utils';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
} from '@mui/material';

const Choose = () => {
  const [{ courses, teacherName, teacherUid, courceId }, setState] = useState<{
    termId: ParamType | null;
    courses: Course[] | null;
    teacherUid: ParamType | null;
    teacherName: string | null;
    courceId: ParamType | null;
  }>({
    termId: null,
    courses: null,
    teacherUid: null,
    teacherName: null,
    courceId: null,
  });

  useEffect(() => {
    if (isLogined()) {
      //
    }

    api
      .getTermId()
      .then((res) => {
        setState((pre) => ({
          ...pre,
          termId: res,
        }));
        return api.getCourses({
          studentUid: localStorage.getItem('username'),
          termId: res,
        });
      })
      .then((res) => {
        setState((pre) => ({
          ...pre,
          courses: res,
        }));
      });
  }, []);

  const timer = useRef<number>();
  const count = useRef<number>(1);

  const [{ msg, showMsg }, setMsg] = useState({ msg: '', showMsg: false });

  const startChoose = async () => {
    if (!courceId) {
      setMsg({ msg: '先选择课程', showMsg: true });
      return;
    }

    timer.current = window.setInterval(async () => {
      const res = await api.choose({
        courseClassId: courceId,
        teacherUid,
        teacherName,
        studentUid: localStorage.getItem('username'),
      });
      if (res) {
        window.clearInterval(timer.current);
        setMsg({ msg: '抢课成功', showMsg: true });
      } else {
        setMsg({ msg: `已抢${count.current++}次`, showMsg: true });
      }
    }, 1000);
  };

  const stopChoose = () => {
    window.clearInterval(timer.current);
  };

  return (
    <div className="Choose">
      <FormControl fullWidth={true}>
        <InputLabel id="select-label-cource">课程</InputLabel>
        <Select
          fullWidth={true}
          labelId="select-label-cource"
          id="select-cource"
          label="课程"
          onChange={(e: any) => {
            const s = JSON.parse(e.target.value);
            const { id, teacherName, teacherUid } = s;
            setState((pre) => ({
              ...pre,
              courceId: id,
              teacherName,
              teacherUid,
            }));
          }}
        >
          {courses?.map(
            ({ id, areaName, courseName, teacherName, teacherUid }) => {
              const showName = `${areaName} ${courseName} ${teacherName}`;
              return (
                <MenuItem
                  value={JSON.stringify({
                    id,
                    areaName,
                    teacherName,
                    teacherUid,
                  })}
                >
                  {showName}
                </MenuItem>
              );
            }
          )}
        </Select>
      </FormControl>

      <div className="btns">
        <Button variant="contained" onClick={startChoose}>
          开始选课
        </Button>
        <Button variant="contained" onClick={stopChoose} color="error">
          停止选课
        </Button>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={showMsg}
        autoHideDuration={6000}
        onClose={() => setMsg({ msg: '', showMsg: false })}
        message={msg}
      />
    </div>
  );
};

export default Choose;
