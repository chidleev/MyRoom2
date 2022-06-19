export default function (htmlPage) {
    return {
        template: htmlPage,
        data() {
            return {
                shippingOrders: []
            }
        },
        mounted() {
            this.getOrders()
        },
        computed: {
            lastOrders: function() {
                return this.shippingOrders.filter(order => order.deltaTime < 0)
            },
            todayOrders: function() {
                return this.shippingOrders.filter(order => (order.deltaTime <= 1000*60*60*24) && (order.deltaTime > 0))
            },
            tomorrowOrders: function() {
                return this.shippingOrders.filter(order => (order.deltaTime <= 1000*60*60*24*2) && (order.deltaTime > 1000*60*60*24))
            },
            futureOrders: function() {
                return this.shippingOrders.filter(order => order.deltaTime > 1000*60*60*24*2)
            }
        },
        methods: {
            getOrders() {
                const that = this
                axios.get('/api/accountant/shippingOrders')
                    .then(function (response) {
                        that.shippingOrders = response.data
                        that.shippingOrders.forEach(order => {
                            order['deltaTime'] = new Date(order.daliveryDate) - Date.now()
                        });
                    })
                    .catch(function (error) {
                        console.log(error)
                    })
            },
            updateProductsCounts() {
                axios({
                    url: '/api/accountant/updateProductsCounts'
                })
                    .then(function (response) {
                        new Toast({
                            title: false,
                            text: response.data,
                            theme: 'success',
                            autohide: true,
                            interval: 2000
                        })
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
                        })
                    })
            },
            ordersToExcel() {
                axios({
                    url: '/api/accountant/ordersToExcel', //your url
                    method: 'GET',
                    responseType: 'blob'
                })
                    .then(function (response) {
                        const url = window.URL.createObjectURL(new Blob([response.data]));
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', 'shippingOrders.xlsx'); //or any other extension
                        link.click();
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
                        })
                    })
            },
            getDate(date) {
                return new Date(date).toLocaleDateString("ru-RU")
            }
        }
    }
}