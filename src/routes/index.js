import { createWebHashHistory, createRouter } from "vue-router";
import Home from './Home.vue';
import About from './About.vue';
import Movie from './Movie.vue';
import NotFound from './NotFound.vue';

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/movie/:id',
        component: Movie
    },
    {
        path: '/:404(.*)',
        component: NotFound
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    scrollBehavior() {
        // always scroll to top
        return { top: 0 }
    },
    routes,
});

export default router;