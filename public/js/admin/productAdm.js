export default function (htmlPage) {
    return {
        template: htmlPage,
        data() {
            return {
                categories: [],
                products: [],
                selectedCategory: {},
                newProduct: {
                    dimensions: [],
                    photoURLs: []
                },
                newProductPhotos: [],
                loadingImg: false
            }
        },
        mounted() {
            window.addEventListener('categoriesDistribution', event => {
                this.categories = event.detail.categories
            })
            window.dispatchEvent(new Event('categoriesRequest'))
        },
        watch: {
            selectedCategory: function(newValue) {
                if (!Boolean(newValue.name)) {
                    this.products = [{
                        dimensions: [],
                        photoURLs: []
                    }]
                }
                else {
                    const that = this
                    axios({
                        url: '/api/getData/productsByCategory',
                        method: 'post',
                        data: {
                            categoryENname: newValue.ENname
                        }
                    })
                        .then(response => {
                            that.products = response.data.Products
                        })
                        .catch(error => {
                            error.response.data.errors.forEach(error => {
                                alert(error.comment)
                            });
                            that.products = [{
                                dimensions: [],
                                photoURLs: []
                            }]
                        })
                }
            }
        },
        methods: {
            createProduct() {

            },

            addNewProductPhotos(event) {
                var el = event.target
                this.toggleLoad(el)
                this.showUploadWidget((err, response) => {
                    if (err) console.error(err)
                    else {
                        if (response.event == 'success') {
                            this.newProduct.photoURLs.push(response.info.url)
                        }
                        if (response.event == 'close') {
                            this.toggleLoad(el)
                        }
                    }
                })
            },

            patchProduct(product) {

            },

            addProductPhotos(event, product) {
                var el = event.target
                this.toggleLoad(el)
                this.showUploadWidget((err, response) => {
                    if (err) console.error(err)
                    else {
                        if (response.event == 'success') {
                            this.newProductPhotos.push({
                                url: response.info.url
                            })
                        }
                        if (response.event == 'close') {
                            this.toggleLoad(el)
                            var that = this
                            axios({
                                url: '/api/admin/productPhotos',
                                method: 'patch',
                                data: {
                                    newProductPhotos: that.newProductPhotos,
                                    productUUID: product.uuid
                                }
                            })
                                .then(response => {
                                    new Toast({
                                        title: false,
                                        text: response.data,
                                        theme: 'success',
                                        autohide: true,
                                        interval: 2000
                                    });
                                    that.newProductPhotos.forEach(productPhoto => {
                                        product.ProductPhotos.push(productPhoto)
                                    })
                                    that.newProductPhotos = []
                                })
                                .catch(error => {
                                    error.response.data.errors.forEach(error => {
                                        new Toast({
                                            title: false,
                                            text: error.comment,
                                            theme: 'success',
                                            autohide: true,
                                            interval: 2000
                                        })
                                    })
                                })
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
            },

            toggleLoad(element) {
                var el = element.children[0] || element
                if (!this.loadingImg) {
                    this.loadingImg = !this.loadingImg
                    el.innerHTML = '<div class="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>'
                }
                else {
                    this.loadingImg = !this.loadingImg
                    el.innerHTML = '<span class="material-icons">add_photo_alternate</span>'
                }
            }
        }
    }
}