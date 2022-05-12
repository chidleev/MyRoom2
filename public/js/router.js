import About from '/js/pages/about.js'
import Catalog from '/js/pages/catalog.js'
import MainCatalog from '/js/pages/mainCatalog.js'
import Product from '/js/pages/product.js'
import Profile from '/js/pages/profile.js'
import Basket from '/js/pages/basket.js'
import RegLog from '/js/pages/regLog.js'

const routes = [
    { 
        path: '/',
        redirect: '/about'
    },
    {
        path: '/about',
        name: 'about',
        component: About
    },
    {
        path: '/catalog',
        name: 'mainCatalog',
        component: MainCatalog
    },
    {
        path: '/catalog/:categoryName',
        name: 'catalog',
        component: Catalog,
        props: true
    },
    {
        path: '/catalog/:categoryName/:productName',
        name: 'product',
        component: Product,
        props: true
    },
    {
        path: '/profile',
        name: 'profile',
        component: Profile,
        meta: {
            requredLogin: true
        }
    },
    {
        path: '/reglog',
        name: 'reglog',
        component: RegLog,
    },
    {
        path: '/basket',
        name: 'basket',
        component: Basket,
        meta: {
            requredLogin: true
        }
    }
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if(to.meta.requredLogin && !localStorage.getItem('UUID')){
        next({
            name: "reglog"
        })
    }
    else next()
})

router.beforeEach(async (to, from) => {
    document.getElementById('pageCSSLink').href = `/css/${to.name}.css`
})

export default router