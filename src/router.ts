import VueRouter from 'vue-router';
import Home from './pages/Builder.vue';
import MainWeapons from './pages/MainWeapons.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/main', component: MainWeapons }
];

export default VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
});