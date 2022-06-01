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
            createCategory() {
                axios({
                    url: '/api/admin/category',
                    method: 'put',
                    data: {
                        name: this.newCategory.name
                    }
                })
                    .then(res => {
                        new Toast({
                            title: false,
                            text: res.data,
                            theme: 'success',
                            autohide: true,
                            interval: 2000
                        });
                        this.newCategory.name = ''
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
                        new Toast({
                            title: false,
                            text: res.data,
                            theme: 'success',
                            autohide: true,
                            interval: 2000
                        });
                        window.dispatchEvent(new Event('updateCategories'))
                    })
                    .catch(err => {
                        err.response.data.errors.forEach(error => {
                            alert(error.comment)
                        });
                    })
            },
            deleteCategories() {
                var answer = confirm('Вы действительно хотите удалить выбранные категории?')
                if (answer) {
                    const that = this
                    axios({
                        url: '/api/admin/category',
                        method: 'delete',
                        data: {
                            uuids: that.checkedCategories
                        }
                    })
                        .then(res => {
                            new Toast({
                                title: false,
                                text: res.data,
                                theme: 'success',
                                autohide: true,
                                interval: 2000
                            });
                            this.checkedCategories = []
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
}