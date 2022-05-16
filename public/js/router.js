import About from '/js/pages/about.js'
import Catalog from '/js/pages/catalog.js'
import MainCatalog from '/js/pages/mainCatalog.js'
import Product from '/js/pages/product.js'
import Profile from '/js/pages/profile.js'
import Basket from '/js/pages/basket.js'
import Login from '/js/pages/login.js'
import Signup from '/js/pages/signup.js'

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
            },
            {
                path: 'signup',
                name: 'signup',
                component: Signup
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

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if(to.meta.requredLogin && !getCookie('token')){
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