export default function (htmlPage) {
    return {
        template: htmlPage,
        data() {
            return {
                user: {},
                wrongInput: {}
            }
        },
        watch: {
            'user.login': function (newValue) {
                if (validator.isEmpty(newValue)) {
                    this.wrongInput.login = true
                }
                else {
                    this.wrongInput.login = false
                }
            },

            'user.password': function (newValue) {
                if (validator.isEmpty(newValue)) {
                    this.wrongInput.password = true
                }
                else {
                    this.wrongInput.password = false
                }
            }
        },
        computed: {
            haveErrors() {
                const haveWrongInputs = this.wrongInput.login || this.wrongInput.password
                const haveEmptyData = !Boolean(this.user.login) || !Boolean(this.user.password)
                return haveWrongInputs || haveEmptyData
            }
        },
        methods: {
            sendPassword() {
                setTimeout(() => {
                    new Toast({
                        title: false,
                        text: "Пароль отправлен на вашу почту",
                        theme: 'success',
                        autohide: true,
                        interval: 2000
                    })
                }, 1000)
            },
            loginReq() {
                axios({
                    url: '/api/user/login',
                    method: 'post',
                    data: {
                        login: this.user.login,
                        password: this.user.password
                    }
                })
                    .then(response => {
                        new Toast({
                            title: false,
                            text: "Вы успешно вошли в свой аккаунт!",
                            theme: 'success',
                            autohide: true,
                            interval: 2000
                        })
                        document.getElementById('logout_icon').style.display = 'flex'
                        if (response.data) {
                            this.$router.go()
                        }
                        this.$router.push({ name: 'profile' })
                    })
                    .catch(error => {
                        error.response.data.errors.forEach(error => {
                            this.wrongInput[error.type] = true
                            new Toast({
                                title: false,
                                text: error.comment,
                                theme: 'warning',
                                autohide: true,
                                interval: 2000
                            })
                        })
                    })
            }
        }
    }
}