var defaultPages = {}
var loggedPages = {}

const request = new XMLHttpRequest()
request.open('GET', '/api/gethtml/default', false)
request.send()
if (request.status == 200) {
    defaultPages = JSON.parse(request.responseText)
}

request.open('GET', '/api/gethtml/logged', false)
request.send()
if (request.status == 200) {
    loggedPages = JSON.parse(request.responseText)
}

export default function(defaultPageScripts, loggedPageScripts) {
    return [
        { 
            path: "/",
            redirect: "/about"
        },
        {
            path: "/about",
            name: "about",
            component: defaultPageScripts.about(defaultPages.about)
        },
        {
            path: "/catalog",
            component: {
                template: "<router-view></router-view>"
            },
            children: [
                {
                    path: "",
                    redirect: { name: 'catalog', params: { categoryENname: 'Sofas' }}
                },
                {
                    path: ":categoryENname",
                    component: {
                        template: "<router-view></router-view>"
                    },
                    props: true,
                    children: [
                        {
                            path: "",
                            name: "catalog",
                            component: defaultPageScripts.catalog(defaultPages.catalog),
                            props: true
                        },
                        {
                            path: ":productName",
                            name: "product",
                            component: defaultPageScripts.product(defaultPages.product),
                            props: true
                        }
                    ]
                }
            ]
        },
        {
            path: "/profile",
            name: "mainProfile",
            component: {
                template: "<router-view></router-view>"
            },
            children: [
                {
                    path: "",
                    name: "profile",
                    component: loggedPageScripts.profile(loggedPages.profile),
                    meta: {
                        requredLogin: true
                    }
                },
                {
                    path: "login",
                    name: "login",
                    component: defaultPageScripts.login(defaultPages.login)
                },
                {
                    path: "signup",
                    name: "signup",
                    component: defaultPageScripts.signup(defaultPages.signup)
                }
            ]
        },
        {
            path: "/basket",
            name: "basket",
            component: loggedPageScripts.basket(loggedPages.basket),
            meta: {
                requredLogin: true
            }
        }
    ]
}