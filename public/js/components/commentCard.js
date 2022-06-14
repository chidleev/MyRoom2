export default function(htmlCode) {
    return {
        template: htmlCode,
        props: {
            comment: {}
        },
        methods: {
            getDate(date) {
                return new Date(date).toLocaleDateString("ru-RU")
            },
            getRate(rate) {
                return Math.round(rate * 10)
            },
            setCommentRate(commentUUID, rate) {
                axios({
                    url: '/api/user/setRateComment',
                    method: 'patch',
                    data: {
                        commentUuid: commentUUID,
                        rate: rate
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
                        window.dispatchEvent(new CustomEvent('productsRequest', {
                            detail: {
                                categoryENname: this.$route.params.categoryENname,
                                searchLine: this.$route.params.productName
                            }
                        }))
                    })
                    .catch(err => {
                        err.response.data.errors.forEach(error => {
                            new Toast({
                                title: false,
                                text: error.comment,
                                theme: 'warning',
                                autohide: true,
                                interval: 2000
                            });
                        });
                    })
            }
        }
    }
}