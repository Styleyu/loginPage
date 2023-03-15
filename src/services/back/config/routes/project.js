export default {
    path: 'project',
    component: () => import('@/services/back/views/project/ProjectProgressView.vue'),
    menuName: '项目进度',
    menuIcon: '',
    children: [
      {
        path: 'commit',
        component: () => import('_back/views/project/ProjectCommitView.vue'),
        menuName: '提交新项目',
        menuIcon: '',
      },
      {
        path: 'examine',
        component: () => import('_back/views/project/ProjectExamineView.vue'),
        menuName: '项目审批',
        menuIcon: '',
      }
    ]
  }