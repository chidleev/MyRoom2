export default function(htmlPage) {
    return {
        template: htmlPage,
        mounted() {
            anime({
                targets: ".about-logo",
                translateY: '-50vh',
                direction: 'reverse',
                easing: 'easeInBounce'
            })
        }
    }
}