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
            categoryData: {},
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
                    alert("Вы вышли из аккаунта")
                    document.getElementById('logout_icon').style.display = 'none'
                    this.$router.go()
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

axios({
    url: '/api/user/checkRole'
})
    .then(response => {
        console.log(response.data);
        switch (response.data) {
            case 'admin':
                console.log('its admin');
                initRouter.adminRouter().then(router => {
                    app.use(router)
                    app.mount('div#app')
                })
                break;

            default:
                console.log('its user');
                initRouter.defaultRouter().then(router => {
                    app.use(router)
                    app.mount('div#app')
                })
                break;
        }
    })
    .catch(error => {
        console.log('its user');
        initRouter.defaultRouter().then(router => {
            app.use(router)
            app.mount('div#app')
        })
    })