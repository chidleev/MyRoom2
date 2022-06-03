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

    /*window.addEventListener('productsRequest', (event) => {
        const that = this
        axios({
            url: '/api/getData/productsByCategory',
            method: 'post',
            data: {
                categoryENname: event.detail.categoryENname
            }
        })
            .then(response => {
                that.categoryData = response.data
                window.dispatchEvent(new CustomEvent('productsDistribution', { detail: {
                    products: that.categoryData.Products,
                    categoryName: that.categoryData.name
                }}))
            })
            .catch(error => {
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
    })*/

    window.dispatchEvent(new Event('updateCategories'))

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
}
