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
        },
        methods: {
            canBuyNow(basket) {
                return basket.filter(basketOrder => basketOrder.Product.count)
            },
            canBuyLater(basket) {
                return basket.filter(basketOrder => !basketOrder.Product.count)
            },
            getTotalPrice(basket) {
                var sum = 0
                basket.forEach(basketOrder => {
                    sum += basketOrder.Product.price
                })
                return sum
            },
            buyProducts(basketOrders) {
                var basketOrderUUIDs = []
                basketOrders.forEach(basketOrder => {
                    basketOrderUUIDs.push(basketOrder.uuid)
                })
                if (basketOrderUUIDs.length > 0) {
                    var that = this
                    axios({
                        url: '/api/user/buyProducts',
                        method: 'post',
                        data: {
                            basketOrderUUIDs: basketOrderUUIDs
                        }
                    })
                        .then(response => {
                            new Toast({
                                title: false,
                                text: response.data,
                                theme: 'success',
                                autohide: true,
                                interval: 5000
                            });
                            window.dispatchEvent(new Event('basketRequest'))
                        })
                        .catch(error => {
                            console.log(error);
                            error.response.data.errors.forEach(error => {
                                new Toast({
                                    title: false,
                                    text: error.comment,
                                    theme: 'warning',
                                    autohide: true,
                                    interval: 10000
                                })
                            })
                        })
                }
            }
        }
    }
}