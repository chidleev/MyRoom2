/* заходит на сайт
запрос категорий - сохраняет в переменную и локалстор
запрос дефолтных страниц - сохраняет в переменную и локал стор
запрос компонентов - сохраняет
чел логинится - получет токен и страницы залогиненного
если имеет права - получает другие страницы
все страницы хранятся одним объектом
 */

import initRouter from '/js/router.js'
import loadComponents from '/js/loadComponents.js'
import onMountFunction from '/js/onMountFunction.js'

const settings = {
    data() {
        return {
            categories: [],
            products: [],
            favoriteProducts: [],
            basketProducts: [],
            pages: {},
            components: {}
        }
    },
    mounted: onMountFunction,
    watch: {},
    methods: {
        logoutReq() {
            axios({
                url: '/api/user/logout',
            })
                .then(response => {
                    if (localStorage.getItem('userAllData')) {
                        localStorage.removeItem('userAllData')
                    }
                    new Toast({
                        title: false,
                        text: "Вы вышли из аккаунта",
                        theme: 'success',
                        autohide: true,
                        interval: 10000
                    })
                    document.getElementById('logout_icon').style.display = 'none'
                    this.$router.push({name: 'login'})
                })
                .catch(error => {
                    error.response.data.errors.forEach(error => {
                        alert(error.comment)
                        this.wrongInput[error.type] = true
                    })
                })
        }
    }
}

const app = Vue.createApp(settings)

app.component('SearchLine', loadComponents.searchLine)
app.component('ProductCard', loadComponents.productCard)
app.component('CommentCard', loadComponents.commentCard)

axios({
    url: '/api/user/checkRole'
})
    .then(response => {
        switch (response.data) {
            case 'admin':
                console.log('its admin');
                document.getElementById('logout_icon').style.display = 'flex'
                initRouter.adminRouter().then(router => {
                    app.use(router)
                    app.mount('div#app')
                })
                break;

            default:
                document.getElementById('logout_icon').style.display = 'flex'
                initRouter.defaultRouter().then(router => {
                    app.use(router)
                    app.mount('div#app')
                })
                break;
        }
    })
    .catch(error => {
        if (localStorage.getItem('userAllData')) {
            localStorage.removeItem('userAllData')
        }
        initRouter.defaultRouter().then(router => {
            app.use(router)
            app.mount('div#app')
        })
    })