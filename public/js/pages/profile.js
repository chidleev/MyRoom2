import getPage from '/js/getPageReq.js'
export default {
    template: getPage('logged').profile,
    data() {
        return {
            user: {}
        }
    },
    mounted() {
        if (localStorage.getItem('userData')) {
            try {
                this.user = JSON.parse(localStorage.getItem('userData'))
            } catch (error) {
                localStorage.removeItem('userData')
            }
        }
        else {
            axios({
                url: '/api/user/info',
                mathod: 'get',
            })
                .then(res => {
                    localStorage.setItem('userData', JSON.stringify(res.data))
                    this.user = res.data
                })
                .catch(err => {
                    err.response.data.errors.forEach(error => {
                        alert(error.comment)
                    })
                })
        }
    },
    methods: {
        showUploadWidget: function () {
            window.cloudinary.openUploadWidget({
                cloudName: "myroom-shop",
                uploadPreset: "product_photo",
                sources: ["local", "url", "image_search", "google_drive"],
                googleApiKey: "<image_search_google_api_key>",
                showAdvancedOptions: true,
                cropping: false,
                multiple: true,
                defaultSource: "local",
                styles: {
                    palette: {
                        window: "#64696E",
                        sourceBg: "#32373C",
                        windowBorder: "#F0E6DC",
                        tabIcon: "#F07832",
                        inactiveTabIcon: "#F0E6DC",
                        menuIcons: "#F0E6DC",
                        link: "#F0AA32",
                        action: "#F0AA32",
                        inProgress: "#96C8C8",
                        complete: "#326432",
                        error: "#F01414",
                        textDark: "#32373C",
                        textLight: "#F0E6DC"
                    },
                    fonts: {
                        default: null,
                        "'Merriweather', serif": {
                            url: "https://fonts.googleapis.com/css?family=Merriweather",
                            active: true
                        }
                    }
                }
            },
            (err, response) => {
                if (err) console.error(err)
                else {
                    if (response.event == 'success') {
                        console.log(response.info);
                    }
                }
            });
        }
    }

}