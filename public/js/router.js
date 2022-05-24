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
    
    router.beforeEach(async (to, from) => {
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
    
    router.beforeEach(async (to, from) => {
        document.getElementById('pageCSSLink').href = `/css/${to.name}.css`
    })

    return router
}

export default { defaultRouter, adminRouter }