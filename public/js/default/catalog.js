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
            
        }
    }
}