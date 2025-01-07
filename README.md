# 四川大学体育课选课抢课程序

------------

packages
文件夹 | 内容
------|------
scu-pecourse-utils | 由底层的加密实现，其他语言实现可以参考这个
scu-pecourse-utils-console | 挂在console上使用
scu-pecourse-utils-dom | 通过实例获取方法

# 使用方法

> 使用的代码位于[packages/scu-pecourse-utils-console/index.js](https://github.com/2239559319/scu-pe-course/blob/master/packages/scu-pecourse-utils-console/index.js)

本代码需要在pc端浏览器使用

在选课前十分钟登录选课系统，进入选课界面。复制下面的代码

<!-- PLACEHOLDER-S -->
```javascript
/**
 * 在console中使用的代码
 */
alert = console.log;
const vm = document.querySelector('.no-skin').__vue__;
const ajax = vm.emitAjax;

function getCurrentTermId() {
  return vm.currentTerm.id;
}
function getClassIdAndTeacherIdByDOM(teacherName) {
  if (vm.$route.name !== 'selectCourse') {
    console.log('请在选课页面操作');
  } else {
    const lists = vm.$children[3].courseClassList;
    for (const course of lists) {
      if (course.teacherName === teacherName) {
        return {
          courseClassId: course.id.toString(),
          teacherUid: course.teacherUid,
        };
      }
    }
  }
}
function getUser() {
  return {
    name: vm.user.name,
    username: vm.user.username,
  };
}
function choose(courseClassId, teacherUid, teacherName, studentUid) {
  return new Promise((resolve, reject) => {
    ajax({
      path: '/api/courses/students',
      type: 'POST',
      data: {
        courseClassId,
        teacherUid,
        teacherName,
        studentUid,
      },
      success(data) {
        resolve(data);
      },
      error(err) {
        reject(err);
      },
    });
  });
}

!((teacherName) => {
  const { courseClassId, teacherUid } =
    getClassIdAndTeacherIdByDOM(teacherName);
  const { username } = getUser();
  let count = 1;
  const timer = setInterval(async () => {
    try {
      const data = await choose(
        courseClassId,
        teacherUid,
        teacherName,
        username
      );
      if (data.code === 200 && data.message === 'OK') {
        console.log('选课成功');
        clearInterval(timer);
      } else {
        console.log(`${count}次选课`);
        count++;
      }
    } catch (err) {
      console.log(err);
    }
  }, 1000);
})('夏廷富');
```
<!-- PLACEHOLDER-E -->

把复制下来的代码最后一行的老师名字改成自己想选的课的老师名字。

在选课页面打开浏览器的调试模式（一般是按F12）。在右边的调试界面里面选择console(控制台)，把刚才改好的代码复制到console里面，在选课前1-3分钟之内按回车运行代码，代码成功运行后会有输出。等能选课之后会自动选课成功并输出。此时可以刷新页面去确定选课结果

# 其他

此程序默认1s发送一次请求，也就是抢一次，所有在开始选课前1分钟运行十分可靠。
