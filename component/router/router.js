import Vue from 'vue';
import VueRouter from "vue-router";
Vue.use(VueRouter);
let router = new VueRouter(
    {
        routes: [
            {
                path: '*',
                component: () => import(/* webpackChunkName: "404page.vue" */ '../components/404page.vue'),
            },
            {
                path: '/',
                redirect: {
                    path: '/testMain',
                }
            },
            {
                path: '/testMain',
                component: () => import(/* webpackChunkName: "index.vue" */ '../index.vue'),
                children: [
                    {
                        path: 'testDiscuss',
                        component: () => import(/* webpackChunkName: "testDiscuss.vue" */ '../test/testDiscuss.vue'),
                    }
                ],
            },
        ]
    }
);
export default router;

