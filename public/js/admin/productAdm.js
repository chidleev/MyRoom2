export default function (htmlPage) {
    return {
        template: htmlPage,
        data() {
            return {
                categories: [],
                products: [],
                selectedCategory: {
                    uuid: null
                },
                newProduct: {
                    dimensions: [],
                    photos: [],
                    materials: []
                },
                wannaDeleteProducts: [],
                newProductPhotos: [],
                loadingImg: false,
                countries: ['Италия', 'Германия', 'США', 'Канада', 'Япония', 'Франция', 'Великобритания', 'Китай', 'Россия'],
                materials: ['Натуральное дерево', 'ДСП', 'ЛДСП', 'МДФ', 'Рогожка', 'Вельвет', 'Велюр', 'Велюр (Лекко)', 'Ткань', 'Металл']
            }
        },
        mounted() {
            window.addEventListener('categoriesDistribution', event => {
                this.categories = event.detail.categories
            })
            window.dispatchEvent(new Event('categoriesRequest'))

            window.addEventListener('productsDistribution', (event) => {
                this.products = event.detail.products
                this.products.forEach(product => {
                    product.wannaDeleteImages = []
                })
            })
        },
        watch: {
            selectedCategory: function (newValue) {
                if (!Boolean(newValue.name)) {
                    this.products = [{
                        dimensions: [],
                        photos: []
                    }]
                }
                else {
                    window.dispatchEvent(new CustomEvent('productsRequest', {
                        detail: {
                            categoryENname: newValue.ENname
                        }
                    }))
                }
            }
        },
        methods: {
            createProduct() {
                const that = this
                axios({
                    url: '/api/admin/product',
                    method: 'put',
                    data: {
                        product: that.newProduct,
                        categoryUUID: that.selectedCategory.uuid
                    }
                })
                    .then(response => {
                        new Toast({
                            title: false,
                            text: "Товар успешно создан",
                            theme: 'success',
                            autohide: true,
                            interval: 5000
                        });
                        that.newProduct = {
                            dimensions: [],
                            photos: [],
                            materials: []
                        }
                        window.dispatchEvent(new Event('updateCategories'))
                        window.dispatchEvent(new CustomEvent('productsRequest', {
                            detail: {
                                categoryENname: this.selectedCategory.ENname
                            }
                        }))
                    })
                    .catch(error => {
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
            },

            createProductsFromFile(event) {
                var formData = new FormData();
                formData.append("productsFile", event.target.files[0]);
                formData.append("categoryUUID", this.selectedCategory.uuid)
                axios({
                    url: '/api/admin/products-from-file',
                    method: 'put',
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    data: formData,
                })
                    .then(response => {
                        new Toast({
                            title: false,
                            text: "Товары успешно загружены",
                            theme: 'success',
                            autohide: true,
                            interval: 5000
                        });
                        window.dispatchEvent(new Event('updateCategories'))
                        window.dispatchEvent(new CustomEvent('productsRequest', {
                            detail: {
                                categoryENname: this.selectedCategory.ENname
                            }
                        }))
                    })
                    .catch(error => {
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
            },

            addNewProductPhotos(event) {
                var el = event.target.hasAttribute('new-photo') ? event.target : event.target.parentElement
                this.toggleLoad(el)
                this.showUploadWidget((err, response) => {
                    if (err) console.error(err)
                    else {
                        if (response.event == 'success') {
                            this.newProduct.photos.push({
                                url: response.info.url,
                                publicID: response.info.public_id
                            })
                        }
                        if (response.event == 'close') {
                            this.toggleLoad(el)
                        }
                    }
                })
            },

            patchProduct(product) {
                axios({
                    url: '/api/admin/product',
                    method: 'patch',
                    data: {
                        product: product
                    }
                })
                    .then(response => {
                        new Toast({
                            title: false,
                            text: "Товар успешно изменён",
                            theme: 'success',
                            autohide: true,
                            interval: 5000
                        });
                        window.dispatchEvent(new Event('updateCategories'))
                        window.dispatchEvent(new CustomEvent('productsRequest', {
                            detail: {
                                categoryENname: this.selectedCategory.ENname
                            }
                        }))
                    })
                    .catch(error => {
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
            },

            deleteProducts() {
                if (confirm(`Удалить выбранные товары? (${this.wannaDeleteProducts.length}шт.)`)) {
                    const that = this
                    axios({
                        url: '/api/admin/products',
                        method: 'delete',
                        data: {
                            products: that.wannaDeleteProducts
                        }
                    })
                        .then(response => {
                            new Toast({
                                title: false,
                                text: "Выбранные товары удалены",
                                theme: 'success',
                                autohide: true,
                                interval: 5000
                            });
                            this.wannaDeleteProducts = []
                            window.dispatchEvent(new Event('updateCategories'))
                            window.dispatchEvent(new CustomEvent('productsRequest', {
                                detail: {
                                    categoryENname: this.selectedCategory.ENname
                                }
                            }))
                        })
                        .catch(error => {
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
            },

            addProductPhotos(event, product) {
                var el = event.target.hasAttribute('new-photo') ? event.target : event.target.parentElement
                this.toggleLoad(el)
                this.showUploadWidget((err, response) => {
                    if (err) console.error(err)
                    else {
                        if (response.event == 'success') {
                            this.newProductPhotos.push({
                                url: response.info.url,
                                publicID: response.info.public_id
                            })
                        }
                        if (response.event == 'close') {
                            this.toggleLoad(el)
                            if (this.newProductPhotos.length > 0) {
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
                                            interval: 5000
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

            deleteProductPhotos(product) {
                if (confirm("Удалить выбранные фотографии?")) {
                    axios({
                        url: '/api/admin/productPhotos',
                        method: 'delete',
                        data: {
                            productPhotos: product.wannaDeleteImages,
                            productUUID: product.uuid
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
                            product.wannaDeleteImages = []
                            window.dispatchEvent(new CustomEvent('productsRequest', {
                                detail: {
                                    categoryENname: this.selectedCategory.ENname
                                }
                            }))
                        })
                        .catch(error => {
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

            toggleLoad(el) {
                if (!this.loadingImg) {
                    this.loadingImg = !this.loadingImg
                    el.innerHTML = '<span class="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></span>'
                }
                else {
                    this.loadingImg = !this.loadingImg
                    el.innerHTML = '<span class="material-icons">add_photo_alternate</span>'
                }
            },

            toggleItemInArr(event, item, arr) {
                event.target.toggleAttribute('selected')
                if (arr.indexOf(item) + 1) {
                    arr.splice(arr.indexOf(item), 1);
                }
                else {
                    arr.push(item)
                }
            }
        }
    }
}