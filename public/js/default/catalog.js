export default function (htmlPage) {
    return {
        template: htmlPage,
        data() {
            return {
                products: [],
                favoriteProducts: [],
                basketProducts: [],
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
        mounted() {
            window.addEventListener('productsDistribution', event => {
                this.products = event.detail.products
                this.categoryName = event.detail.categoryName
            })
            window.addEventListener('favoriteDistribution', event => {
                this.favoriteProducts = event.detail.favoriteProducts
            })
            window.addEventListener('basketDistribution', event => {
                this.basketProducts = event.detail.basketProducts
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
            window.dispatchEvent(new Event('favoriteRequest'))
            window.dispatchEvent(new Event('basketRequest'))
        }
    }
}