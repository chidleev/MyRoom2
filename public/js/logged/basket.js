export default function (htmlPage) {
    return {
        template: htmlPage,
        data() {
            return {
                currentTab: 'basket',
                orders: [],
                favoriteProducts: []
            }
        },
        computed: {},
        mounted() {
            window.addEventListener('favoriteDistribution', event => {
                this.favoriteProducts = event.detail.favoriteProducts
            })
            window.dispatchEvent(new Event('favoriteRequest'))
        }
    }
}