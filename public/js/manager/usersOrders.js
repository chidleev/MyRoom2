export default function (htmlPage) {
    return {
        template: htmlPage,
        data() {
            return {
                categories: [],
                products: [],
                usersOrders: [],
                selectedCategory: {},
                selectedProduct: {},
                user: {}
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
                    url: '/api/manager/userBasketOrder',
                    method: 'post',
                    data: {
                        user: that.user,
                        productUuid: that.selectedProduct.uuid
                    }
                })
                    .then(function (response) {
                        new Toast({
                            title: false,
                            text: response.data,
                            theme: 'success',
                            autohide: true,
                            interval: 2000
                        })
                        that.selectedCategory = {}
                        that.selectedProduct = {}
                        that.user = {}
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