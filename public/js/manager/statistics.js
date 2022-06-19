export default function (htmlPage) {
    return {
        template: htmlPage,
        data() {
            return {
                categories: [],
                products: [],
                usersOrders: [],
                selectedCategory: {}
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