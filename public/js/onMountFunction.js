export default function() {
    const request = new XMLHttpRequest()
    
    if (localStorage.getItem('categories')) {
        try {
            this.categories = JSON.parse(localStorage.getItem('categories')) 
        } catch(e) {
            localStorage.removeItem('categories')
        }
    }
    else {
        /*request.open('GET', '/api/getdata/categories', false)
        request.send(null)
        if (request.status === 200) {
            localStorage.setItem('categories', request.responseText)
            this.categories = JSON.parse(request.responseText)
        }*/
        const that = this
        axios.get('/api/getdata/categories')
        .then(function (response) {
            localStorage.setItem('categories', JSON.stringify(response.data))
            that.categories = response.data
        })
        .catch(function (error) {
            console.error(error)
        })
    }
}
