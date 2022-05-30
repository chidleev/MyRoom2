export default function (htmlPage) {
    return {
        template: htmlPage,
        data() {
            return {
                categoryData: {}
            }
        },
        watch: {
            '$route.params.categoryENname': function () {
                if (this.$route.name == 'catalog') {
                    const that = this
                    axios({
                        url: '/api/getData/productsByCategory',
                        method: 'post',
                        data: {
                            categoryENname: that.$route.params.categoryENname
                        }
                    })
                        .then(response => {
                            this.categoryData = response.data
                        })
                        .catch(error => {
                            error.response.data.errors.forEach(error => {
                                alert(error.comment)
                            });
                        })
                }
            }
        },
        mounted() {
            const that = this
            axios({
                url: '/api/getData/productsByCategory',
                method: 'post',
                data: {
                    categoryENname: that.$route.params.categoryENname
                }
            })
                .then(response => {
                    this.categoryData = response.data
                })
                .catch(error => {
                    error.response.data.errors.forEach(error => {
                        alert(error.comment)
                    });
                })
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