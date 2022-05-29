export default function (htmlPage) {
    return {
        template: htmlPage,
        data() {
            return {
                categories: [],
                selectedCategory: {},
                newProduct: {
                    dimesions: [],
                    photoURLs: ['f', 'f', 'f', 'f', 'f', 'f', 'f', 'f']
                }
            }
        },
        mounted() {
            window.addEventListener('categoriesDistribution', event => {
                this.categories = event.detail.categories
            })
            window.dispatchEvent(new Event('categoriesRequest'))
        },
        computed: {
            products() {
                if (!Boolean(this.selectedCategory)) return []

            }
        },
        methods: {
            createProduct() {

            },

            addPhotoNewProduct() {
                this.showUploadWidget((err, response) => {
                    if (err) console.error(err)
                    else {
                        if (response.event == 'success') {
                            this.newProduct.photoURLs.push(response.info.url)
                        }
                    }
                })
            },

            showUploadWidget(callBack) {
                window.cloudinary.openUploadWidget({
                    cloudName: "myroom-shop",
                    uploadPreset: "product_photo",
                    sources: ["local"],
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
                }, callBack);
            }
        }
    }
}