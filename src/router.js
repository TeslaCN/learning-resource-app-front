import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        },
        {
            path: '/search',
            // name: "search",
            component: () => import('./views/Search')
        },
        {
            path: '/search/:text',
            // name: "search",
            component: () => import('./views/Search')
        },
        {
            path: '/sign-in',
            component: () => import('./views/SignIn'),
            meta: {
                requireUnsigned: true
            },
        },
        {
            path: '/sign-up',
            component: () => import('./views/SignUp'),
            meta: {
                requireUnsigned: true
            },
        },
        {
            path: '/problem',
            component: () => import('./views/Problem'),
            meta: {
                requireSignIn: true,
                roles: ['ROLE_USER'],
            }
        },
        {
            path: '/problem/:title',
            component: () => import('./views/Coding'),
            meta: {
                requireSignIn: true,
                roles: ['ROLE_USER'],
            }
        },
        {
            path: '/publish-resource',
            component: () => import('./views/PublishResource'),
            meta: {
                requireSignIn: true,
                roles: ['ROLE_USER'],
            }
        },
        {
            path: '/publish-problem',
            component: () => import('./views/PublishProblem'),
            meta: {
                requireSignIn: true,
                roles: ['ROLE_ADMIN'],
            }
        },
        {
            path: '/resource/:resourceId',
            component: () => import('./views/Resource')
        },
        {
            path: '/sign-out',
            component: () => import('./views/SignOut'),
            meta: {
                requireSignIn: true,
            }
        },
        {
            path: '/access-denied',
            component: () => import('./views/AccessDenied'),
        },
        {
            path: '/submission',
            component: () => import('./views/Submission'),
            meta: {
                requireSignIn: true,
            }
        },
        {
            path: '/submission/:submissionId',
            component: () => import('./views/SubmissionDetail'),
            meta: {
                requireSignIn: true,
            }
        },
        {
            path: '/browse-history',
            component: () => import('./views/BrowseHistory'),
            meta: {
                requireSignIn: true,
            }
        },
        {
            path: '/search-tag',
            component: () => import('./views/SearchTag'),
        }
    ]
})
