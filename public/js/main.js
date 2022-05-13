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
        logoutReqest() {

        },
        isLogin() {
            if (localStorage.getItem('UUID')) {
                return true
            }
            return false
        }
    }
}



const app = Vue.createApp(settings)

app.use(router)

app.component('searchLine', {
    template: getPage('components').searchLine
})

app.mount('div#app')