export default function (htmlPage) {
    return {
        template: htmlPage,
        data() {
            return {
                products: [],
                basketOrders: [],
                categoryName: '',
                searchLineText: ''
            }
        },
        watch: {
            '$route.params.categoryENname': function () {
                if (this.$route.name == 'catalog') {
                    window.dispatchEvent(new CustomEvent('productsRequest', {
                        detail: {
                            categoryENname: this.$route.params.categoryENname,
                            searchLine: this.searchLineText
                        }
                    }))
                }
            },
            'searchLineText': function () {
                window.dispatchEvent(new CustomEvent('productsRequest', {
                    detail: {
                        categoryENname: this.$route.params.categoryENname,
                        searchLine: this.searchLineText
                    }
                }))
            }
        },
        computed: {
            favoriteOrders: function() {
                return this.basketOrders.filter(basket => basket.status == 0)
            },
            buyOrders: function() {
                return this.basketOrders.filter(basket => basket.status == 1)
            },
        },
        mounted() {
            window.addEventListener('productsDistribution', event => {
                this.products = event.detail.products
                this.categoryName = event.detail.categoryName
            })
            window.addEventListener('basketDistribution', event => {
                this.basketOrders = event.detail.basketOrders || []
            })
            window.addEventListener('categoriesDistribution', event => {
                window.dispatchEvent(new CustomEvent('productsRequest', {
                    detail: {
                        categoryENname: this.$route.params.categoryENname,
                        searchLine: this.searchLineText
                    }
                }))
            })
            window.dispatchEvent(new Event('categoriesRequest'))
            window.dispatchEvent(new Event('basketRequest'))
        }
    }
}