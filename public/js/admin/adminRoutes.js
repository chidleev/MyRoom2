export default function(defaultPageScripts, loggedPageScripts, adminPageScripts) {
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
                            component: defaultPageScripts.catalog,
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
                    component: adminPageScripts.profile,
                    meta: {
                        requredLogin: true
                    }
                },
                {
                    path: "category",
                    name: "categoryAdm",
                    component: adminPageScripts.categoryAdm
                },
                {
                    path: "comment",
                    name: "commentAdm",
                    component: adminPageScripts.commentAdm
                },
                {
                    path: "employee",
                    name: "employeeAdm",
                    component: adminPageScripts.employeeAdm
                },
                {
                    path: "product",
                    name: "productAdm",
                    component: adminPageScripts.productAdm
                }
            ]
        },
        {
            path: "/basket",
            name: "basket",
            component: loggedPageScripts.basket,
            meta: {
                requredLogin: true
            }
        }
    ]
}