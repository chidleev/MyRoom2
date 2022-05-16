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
            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
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