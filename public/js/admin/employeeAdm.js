export default function (htmlPage) {
    return {
        template: htmlPage,
        data() {
            return {
                employee: [],
                promoteWorker: {}
            }
        },
        mounted() {
            this.getEmployee()
        },
        methods: {
            getEmployee() {
                const that = this
                axios.get('/api/admin/employee')
                    .then(function (response) {
                        that.employee = response.data
                    })
                    .catch(function (error) {
                        console.log(error)
                    })
            },
            updateWorker(worker) {
                const that = this
                axios({
                    url: '/api/admin/employee',
                    method: 'patch',
                    data: {
                        workerUuid: worker.uuid,
                        name: worker.name,
                        password: worker.newPassword,
                        phone: worker.phone,
                        email: worker.email,
                    }
                })
                    .then(function (response) {
                        new Toast({
                            title: false,
                            text: response.data,
                            theme: 'success',
                            autohide: true,
                            interval: 2000
                        });
                    })
                    .catch(err => {
                        err.response.data.errors.forEach(error => {
                            new Toast({
                                title: false,
                                text: error.comment,
                                theme: 'warning',
                                autohide: true,
                                interval: 10000
                            })
                        });
                    })
            },
            promote() {
                const that = this
                axios({
                    url: '/api/admin/promoteEmployee',
                    method: 'patch',
                    data: {
                        login: that.promoteWorker.login,
                        password: that.promoteWorker.password,
                        roleUuid: that.promoteWorker.roleUuid
                    }
                })
                    .then(function (response) {
                        new Toast({
                            title: false,
                            text: response.data,
                            theme: 'success',
                            autohide: true,
                            interval: 2000
                        });
                        that.getEmployee()
                    })
                    .catch(err => {
                        err.response.data.errors.forEach(error => {
                            new Toast({
                                title: false,
                                text: error.comment,
                                theme: 'warning',
                                autohide: true,
                                interval: 10000
                            })
                        });
                    })
            },
            deleteWorker(event, worker) {
                if (event.target.innerText == 'Удалить' && confirm('Вы уверены, что хотите удалить аккаунт пользователя?')) {
                    const that = this
                    axios({
                        url: '/api/admin/employee',
                        method: 'delete',
                        data: {
                            workerUuid: worker.uuid,
                            password: worker.deletePassword
                        }
                    })
                        .then(function (response) {
                            new Toast({
                                title: false,
                                text: response.data,
                                theme: 'success',
                                autohide: true,
                                interval: 2000
                            });
                            that.getEmployee()
                        })
                        .catch(err => {
                            err.response.data.errors.forEach(error => {
                                new Toast({
                                    title: false,
                                    text: error.comment,
                                    theme: 'warning',
                                    autohide: true,
                                    interval: 10000
                                })
                            });
                        })
                }
            },
            groupBy: function (xs, key) {
                return xs.reduce(function (rv, x) {
                    (rv[x[key]] = rv[x[key]] || []).push(x);
                    return rv;
                }, {});
            },
            roleName(roleUuid) {
                if (roleUuid == null) return null
                switch (roleUuid) {
                    case "56de4ebc-c616-496f-8666-a45232a900eb":
                        return 'Администратор'
                    case "5757484e-79e0-4a4d-a8c9-c7a08b9137fc":
                        return 'Бухгалтер'
                    case "cc8554cb-d9c7-44e9-9c68-6ab2caac61e9":
                        return 'Менеджер'
                    default:
                        return 'Обычный пользователь';
                }
            },
            getDate(date) {
                return new Date(date).toLocaleDateString("ru-RU")
            }
        }
    }
}