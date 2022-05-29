export default function (htmlPage) {
    return {
        template: htmlPage,
        data() {
            return {
                userData: {},
                comments: []
            }
        },
        mounted() {
            if (localStorage.getItem('userAllData')) {
                try {
                    this.userData = JSON.parse(localStorage.getItem('userAllData')).userData
                    this.comments = JSON.parse(localStorage.getItem('userAllData')).comments
                } catch (error) {
                    localStorage.removeItem('userAllData')
                }
            }
            else {
                axios({
                    url: '/api/user/info',
                    mathod: 'get',
                })
                    .then(res => {
                        localStorage.setItem('userAllData', JSON.stringify(res.data))
                        this.userData = res.data.userData
                        this.comments = res.data.comments
                    })
                    .catch(err => {
                        err.response.data.errors.forEach(error => {
                            alert(error.comment)
                        })
                    })
            }
        },
        methods: {
            
        }
    }
}