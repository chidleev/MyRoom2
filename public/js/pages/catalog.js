import getPages from '/js/getPageReq.js'

export default {
    props: ['categoryName'],
    template: getPages('default').catalog,
    components: {
        searchLine: {
            template: getPages('components').searchLine
        }
    }
}