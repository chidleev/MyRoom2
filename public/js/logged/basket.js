export default function (htmlPage) {
    return {
        template: htmlPage,
        data() {
            return {
                currentTab: 'basket',
                orders: [],
                favoriteProducts: [],
                basketOrders: []
            }
        },
        computed: {
            favoriteOrders: function() {
                return this.basketOrders.filter(basket => basket.status == 0)
            },
            buyOrders: function() {
                return this.basketOrders.filter(basket => basket.status == 1)
            },
            paidOrders: function() {
                return this.basketOrders.filter(basket => basket.status == 2)
            },
            boughtOrders: function() {
                return this.basketOrders.filter(basket => basket.status == 4)
            }
        },
        mounted() {
            window.addEventListener('basketDistribution', event => {
                this.basketOrders = event.detail.basketOrders
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
                            window.dispatchEvent(new Event('updateBasket'))
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