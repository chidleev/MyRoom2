async function defaultScripts() {
    const pages = ['about', 'mainCatalog', 'catalog', 'product', 'login', 'signup']
    const pageScripts = {}

    for (var pageName of pages) {
        const pageScript = await import(`/js/pageScript/${pageName}.js`)
        pageScripts[pageName] = pageScript.default
    }

    return pageScripts
}

async function loggedScripts() {
    const pages = ['profile', 'basket']
    const pageScripts = {}

    for (var pageName of pages) {
        const pageScript = await import(`/js/pageScript/${pageName}.js`)
        pageScripts[pageName] = pageScript.default
    }

    return pageScripts
}

async function adminScripts() {
    const pages = ['categoryAdm', 'commentAdm', 'employeeAdm', 'productAdm', 'profileAdm']
    const pageScripts = {}

    for (var pageName of pages) {
        const pageScript = await import(`/js/pageScript/${pageName}.js`)
        pageScripts[pageName] = pageScript.default
    }

    return pageScripts
}

async function accountantScripts() {
    const pages = ['deliveryConfirm', 'paymentConfirm', 'shippingConfirm', 'accountanPprofile']
    const pageScripts = {}

    for (var pageName of pages) {
        const pageScript = await import(`/js/pageScript/${pageName}.js`)
        pageScripts[pageName] = pageScript.default
    }

    return pageScripts
}

async function managerScripts() {
    const pages = ['statistics', 'orders', 'usersOrders', 'managerProfile']
    const pageScripts = {}

    for (var pageName of pages) {
        const pageScript = await import(`/js/pageScript/${pageName}.js`)
        pageScripts[pageName] = pageScript.default
    }

    return pageScripts
}

export default { defaultScripts, loggedScripts, adminScripts, accountantScripts, managerScripts }