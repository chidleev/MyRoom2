import router from '/js/router.js'
import getPage from '/js/getPageReq.js'
import onMountFunction from '/js/onMountFunction.js'

const settings = {
    data() {
        return {
            categories: []
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
                if (localStorage.getItem('userData')) {
                    localStorage.removeItem('userData')
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

app.use(router)

app.component('BeatLoader', VueSpinner.BeatLoader)
app.component('searchLine', {
    template: getPage('components').searchLine
})

app.mount('div#app')