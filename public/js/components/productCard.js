export default function(htmlCode) {
    return {
        template: htmlCode,
        props: {
            product: {},
            isFavorite: false,
            inBasket: false,
            categoryENname: ''
        },
        methods: {
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
            changeImage(productUuid, photoURL) {
                document.getElementById(productUuid + '-miniGallery').style.backgroundImage = `url(${photoURL})`
            },
            getShortDesc(description) {
                return description.split(' ').slice(0, 27).join(' ') + '... '
            },
            getSortedPhotos(photos) {
                var s = photos.sort((a, b) => a.publicID > b.publicID ? 1 : -1);
                return s
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