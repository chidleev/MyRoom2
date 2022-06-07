export default function(htmlCode) {
    return {
        template: htmlCode,
        props: {
            product: {},
            isFavorite: false
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
                if (!product.rate) {
                    product.rate = Math.round(Math.random() * 5)
                }
                return product.rate
            }
        }
    }
}