export default {
    path: 'project',
    component: () => import('@/services/back/views/project/ProjectRootView.vue'),
    menuName: '学生项目',
    menuIcon: '',
    children: [
      {
        path: 'commit',
        component: () => import('_back/views/project/ProjectCommitView.vue'),
        menuName: '项目提交',
        menuIcon: '',
      },
      {
        path: 'progress',
        component: () => import('_back/views/project/ProjectProgressView.vue'),
        menuName: '项目进度',
        menuIcon: '',
      },
      {
        path: 'progress_details',
        component: () => import('_back/views/project/ProjectProgressDetailsView.vue'),
        menuName: '项目进度详情(方便查看)',
        menuIcon: '',
      },
      {
        path: 'examine',
        component: () => import('_back/views/project/ProjectExamineView.vue'),
        menuName: '项目审批',
        menuIcon: '',
      },
      {
        path: 'examine_details',
        component: () => import('_back/views/project/ProjectExamineDetailsView.vue'),
        menuName: '项目审批详情(方便查看)',
        menuIcon: '',
      },
      
    ]
  }