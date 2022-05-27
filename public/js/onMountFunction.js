export default function() {
    window.addEventListener('updateCategories', () => {
        const that = this
        axios.get('/api/getdata/categories')
        .then(function (response) {
            localStorage.setItem('categories', JSON.stringify(response.data))
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

    if (/*localStorage.getItem('categories')*/false) {
        try {
            this.categories = JSON.parse(localStorage.getItem('categories')) 
        } catch(e) {
            localStorage.removeItem('categories')
        }
    }
    else {
        window.dispatchEvent(new Event('updateCategories'))
    }

    
}
