export default function (htmlPage) {
    return {
        template: htmlPage,
        data() {
            return {
                categories: [],
                products: [],
                usersOrders: [],
                selectedCategory: {},
                orderCount: {}
            }
        },
        mounted() {
            window.addEventListener('categoriesDistribution', event => {
                this.categories = event.detail.categories
            })
            window.dispatchEvent(new Event('categoriesRequest'))

            window.addEventListener('productsDistribution', (event) => {
                this.products = event.detail.products
                this.products.forEach(product => {
                    product.wannaDeleteImages = []
                })
            })
            
            const that = this
            axios.get('/api/manager/usersOrders')
                .then(function (response) {
                    that.usersOrders = response.data
                })
                .catch(function (error) {
                    console.log(error)
                })
        },
        computed: {
            checkOrderCount: function() {
                var count = 0
                for (const key in this.orderCount) {
                    if (Object.hasOwnProperty.call(this.orderCount, key)) {
                        count += this.orderCount[key];
                    }
                }
                return count
            }
        },
        watch: {
            selectedCategory: function (newValue) {
                if (!Boolean(newValue.name)) {
                    this.products = [{
                        dimensions: [],
                        photos: []
                    }]
                }
                else {
                    window.dispatchEvent(new CustomEvent('productsRequest', {
                        detail: {
                            categoryENname: newValue.ENname
                        }
                    }))
                }
            }
        },
        methods: {
            takeOrder() {
                const that = this
                axios({
                    url: '/api/manager/takeOrder',
                    method: 'post',
                    data: {
                        ordersCounts: that.orderCount
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
                        that.orderCount = {}
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
            getCountOf(productUuid, status) {
                return Object.keys(this.groupBy(this.groupBy(this.groupBy(this.usersOrders, 'ProductUuid')[productUuid] || [], 'status')[status] || [], 'UserUuid')).length;
            },
            groupBy: function(xs, key) {
                return xs.reduce(function(rv, x) {
                  (rv[x[key]] = rv[x[key]] || []).push(x);
                  return rv;
                }, {});
            }
        }
    }
}