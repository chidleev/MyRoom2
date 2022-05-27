export default function (htmlPage) {
    return {
        template: htmlPage,
        data() {
            return {
                categories: [],
                selectedCategory: {}
            }
        },
        mounted() {
            window.addEventListener('categoriesDistribution', event => {
                this.categories = event.detail.categories
            })
            window.dispatchEvent(new Event('categoriesRequest'))
        },
        computed: {
            products() {
                if (!Boolean(this.selectedCategory)) return []

            }
        }
    }
}