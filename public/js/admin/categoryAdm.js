export default function (htmlPage) {
    return {
        template: htmlPage,
        data() {
            return {
                categories: [],
                checkedCategories: [],
                newCategory: {}
            }
        },
        mounted() {
            window.addEventListener('categoriesDistribution', event => {
                this.categories = event.detail.categories
            })
            window.dispatchEvent(new Event('categoriesRequest'))
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
            createCategory() {
                axios({
                    url: '/api/admin/category',
                    method: 'put',
                    data: {
                        name: this.newCategory.name
                    }
                })
                .then(res => {
                    alert(res.data)
                    window.dispatchEvent(new Event('updateCategories'))
                })
                .catch(err => {
                    err.response.data.errors.forEach(error => {
                        alert(error.comment)
                    });
                })
            },
            renameCategory(category) {
                axios({
                    url: '/api/admin/category',
                    method: 'patch',
                    data: {
                        uuid: category.uuid,
                        newName: category.name
                    }
                })
                .then(res => {
                    alert(res.data)
                    window.dispatchEvent(new Event('updateCategories'))
                })
                .catch(err => {
                    err.response.data.errors.forEach(error => {
                        alert(error.comment)
                    });
                })
            },
            deleteCategories() {
                axios({
                    url: '/api/admin/category',
                    method: 'delete',
                    data: {
                        uuids: this.checkedCategories
                    }
                })
                .then(res => {
                    alert(res.data)
                    window.dispatchEvent(new Event('updateCategories'))
                })
                .catch(err => {
                    err.response.data.errors.forEach(error => {
                        alert(error.comment)
                    });
                })
            }
        }
    }
}