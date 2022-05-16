import getPage from '/js/getPageReq.js'
export default { 
    template: getPage('default').about,
    mounted() {
        anime({
            targets: ".about-logo",
            translateY: '-50vh',
            direction: 'reverse',
            easing: 'easeInBounce'
        })
    }
}