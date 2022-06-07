export default function (htmlPage) {
    return {
        template: htmlPage,
        data() {
            return {
                currentTab: 'basket',
                orders: []
            }
        },
        
    }
}