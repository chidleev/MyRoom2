import About from '/js/pages/about.js'
import Catalog from '/js/pages/catalog.js'
import MainCatalog from '/js/pages/mainCatalog.js'
import Product from '/js/pages/product.js'
import Profile from '/js/pages/profile.js'
import Basket from '/js/pages/basket.js'
import Login from '/js/pages/login.js'

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
        component: {
            template: '<searchLine style="width: 90%"/><router-view></router-view>'
        },
        children: [
            {
                path: '',
                name: 'mainCatalog',
                component: MainCatalog,
                props: true
            },
            {
                path: ':categoryName',
                component: {
                    template: '<router-view></router-view>'
                },
                props: true,
                children: [
                    {
                        path: '',
                        name: 'catalog',
                        component: Catalog,
                        props: true
                    },
                    {
                        path: ':productName',
                        name: 'product',
                        component: Product,
                        props: true
                    }
                ]
            }
        ]
    },
    {
        path: '/profile',
        component: {
            template: '<router-view></router-view>'
        },
        children: [
            {
                path: '',
                name: 'profile',
                component: Profile,
                meta: {
                    requredLogin: true
                }
            },
            {
                path: 'login',
                name: 'login',
                component: Login
            }
        ]
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
            name: "login"
        })
    }
    else next()
})

router.beforeEach(async (to, from) => {
    document.getElementById('pageCSSLink').href = `/css/${to.name}.css`
})

export default router