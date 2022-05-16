import getPage from '/js/getPageReq.js'
export default { 
    template: getPage('default').login,
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
            const haveEmptyData = !this.user.login || !this.user.password
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
                if (response.data.successful) {
                    alert(response.data.comment)
                    document.cookie = `token=${response.data.token}; path=/`
                    this.$router.push({name: 'profile'})
                }
                else {
                    switch (response.data.error.type) {
                        case 'login':
                            alert(response.data.error.comment)
                            this.wrongInput.login = true
                            break;

                        case 'password':
                            alert(response.data.error.comment)
                            this.wrongInput.password = true
                            break;
                    }
                }
            })
            .catch(error => {
                console.error(error.response);
            })
        }
    }
}