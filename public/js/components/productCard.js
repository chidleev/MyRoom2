export default function(htmlCode) {
    return {
        template: htmlCode,
        props: {
            product: {}
        },
        methods: {
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