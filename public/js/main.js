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



const app = Vue.createApp(settings).mount('div#app')