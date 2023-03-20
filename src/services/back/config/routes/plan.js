export default {
    path: 'plan',
    menuName: '培养方案',
    component: () => import('_back/views/plan/PlanRootView.vue'),
    children: [
        {
            path: 'create',
            menuName: '制定培养方案',
            component: ()=>import('_back/views/plan/PlanCreatView.vue')
        },
        {
            path: 'overView',
            menuName: '培养方案总览',
            component: () => import('_back/views/plan/PlanMainView.vue')
        },
        {
            path: 'read',
            menuName: '查看培养方案',
            component: () => import('_back/views/plan/PlanReadView.vue')
        }
    ]
}
