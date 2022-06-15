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
                    materials: [],
                    price: 0,
                    Comments: []
                },
                inBasket: false,
                inFavorite: false
            }
        },
        mounted() {
            window.addEventListener('productsDistribution', this.gettingProduct)
            window.addEventListener('categoriesDistribution', this.reqProduct)
            window.addEventListener('favoriteDistribution', this.setInFavorite)
            window.addEventListener('basketDistribution', this.setInBasket)

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
            window.removeEventListener('favoriteDistribution', this.setInFavorite)
            window.removeEventListener('basketDistribution', this.setInBasket)
        },
        methods: {
            gettingProduct(event) {
                this.product = event.detail.products.find(product => product.name == this.$route.params.productName)
                this.product.newRate = 1
                window.dispatchEvent(new Event('favoriteRequest'))
                window.dispatchEvent(new Event('basketRequest'))
            },
            reqProduct(event) {
                window.dispatchEvent(new CustomEvent('productsRequest', {
                    detail: {
                        categoryENname: this.$route.params.categoryENname,
                        searchLine: this.$route.params.productName
                    }
                }))
            },
            setInBasket(event) {
                this.inBasket = event.detail.basketProducts.find(basket => basket.Product.name == this.product.name)
            },
            setInFavorite(event) {
                this.inFavorite = event.detail.favoriteProducts.find(favorite => favorite.Product.name == this.product.name)
            },
            toggleFavorite(product) {
                axios({
                    url: '/api/user/toggleFavorite',
                    method: 'post',
                    data: {
                        productUuid: product.uuid
                    }
                })
                    .then(res => {
                        new Toast({
                            title: false,
                            text: res.data,
                            theme: 'success',
                            autohide: true,
                            interval: 2000
                        });
                        window.dispatchEvent(new Event('updateFavorite'))
                    })
                    .catch(err => {
                        err.response.data.errors.forEach(error => {
                            new Toast({
                                title: false,
                                text: error.comment,
                                theme: 'warning',
                                autohide: true,
                                interval: 2000
                            });
                        });
                    })
            },
            toggleBasket(product) {
                axios({
                    url: '/api/user/toggleBasket',
                    method: 'post',
                    data: {
                        productUuid: product.uuid
                    }
                })
                    .then(res => {
                        new Toast({
                            title: false,
                            text: res.data,
                            theme: 'success',
                            autohide: true,
                            interval: 2000
                        });
                        window.dispatchEvent(new Event('updateBasket'))
                    })
                    .catch(err => {
                        err.response.data.errors.forEach(error => {
                            new Toast({
                                title: false,
                                text: error.comment,
                                theme: 'warning',
                                autohide: true,
                                interval: 2000
                            });
                        });
                    })
            },
            sendComment() {
                const that = this
                axios({
                    url: '/api/user/sendComment',
                    method: 'post',
                    data: {
                        productUuid: that.product.uuid,
                        content: that.product.newComment,
                        productRate: that.product.newRate
                    }
                })
                    .then(res => {
                        new Toast({
                            title: false,
                            text: res.data,
                            theme: 'success',
                            autohide: true,
                            interval: 2000
                        });
                        window.dispatchEvent(new CustomEvent('productsRequest', {
                            detail: {
                                categoryENname: this.$route.params.categoryENname,
                                searchLine: this.$route.params.productName
                            }
                        }))
                    })
                    .catch(err => {
                        err.response.data.errors.forEach(error => {
                            new Toast({
                                title: false,
                                text: error.comment,
                                theme: 'warning',
                                autohide: true,
                                interval: 2000
                            });
                        });
                    })
            },
            getProductRate(product) {
                if (product.Comments.length) {
                    var sum = 0
                    product.Comments.forEach(comment => {
                        sum += comment.productRate
                    })
                    return Math.round(sum/product.Comments.length)
                }
                else return 0
            }
        }
    }
}