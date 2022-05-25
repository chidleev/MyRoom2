var defaultPages = {}
var loggedPages = {}
var adminPages = {}

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

request.open('GET', '/api/gethtml/admin', false)
request.send()
if (request.status == 200) {
    adminPages = JSON.parse(request.responseText)
}

export default function(defaultPageScripts, loggedPageScripts, adminPageScripts) {
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
                template: "<searchLine/><router-view></router-view>"
            },
            children: [
                {
                    path: "",
                    name: "mainCatalog",
                    component: defaultPageScripts.mainCatalog(defaultPages.mainCatalog),
                    props: true
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
            component: {
                template: "<router-view></router-view>"
            },
            children: [
                {
                    path: "",
                    name: "profile",
                    component: adminPageScripts.profileAdm(adminPages.profileAdm),
                    meta: {
                        requredLogin: true
                    },
                    children: [
                        {
                            path: "category",
                            name: "categoryAdm",
                            component: adminPageScripts.categoryAdm(adminPages.categoryAdm)
                        },
                        {
                            path: "comment",
                            name: "commentAdm",
                            component: adminPageScripts.commentAdm(adminPages.commentAdm)
                        },
                        {
                            path: "employee",
                            name: "employeeAdm",
                            component: adminPageScripts.employeeAdm(adminPages.employeeAdm)
                        },
                        {
                            path: "product",
                            name: "productAdm",
                            component: adminPageScripts.productAdm(adminPages.productAdm)
                        }
                    ]
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