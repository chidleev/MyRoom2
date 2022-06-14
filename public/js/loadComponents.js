import searchLine from '/js/component/searchLine.js'
import productCard from '/js/component/productCard.js'
import commentCard from '/js/component/commentCard.js'

var componentHTML = {}

const request = new XMLHttpRequest()
request.open('GET', '/api/gethtml/components', false)
request.send()
if (request.status == 200) {
    componentHTML = JSON.parse(request.responseText)
}

export default {
        searchLine: searchLine(componentHTML.searchLine),
        productCard: productCard(componentHTML.productCard),
        commentCard: commentCard(componentHTML.commentCard)
    }