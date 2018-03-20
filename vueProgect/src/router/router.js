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
                component: () => import(/* webpackChunkName: "login.vue" */ '../components/login/login.vue'),
            },
            {
                path: '/main',
                component: () => import(/* webpackChunkName: "main.vue" */ '../components/main/main.vue'),
                children: [
                    {
                        path: 'recommend',
                        component: () => import(/* webpackChunkName: "recommend.vue" */ '../components/main/recommend.vue'),
                    },
                    {
                        path: 'articlesPage',
                        component: () => import(/* webpackChunkName: "articlesPage.vue" */ '../components/main/articlesPage.vue'),
                    },
                    {
                        path: 'coursesPage',
                        component: () => import(/* webpackChunkName: "coursesPage.vue" */ '../components/main/coursesPage.vue'),
                    },
                    {
                        path: 'questionPage',
                        component: () => import(/* webpackChunkName: "questionPage.vue" */ '../components/main/questionPage.vue'),
                    },
                    {
                        path: 'questionPage/question',
                        component: () => import(/* webpackChunkName: "question.vue" */ '../components/question/question.vue'),
                    },
                    {
                        path: 'articlePage/article/:articleId',
                        component: () => import(/* webpackChunkName: "article.vue" */ '../components/article/article.vue'),
                    },
                ]
            },
            {
                name: "course",
                path: '/course',
                component: () => import(/* webpackChunkName: "courseMain.vue" */ '../components/course/courseMain.vue'),
            },
            {
                name: "userCenter",
                path: '/userCenter',
                component: () => import(/* webpackChunkName: "userCenter.vue" */ '../components/userCenter/userCenter.vue'),
                children: [
                    {
                        path: 'userInfo',
                        component: () => import(/* webpackChunkName: "userInfo.vue" */ '../components/userCenter/userInfo.vue'),
                    },
                    {
                        path: 'record',
                        component: () => import(/* webpackChunkName: "record.vue" */ '../components/userCenter/record.vue'),
                    },
                    {
                        path: 'status',
                        component: () => import(/* webpackChunkName: "status.vue" */ '../components/userCenter/status.vue'),
                    },
                    {
                        path: 'collection',
                        component: () => import(/* webpackChunkName: "collection.vue" */ '../components/userCenter/collection.vue'),
                    },
                    {
                        path: 'informationManage',
                        component: () => import(/* webpackChunkName: "informationManage.vue" */ '../components/userCenter/informationManage.vue'),
                    },
                    {
                        path: 'coursesManage',
                        component: () => import(/* webpackChunkName: "coursesManage.vue" */ '../components/userCenter/coursesManage.vue'),
                    },
                    {
                        path: 'articlesManage',
                        component: () => import(/* webpackChunkName: "articlesManage.vue" */'../components/userCenter/articlesManage.vue'),
                    },
                    {
                        path: 'usersManage',
                        component: () => import(/* webpackChunkName: "usersManage.vue" */ '../components/userCenter/usersManage.vue'),
                    },
                    {
                        path: 'articlesManage/articleEdit',
                        component: () => import(/* webpackChunkName: "myEditor.vue" */ '../components/edit/myEditor.vue'),
                    },
                    {
                        path: 'coursesManage/coursesUpload',
                        component: () => import(/* webpackChunkName: "coursesUpload.vue" */ '../components/userCenter/coursesUpload.vue'),
                    }
                ]
            },
            // {
            //     name: "test",
            //     path: '/test',
            //     component: () => import(/* webpackChunkName: "testUEditor2.vue" */ '../components/test/testUEditor2.vue'),
            // }
        ]
    }
);
export default router;

