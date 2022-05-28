export default function() {
    window.addEventListener('updateCategories', () => {
        const that = this
        axios.get('/api/getdata/categories')
        .then(function (response) {
            that.categories = response.data
            window.dispatchEvent(new CustomEvent('categoriesDistribution', { detail: {
                categories: that.categories
            }}))
        })
        .catch(function (error) {
            console.log(error)
        })
    })

    window.addEventListener('categoriesRequest', () => {
        const that = this
        window.dispatchEvent(new CustomEvent('categoriesDistribution', { detail: {
            categories: that.categories
        }}))
    })

    window.dispatchEvent(new Event('updateCategories'))
}
