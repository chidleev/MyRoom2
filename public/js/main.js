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
            pages: {},
            components: {}
        }
    },
    mounted: onMountFunction,
    computed: {},
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
                this.$router.push({name: 'login'})
            })
            .catch(error => {
                alert("Не удалось выйти из аккаунта")
            })
        }
    }
}

const app = Vue.createApp(settings)

app.component('BeatLoader', VueSpinner.BeatLoader)
app.component('searchLine', loadComponents.searchLine)

initRouter.defaultRouter().then(router => {
    app.use(router)
    app.mount('div#app')
})
