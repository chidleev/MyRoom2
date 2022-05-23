export default { 
    template: "getPage('default').login",
    data() {
        return {
            user: {},
            wrongInput: {}
        }
    },
    watch: {
        'user.login': function(newValue) {
            if (validator.isEmpty(newValue)) {
                this.wrongInput.login = true
            }
            else {
                this.wrongInput.login = false
            }
        },

        'user.password': function(newValue) {
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
                alert("Вы успешно вошли в свой аккаунт!")
                document.getElementById('logout_icon').style.display = 'flex'
                this.$router.push({name: 'profile'})
            })
            .catch(error => {
                error.response.data.errors.forEach(error => {
                    this.wrongInput[error.type] = true
                    alert(error.comment)
                })
            })
        }
    }
}