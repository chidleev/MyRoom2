import getPages from '/js/getPageReq.js'
export default {
    props: ['categoryName', 'productName'],
    template: getPages('default').product
}