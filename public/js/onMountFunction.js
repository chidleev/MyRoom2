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
        window.dispatchEvent(new CustomEvent('categoriesDistribution', { detail: {
            categories: this.categories
        }}))
    })

    window.addEventListener('productsRequest', (event) => {
        const that = this
        axios({
            url: '/api/getData/productsSearch',
            method: 'post',
            data: {
                categoryUUID: that.categories.find(category => category.ENname == event.detail.categoryENname).uuid,
                searchLine: event.detail.searchLine
            }
        })
            .then(response => {
                that.products = response.data
                window.dispatchEvent(new CustomEvent('productsDistribution', { detail: {
                    products: that.products,
                    categoryName: that.categories.find(category => category.ENname == event.detail.categoryENname).name
                }}))
            })
            .catch(error => {
                console.log(error);
                error.response.data.errors.forEach(error => {
                    new Toast({
                        title: false,
                        text: error.comment,
                        theme: 'warning',
                        autohide: true,
                        interval: 10000
                    })
                });
            })
    })

    window.addEventListener('updateFavorite', () => {
        const that = this
        axios.get('/api/user/getFavorite')
        .then(response => {
            that.favoriteProducts = response.data
            window.dispatchEvent(new CustomEvent('favoriteDistribution', { detail: {
                favoriteProducts: that.favoriteProducts
            }}))
        })
        .catch(error => {
            console.log(error)
        })
    })

    window.addEventListener('favoriteRequest', () => {
        window.dispatchEvent(new CustomEvent('favoriteDistribution', { detail: {
            favoriteProducts: this.favoriteProducts
        }}))
    })
    

    window.dispatchEvent(new Event('updateCategories'))
    window.dispatchEvent(new Event('updateFavorite'))
}
