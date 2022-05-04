const About = { template: '<div>About</div>' }
const Catalog = {
    props: ['categoryID'],
    template: '<div>Catalog {{categoryID}}</div>'
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