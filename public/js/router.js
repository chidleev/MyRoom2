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
        path: '/reglog',
        component: RegLog
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

/*router.beforeEach(async (to, from, next) => {
    var t = {path: '/reglog'}
    if (!localStorage.getItem('UUID') && to.name != 'reglog') {
        next(t)
    }
    else {
        t = to
        next(t)
    }
})*/

router.beforeEach(async (to, from) => {
    console.log(to.fullPath.split('/')[1]);
    document.getElementById('pageCSSLink').href = `/css/${to.fullPath.split('/')[1]}.css`
})

export default router