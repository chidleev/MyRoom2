export default function(defaultPageScripts, loggedPageScripts) {
    return [
        { 
            path: "/",
            redirect: "/about"
        },
        {
            path: "/about",
            name: "about",
            component: defaultPageScripts.about
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
                    component: defaultPageScripts.mainCatalog,
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
                            component: "defaultPageScripts.catalog",
                            props: true
                        },
                        {
                            path: ":productName",
                            name: "product",
                            component: defaultPageScripts.product,
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
                    component: loggedPageScripts.profile,
                    meta: {
                        requredLogin: true
                    }
                },
                {
                    path: "login",
                    name: "login",
                    component: defaultPageScripts.login
                },
                {
                    path: "signup",
                    name: "signup",
                    component: defaultPageScripts.signup
                }
            ]
        },
        {
            path: "/basket",
            name: "basket",
            component: loggedPageScripts.Basket,
            meta: {
                requredLogin: true
            }
        }
    ]
}