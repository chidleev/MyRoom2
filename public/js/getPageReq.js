export default function(pageName) {
    if (localStorage.getItem(pageName)) {
        return localStorage.getItem(pageName) 
    }
    else {
        var request = new XMLHttpRequest()
        request.open('GET', `/api/gethtml/${pageName}`, false)
        request.send()
        if (request.status === 200) {
            localStorage.setItem(pageName, request.responseText)
            return request.responseText
        }
    }
}