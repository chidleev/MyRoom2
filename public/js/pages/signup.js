import getPage from '/js/getPageReq.js'
export default { 
    template: getPage('default').signup,
    data() {
        return {
            step: 0,
            user: {},
            wrongInput: {}
        }
    },
    watch: {
        'user.passwordOne': function(newValue) {
            if (Boolean(this.user.passwordTwo) && (newValue != this.user.passwordTwo)) {
                this.wrongInput.password = true
            }
            else {
                this.wrongInput.password = false
            }
        },

        'user.passwordTwo': function(newValue) {
            if (Boolean(this.user.passwordOne) && (newValue != this.user.passwordOne)) {
                this.wrongInput.password = true
            }
            else {
                this.wrongInput.password = false
            }
        }
    },
    methods: {
        signupStep1() {
            this.step += 1
        },

        signupReq() {

        }
    }
}