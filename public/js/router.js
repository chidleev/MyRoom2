import About from '/js/pages/about.js'
import Catalog from '/js/pages/catalog.js'
import MainCatalog from '/js/pages/mainCatalog.js'
import Product from '/js/pages/product.js'
import Profile from '/js/pages/profile.js'
import Basket from '/js/pages/basket.js'

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
        path: '/catalog',
        component: MainCatalog
    },
    {
        path: '/catalog/:categoryName',
        component: Catalog,
        props: true
    },
    {
        path: '/catalog/:categoryName/:productName',
        component: Product,
        props: true
    },
    {
        path: '/profile',
        component: Profile
    },
    {
        path: '/basket',
        component: Basket
    }
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes
})

router.beforeEach(async (to, from) => {
    document.getElementById('pageCSSLink').href = `/css/${to.fullPath.split('/')[1]}.css`
})

export default router