import getPage from '/js/getPageReq.js'
export default { 
    template: getPage('logged').profile,
    data() {
        return {
            user: {}
        }
    },
    mounted() {
        if (localStorage.getItem('userData')) {
            try {
                this.user = JSON.parse(localStorage.getItem('userData'))
            } catch (error) {
                localStorage.removeItem('userData')
            }
        }
        else {
            axios({
                url: '/api/user/info',
                mathod: 'get',
            })
            .then(res => {
                localStorage.setItem('userData', JSON.stringify(res.data))
                this.user = res.data
            })
            .catch(err => {
                err.response.data.errors.forEach(error => {
                    alert(error.comment)
                })
            })
        }
    }
}