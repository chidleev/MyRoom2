export default function (htmlPage) {
    return {
        template: htmlPage,
        data() {
            return {
                currentTab: 'basket',
                orders: [],
                favoriteProducts: [],
                basketProducts: []
            }
        },
        computed: {},
        mounted() {
            window.addEventListener('favoriteDistribution', event => {
                this.favoriteProducts = event.detail.favoriteProducts
            })
            window.dispatchEvent(new Event('favoriteRequest'))

            window.addEventListener('basketDistribution', event => {
                this.basketProducts = event.detail.basketProducts
            })
            window.dispatchEvent(new Event('basketRequest'))
        }
    }
}