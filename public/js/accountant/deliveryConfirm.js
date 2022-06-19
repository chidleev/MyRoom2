export default function (htmlPage) {
    return {
        template: htmlPage,
        data() {
            return {
                deliveryOrders: []
            }
        },
        mounted() {
            this.getOrders()
        },
        methods: {
            getOrders() {
                const that = this
                axios.get('/api/accountant/deliveryOrders')
                    .then(function (response) {
                        console.log(response);
                        that.deliveryOrders = response.data
                    })
                    .catch(function (error) {
                        console.log(error)
                    })
            },
            confirmDelivery(order) {
                const that = this
                axios({
                    url: '/api/accountant/confirmDelivery',
                    method: 'post',
                    data: {
                        orderUuid: order.uuid
                    }
                })
                    .then(function (response) {
                        new Toast({
                            title: false,
                            text: response.data,
                            theme: 'success',
                            autohide: true,
                            interval: 2000
                        });
                        that.getOrders()
                    })
                    .catch(err => {
                        err.response.data.errors.forEach(error => {
                            new Toast({
                                title: false,
                                text: error.comment,
                                theme: 'warning',
                                autohide: true,
                                interval: 10000
                            })
                        });
                    })
            },
            groupBy: function (xs, key) {
                return xs.reduce(function (rv, x) {
                    (rv[x[key]] = rv[x[key]] || []).push(x);
                    return rv;
                }, {});
            },
            getDate(date) {
                return new Date(date).toLocaleDateString("ru-RU")
            }
        }
    }
}