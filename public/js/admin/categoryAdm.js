export default function (htmlPage) {
    return {
        template: htmlPage,
        data() {
            return {
                categories: [],
                checkedCategories: []
            }
        },
        mounted() {
            if (localStorage.getItem('categories')) {
                try {
                    this.categories = JSON.parse(localStorage.getItem('categories')) 
                } catch(e) {
                    localStorage.removeItem('categories')
                }
            }
            else {
                const that = this
                axios.get('/api/getdata/categories')
                .then(function (response) {
                    localStorage.setItem('categories', JSON.stringify(response.data))
                    that.categories = response.data
                })
                .catch(function (error) {
                    console.log(error)
                })
            }
        },
        methods: {
            checkItem(uuid) {
                if (this.checkedCategories.indexOf(uuid) + 1) {
                    this.checkedCategories.splice(this.checkedCategories.indexOf(uuid), 1); 
                }
                else {
                    this.checkedCategories.push(uuid)
                }
            },
            onInputFunc() {
            },
            renameCategory(category) {
                alert(category.name)
            }
        }
    }
}