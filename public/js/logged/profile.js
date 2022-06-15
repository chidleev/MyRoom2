export default function (htmlPage) {
    return {
        template: htmlPage,
        data() {
            return {
                userData: {},
                comments: [],
                newPhotoURL: ''
            }
        },
        mounted() {
            if (/*localStorage.getItem('userAllData')*/false) {
                try {
                    this.userData = JSON.parse(localStorage.getItem('userAllData')).userData
                    this.comments = JSON.parse(localStorage.getItem('userAllData')).comments
                } catch (error) {
                    localStorage.removeItem('userAllData')
                }
            }
            else {
                axios({
                    url: '/api/user/info',
                    mathod: 'get',
                })
                    .then(res => {
                        localStorage.setItem('userAllData', JSON.stringify(res.data))
                        this.userData = res.data.userData
                        this.comments = res.data.comments
                    })
                    .catch(err => {
                        err.response.data.errors.forEach(error => {
                            alert(error.comment)
                        })
                    })
            }
        },
        methods: {
            uploadProfilePhoto(event) {
                var el = event.target.hasAttribute('new-photo') ? event.target : event.target.parentElement
                this.toggleLoad(el)
                this.showUploadWidget((err, response) => {
                    if (err) console.error(err)
                    else {
                        if (response.event == 'success') {
                            console.log(response);
                            this.newPhotoURL = response.info.url
                        }
                        if (response.event == 'close') {
                            this.toggleLoad(el)
                            if (this.newPhotoURL.length > 0) {
                                var that = this
                                axios({
                                    url: '/api/user/changePhoto',
                                    method: 'patch',
                                    data: {
                                        newPhotoURL: that.newPhotoURL
                                    }
                                })
                                    .then(response => {
                                        new Toast({
                                            title: false,
                                            text: response.data,
                                            theme: 'success',
                                            autohide: true,
                                            interval: 5000
                                        });
                                        that.userData.photoURL = that.newPhotoURL
                                    })
                                    .catch(error => {
                                        console.log(error);
                                        error.response.data.errors.forEach(error => {
                                            new Toast({
                                                title: false,
                                                text: error.comment,
                                                theme: 'warning',
                                                autohide: true,
                                                interval: 10000
                                            })
                                        })
                                    })
                            }
                        }
                    }
                })
            },
            showUploadWidget(callBack) {
                window.cloudinary.openUploadWidget({
                    cloudName: "myroom-shop",
                    uploadPreset: "user_photo",
                    sources: [
                        "local",
                        "google_drive",
                        "camera"
                    ],
                    googleApiKey: "<image_search_google_api_key>",
                    showAdvancedOptions: true,
                    cropping: false,
                    multiple: false,
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
                }, callBack);
            },
            toggleLoad(el) {
                if (!this.loadingImg) {
                    this.loadingImg = !this.loadingImg
                    el.innerHTML = '<span class="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></span>'
                }
                else {
                    this.loadingImg = !this.loadingImg
                    el.innerHTML = (this.newPhotoURL)? `<img v-if="userData.photoURL" src="${this.newPhotoURL}" alt="Фотография профиля">` : (this.userData.photoURL)? `<img v-if="userData.photoURL" src="${this.userData.photoURL}" alt="Фотография профиля">` : '<span class="material-icons">account_box</span>'
                }
            }
        }
    }
}