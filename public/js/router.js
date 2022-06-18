/* Написать инициализацию роутеров для пользователя, админа, бухгалтера и менеджера */

import getPageScripts from '/js/getPageScripts.js'

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

async function defaultRouter() {
    const defaultPageScripts = await getPageScripts.defaultScripts()
    const loggedPageScripts = await getPageScripts.loggedScripts()

    const getRoutes = await import('/js/pageScript/defaultRoutes.js')
    const routes = getRoutes.default(defaultPageScripts, loggedPageScripts)

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
        else if ((to.name == 'login' || to.name == 'signup') && getCookie('token')) {
            next({
                name: "profile"
            })
        }
        else next()
    })
    
    router.beforeEach((to, from) => {
        document.getElementById('pageCSSLink').href = `/css/${to.name}.css`
    })

    return router
}

async function adminRouter() {
    var defaultPageScripts = await getPageScripts.defaultScripts()
    var loggedPageScripts = await getPageScripts.loggedScripts()
    var adminPageScripts = await getPageScripts.adminScripts()

    const getRoutes = await import('/js/pageScript/adminRoutes.js')
    const routes = getRoutes.default(defaultPageScripts, loggedPageScripts, adminPageScripts)

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
        else if ((to.name == 'login' || to.name == 'signup') && getCookie('token')) {
            next({
                name: "profile"
            })
        }
        else next()
    })
    
    router.beforeEach((to, from) => {
        document.getElementById('pageCSSLink').href = `/css/${to.name}.css`
    })

    return router
}

async function accountantRouter() {
    var router = await defaultRouter()
    var defaultPageScripts = await getPageScripts.defaultScripts()
    var accountantPageScripts = await getPageScripts.accountantScripts()

    var defaultPages = {}
    var accountantPages = {}

    const request = new XMLHttpRequest()
    request.open('GET', '/api/gethtml/default', false)
    request.send()
    if (request.status == 200) {
        defaultPages = JSON.parse(request.responseText)
    }

    request.open('GET', '/api/gethtml/accountant', false)
    request.send()
    if (request.status == 200) {
        accountantPages = JSON.parse(request.responseText)
    }

    router.removeRoute('profile')
    router.addRoute('mainProfile', {
        path: "",
        name: "profile",
        component: accountantPageScripts.accountanPprofile(accountantPages.accountanPprofile)
    })

    router.addRoute('mainProfile', {
        path: "deliveryConfirm",
        name: "deliveryConfirm",
        component: accountantPageScripts.deliveryConfirm(accountantPages.deliveryConfirm)
    })

    router.addRoute('mainProfile', {
        path: "paymentConfirm",
        name: "paymentConfirm",
        component: accountantPageScripts.paymentConfirm(accountantPages.paymentConfirm)
    })

    router.addRoute('mainProfile', {
        path: "shippingConfirm",
        name: "shippingConfirm",
        component: accountantPageScripts.shippingConfirm(accountantPages.shippingConfirm)
    })

    router.addRoute('mainProfile', {
        path: "login",
        name: "login",
        component: defaultPageScripts.login(defaultPages.login)
    })

    router.addRoute('mainProfile', {
        path: "signup",
        name: "signup",
        component: defaultPageScripts.signup(defaultPages.signup)
    })

    return router
}

async function managerRouter() {
    var router = await defaultRouter()
    var defaultPageScripts = await getPageScripts.defaultScripts()
    var managerPageScripts = await getPageScripts.managerScripts()

    var defaultPages = {}
    var managerPages = {}

    const request = new XMLHttpRequest()
    request.open('GET', '/api/gethtml/default', false)
    request.send()
    if (request.status == 200) {
        defaultPages = JSON.parse(request.responseText)
    }

    request.open('GET', '/api/gethtml/manager', false)
    request.send()
    if (request.status == 200) {
        managerPages = JSON.parse(request.responseText)
    }

    router.removeRoute('profile')
    router.addRoute('mainProfile', {
        path: "",
        name: "profile",
        component: managerPageScripts.managerProfile(managerPages.managerProfile)
    })

    router.addRoute('mainProfile', {
        path: "statistics",
        name: "statistics",
        component: managerPageScripts.statistics(managerPages.statistics)
    })

    router.addRoute('mainProfile', {
        path: "orders",
        name: "orders",
        component: managerPageScripts.orders(managerPages.orders)
    })

    router.addRoute('mainProfile', {
        path: "usersOrders",
        name: "usersOrders",
        component: managerPageScripts.usersOrders(managerPages.usersOrders)
    })

    router.addRoute('mainProfile', {
        path: "login",
        name: "login",
        component: defaultPageScripts.login(defaultPages.login)
    })

    router.addRoute('mainProfile', {
        path: "signup",
        name: "signup",
        component: defaultPageScripts.signup(defaultPages.signup)
    })

    return router
}


export default { defaultRouter, adminRouter, accountantRouter, managerRouter }