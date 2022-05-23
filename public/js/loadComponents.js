import searchLine from '/js/component/searchLine.js'

var componentHTML = {}

const request = new XMLHttpRequest()
request.open('GET', '/api/gethtml/components', false)
request.send()
if (request.status == 200) {
    componentHTML = JSON.parse(request.responseText)
}

export default {
        searchLine: searchLine(componentHTML.searchLine)
    }