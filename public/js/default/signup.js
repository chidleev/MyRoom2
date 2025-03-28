export default function (htmlPage) {
    return {
        template: htmlPage,
        data() {
            return {
                step: 1,
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

            'user.passwordOne': function (newValue) {
                if (!validator.isEmpty(newValue) &&
                    Boolean(this.user.passwordTwo) &&
                    (newValue != this.user.passwordTwo)) {
                    this.wrongInput.password = true
                }
                else {
                    this.wrongInput.password = false
                }
            },

            'user.passwordTwo': function (newValue) {
                if (!validator.isEmpty(newValue) &&
                    Boolean(this.user.passwordOne) &&
                    (newValue != this.user.passwordOne)) {
                    this.wrongInput.password = true
                }
                else {
                    this.wrongInput.password = false
                }
            },

            'user.name': function (newValue) {
                if (validator.isEmpty(newValue)) {
                    this.wrongInput.name = true
                }
                else {
                    this.wrongInput.name = false
                }
            },

            'user.email': function (newValue) {
                if (!validator.isEmpty(newValue) && !validator.isEmail(newValue)) {
                    this.wrongInput.email = true
                }
                else {
                    this.wrongInput.email = false
                }
            },

            'user.phone': function (newValue) {
                if (!validator.isEmpty(newValue) && !validator.isMobilePhone(newValue)) {
                    this.wrongInput.phone = true
                }
                else {
                    this.wrongInput.phone = false
                }
            }
        },
        computed: {
            haveErrorsStep1() {
                const haveWrongInputs = this.wrongInput.login || this.wrongInput.password
                const haveEmptyData = !this.user.login || !this.user.passwordOne || !this.user.passwordTwo
                return haveWrongInputs || haveEmptyData
            },

            haveErrorsStep2() {
                const haveWrongInputs = this.wrongInput.phone || this.wrongInput.email
                const haveEmptyData = !this.user.name || !this.user.email
                return haveWrongInputs || haveEmptyData
            }
        },
        methods: {
            signupStep1() {
                axios({
                    url: '/api/user/checkLogin',
                    method: 'post',
                    data: {
                        login: this.user.login
                    }
                })
                    .then(response => {
                        this.step += 1
                    })
                    .catch(error => {
                        error.response.data.errors.forEach(error => {
                            new Toast({
                                title: false,
                                text: error.comment,
                                theme: 'warning',
                                autohide: true,
                                interval: 2000
                            })
                            this.wrongInput[error.type] = true
                        })
                    })
            },

            signupReq() {
                axios({
                    url: '/api/user/signup',
                    method: 'post',
                    data: {
                        login: this.user.login,
                        password: this.user.passwordOne,
                        name: this.user.name,
                        email: this.user.email,
                        phone: this.user.phone,
                    }
                })
                    .then(response => {
                        new Toast({
                            title: false,
                            text: "Вы успешно зарегестрировались!",
                            theme: 'success',
                            autohide: true,
                            interval: 2000
                        })
                        this.$router.push({ name: 'login' })
                    })
                    .catch(error => {
                        error.response.data.errors.forEach(error => {
                            new Toast({
                                title: false,
                                text: error.comment,
                                theme: 'warning',
                                autohide: true,
                                interval: 2000
                            })
                            this.wrongInput[error.type] = true
                        })
                    })
            }
        }
    }
}