import getPage from '/js/getPageReq.js'
export default { 
    template: getPage('default').signup,
    data() {
        return {
            step: 0,
            user: {}
        }
    },
    methods: {
        signupReqStep1() {
            this.step += 1
        },

        signupReqStep2() {

        }
    }
}