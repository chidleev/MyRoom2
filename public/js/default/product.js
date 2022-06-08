export default function (htmlPage) {
    return {
        template: htmlPage,
        props: {
            categoryENname: '',
            productName: ''
        },
        data() {
            return {
                product: {
                    dimensions: [],
                    materials: []
                }
            }
        },
        mounted() {
            window.addEventListener('productsDistribution', this.gettingProduct)
            window.addEventListener('categoriesDistribution', this.reqProduct)

            window.dispatchEvent(new Event('categoriesRequest'))

            var onAppend = function (elem, f) {
                var observer = new MutationObserver(function (mutations) {
                    mutations.forEach(function (m) {
                        if (m.addedNodes.length) {
                            f(m.addedNodes)
                        }
                    })
                })
                observer.observe(elem, { childList: true })
            }

            onAppend(document.querySelector('.carousel'), function (added) {
                var carousel = document.querySelector('.carousel');
                var flkty = new Flickity(carousel, {
                    wrapAround: true,
                    autoPlay: true,
                    imagesLoaded: true,
                    percentPosition: false,
                });
            })
        },
        beforeDestroy() {
            window.removeEventListener('productsDistribution', this.gettingProduct)
            window.removeEventListener('categoriesDistribution', this.reqProduct)
        },
        methods: {
            gettingProduct(event) {
                this.product = event.detail.products.find(product => product.name == this.$route.params.productName)
            },
            reqProduct(event) {
                window.dispatchEvent(new CustomEvent('productsRequest', {
                    detail: {
                        categoryENname: this.$route.params.categoryENname,
                        searchLine: this.$route.params.productName
                    }
                }))
            }
        }
    }
}