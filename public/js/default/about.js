export default function (htmlPage) {
    return {
        template: htmlPage,
        data() {
            return {
                contacts: []
            }
        },
        mounted() {
            anime({
                targets: ".about-logo",
                translateY: '-50vh',
                direction: 'reverse',
                easing: 'easeInBounce'
            })

            const that = this
            axios({
                url: '/api/getData/contacts'
            })
                .then(function (response) {
                    console.log(response);
                    that.contacts = response.data
                })
                .catch(function (error) {
                    console.log(error)
                })
        },
        methods: {
            groupBy: function (xs, key) {
                return xs.reduce(function (rv, x) {
                    (rv[x[key]] = rv[x[key]] || []).push(x);
                    return rv;
                }, {});
            },
            roleName(roleUuid) {
                if (roleUuid == null) return null
                switch (roleUuid) {
                    case "56de4ebc-c616-496f-8666-a45232a900eb":
                        return 'Администратор'
                    case "5757484e-79e0-4a4d-a8c9-c7a08b9137fc":
                        return 'Бухгалтер'
                    case "cc8554cb-d9c7-44e9-9c68-6ab2caac61e9":
                        return 'Менеджер'
                    default:
                        return 'Обычный пользователь';
                }
            }
        }
    }
}