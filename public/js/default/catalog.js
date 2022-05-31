export default function (htmlPage) {
    return {
        template: htmlPage,
        data() {
            return {
                products: [],
                categoryName: ''
            }
        },
        watch: {
            '$route.params.categoryENname': function () {
                if (this.$route.name == 'catalog') {
                    window.dispatchEvent(new CustomEvent('productsRequest', { detail: {
                        categoryENname: this.$route.params.categoryENname
                    }}))
                }
            }
        },
        mounted() {
            window.addEventListener('productsDistribution', (event) => {
                this.products = event.detail.products,
                this.categoryName = event.detail.categoryName
            })
            
            window.dispatchEvent(new CustomEvent('productsRequest', { detail: {
                categoryENname: this.$route.params.categoryENname
            }}))
        },
        methods: {
            changeImage(productUuid, photoURL) {
                document.getElementById(productUuid + '-miniGallery').style.backgroundImage = `url(${photoURL})`
            },

            getShortDesc(description) {
                return description.split(' ').slice(0, 27).join(' ') + '. . . '
            },

            getSortedPhotos(photos) {
                var s = photos.sort((a, b) => a.publicID > b.publicID ? 1 : -1);
                return s
            }
        }
    }
}