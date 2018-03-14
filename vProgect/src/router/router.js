import Vue from 'vue';
import VueRouter from "vue-router";
Vue.use(VueRouter);
let router = new VueRouter(
    {
        routes: [
            {
                path: '/',
                redirect: {
                    path: '/main/recommend',
                }
            },
            {
                name: "login",
                path: '/login',
                component: () => import('../components/login/login.vue'),
            },
            {
                path: '/main',
                component: () => import('../components/main/main.vue'),
                children: [
                    {
                        path: 'recommend',
                        component: () => import('../components/main/recommend.vue'),
                    },
                    {
                        path: 'articlesPage',
                        component: () => import('../components/main/articlesPage.vue'),
                    },
                    {
                        path: 'coursesPage',
                        component: () => import('../components/main/coursesPage.vue'),
                    },
                    {
                        path: 'questionPage',
                        component: () => import('../components/main/questionPage.vue'),
                    },
                    {
                        path: 'questionPage/question',
                        component: () => import('../components/question/question.vue'),
                    },
                    {
                        path: 'articlePage/article/:articleId',
                        component: () => import('../components/article/article.vue'),
                    },
                ]
            },
            {
                name: "course",
                path: '/course',
                component: () => import('../components/course/courseMain.vue'),
            },
            {
                name: "userCenter",
                path: '/userCenter',
                component: () => import('../components/userCenter/userCenter.vue'),
                children: [
                    {
                        path: 'userInfo',
                        component: () => import('../components/userCenter/userInfo.vue'),
                    },
                    {
                        path: 'record',
                        component: () => import('../components/userCenter/record.vue'),
                    },
                    {
                        path: 'status',
                        component: () => import('../components/userCenter/status.vue'),
                    },
                    {
                        path: 'collection',
                        component: () => import('../components/userCenter/collection.vue'),
                    },
                    {
                        path: 'informationManage',
                        component: () => import('../components/userCenter/informationManage.vue'),
                    },
                    {
                        path: 'coursesManage',
                        component: () => import('../components/userCenter/coursesManage.vue'),
                    },
                    {
                        path: 'articlesManage',
                        component: () => import('../components/userCenter/articlesManage.vue'),
                    },
                    {
                        path: 'usersManage',
                        component: () => import('../components/userCenter/usersManage.vue'),
                    },
                    {
                        path: 'articlesManage/articleEdit',
                        component: () => import('../components/edit/myEditor.vue'),
                    },
                    {
                        path: 'coursesManage/coursesUpload',
                        component: () => import('../components/userCenter/coursesUpload.vue'),
                    }
                ]
            },
            {
                name: "test",
                path: '/test',
                component: () => import('../components/test/testDiscuss.vue'),
            }
        ]
    }
);
export default router;

