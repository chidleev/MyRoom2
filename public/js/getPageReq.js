export default function(pagesType) {
    if (/*localStorage.getItem(pagesType)*/false) {
        try {
            return JSON.parse(localStorage.getItem(pagesType))
        } catch(e) {
            localStorage.removeItem(pagesType)
        }
    }
    else {
        var request = new XMLHttpRequest()
        request.open('GET', `/api/gethtml/${pagesType}`, false)
        request.send()
        if (request.status === 200) {
            localStorage.setItem(pagesType, request.responseText)
            return JSON.parse(request.responseText)
        }
    }
}