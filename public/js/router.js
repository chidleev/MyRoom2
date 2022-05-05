import getPage from '/js/getPageReq.js'

const About = { template: getPage('about') }
const Catalog = {
    props: ['categoryID'],
    template: getPage('catalog')
}

const routes = [
    { 
        path: '/',
        redirect: '/about'
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/catalog/:categoryID(\\d+)?',
        component: Catalog,
        props: true
    },
    {
        path: '/profile',
        component: Catalog
    },
    {
        path: '/basket',
        component: Catalog
    }
]

export default VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes
})