export default function (htmlPage) {
    return {
        template: htmlPage,
        data() {
            return {
                comments: [],
                wannaDelete: []
            }
        },
        mounted() {
            const that = this
            axios.get('/api/getdata/comments')
            .then(function (response) {
                that.comments = response.data
            })
            .catch(function (error) {
                console.log(error)
            })
        },
        methods: {
            deleteChecked() {
                if (confirm('Удалить выбранные комментарии?')) {
                    const that = this
                    axios({
                        url: '/api/admin/deleteComments',
                        method: 'post',
                        data: {
                            commentUuids: that.wannaDelete
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
                            that.wannaDelete = []
                            axios.get('/api/getdata/comments')
                                .then(function (response) {
                                    that.comments = response.data
                                })
                                .catch(function (error) {
                                    console.log(error)
                                })
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
            groupBy: function(xs, key) {
                return xs.reduce(function(rv, x) {
                  (rv[x[key]] = rv[x[key]] || []).push(x);
                  return rv;
                }, {});
            },
            toggleItemInArr(event, item, arr) {
                event.target.toggleAttribute('selected')
                if (arr.indexOf(item) + 1) {
                    arr.splice(arr.indexOf(item), 1);
                }
                else {
                    arr.push(item)
                }
            }
        }
    }
}