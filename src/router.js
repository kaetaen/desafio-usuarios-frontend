import { createRouter, createWebHistory } from 'vue-router'

import Home  from './pages/Home.vue'
import Register  from './pages/Register.vue'
import Edit from './pages/Edit.vue'
import View  from './pages/View.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/register',
        name: 'UserRegister',
        component: Register
    },
    {
        path: '/edit',
        name: 'EditUser',
        component: Edit
    },
    {
        path: '/view',
        name: 'ViewUser',
        component: View
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})


export default router