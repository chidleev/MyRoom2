import router from '/js/router.js'
import onMountFunction from '/js/onMountFunction.js'

const settings = {
    data() {
        return {
            categories: []
        }
    },
    mounted: onMountFunction,
    computed: {},
    methods: {}
}



const app = Vue.createApp(settings)
app.use(router)

app.mount('div#app')