export default { 
    template: "<div>sfdfsfd</div>",
    mounted() {
        anime({
            targets: ".about-logo",
            translateY: '-50vh',
            direction: 'reverse',
            easing: 'easeInBounce'
        })
    }
}