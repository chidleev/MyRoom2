import getPage from '/js/getPageReq.js'
export default {
    template: getPage('default').catalog,
    data() {
        return {
            categoryData: {}
        }
    },
    watch: {
        '$route.params.categoryENname': function() {
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
        changeImage(productUuid, n) {
            const colors = ['var(--light-1)', 'orange', 'green', 'yellow' ]
            document.getElementById(productUuid+'-miniGallery').style.backgroundColor = colors[n-1]
        },

        getShortDesc(description) {
            return description.split(' ').slice(0, 27).join(' ') + '. . . '
        }
    }
}