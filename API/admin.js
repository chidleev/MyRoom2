/*
•   Возможность добавлять / убирать работников магазина
•	Возможность добавлять / убирать карточки товаров
•	Возможность добавлять / убирать категории товаров
•	Возможность удалять комментарии, нарушающие правила сайта
*/

const axios = require('axios');
const fileUpload = require('express-fileupload');
const xlsx = require('node-xlsx');
const cloudinary = require('cloudinary').v2
cloudinary.config({
    cloud_name: 'myroom-shop',
    api_key: '714496323915627',
    api_secret: 'iKbZqzFTnkf7R3wf4dJgWSQICkk'
})

const checkIsAdmin = require('./validators').isAdmin

const express = require('express');
const db = require("../dataBase/models");

const adminAPI = express()
adminAPI.use(checkIsAdmin)
adminAPI.use(fileUpload({
    createParentPath: true
}));

adminAPI.get('/', (req, res) => {
    res.send("Admin api work")
})

adminAPI.put('/category', (req, res) => {
    if (!Boolean(req.body.name)) {
        res.status(422).json({
            errors: [{
                type: 'name',
                comment: 'Вы не ввели название категории'
            }]
        })
        return
    }

    const options = {
        method: 'GET',
        url: 'https://just-translated.p.rapidapi.com/',
        params: { lang: 'ru-en', text: req.body.name },
        headers: {
            'X-RapidAPI-Host': 'just-translated.p.rapidapi.com',
            'X-RapidAPI-Key': 'a8ea586244msh121b4cdebf777bcp11a0f8jsnb0cdb21a2f3f'
        }
    };

    axios.request(options).then(response => {
        db.Categories.create({
            name: req.body.name,
            ENname: response.data.text[0]
        })
            .then(category => {
                res.send('Категория успешно создана')
            })
            .catch(err => {
                res.status(500).json({
                    errors: [{
                        type: 'category',
                        comment: 'Не удалось создать категорию. Ошибка БД',
                        error: err
                    }]
                })
            })
    }).catch(function (error) {
        res.status(500).json({
            errors: [{
                type: 'category',
                comment: 'Не удалось создать категорию. Ошибка Translate API',
                error: error
            }]
        })
    });
})

adminAPI.patch('/category', (req, res) => {
    if (!Boolean(req.body.newName)) {
        res.status(422).json({
            errors: [{
                type: 'name',
                comment: 'Вы не ввели название категории'
            }]
        })
        return
    }

    const options = {
        method: 'GET',
        url: 'https://just-translated.p.rapidapi.com/',
        params: { lang: 'ru-en', text: req.body.newName },
        headers: {
            'X-RapidAPI-Host': 'just-translated.p.rapidapi.com',
            'X-RapidAPI-Key': 'a8ea586244msh121b4cdebf777bcp11a0f8jsnb0cdb21a2f3f'
        }
    };

    axios.request(options).then(response => {
        db.Categories.update({
            name: req.body.newName,
            ENname: response.data.text[0]
        }, {
            where: { uuid: req.body.uuid }
        })
            .then(category => {
                res.send('Название категории успешно обновлено')
            })
            .catch(err => {
                res.status(500).json({
                    errors: [{
                        type: 'category',
                        comment: 'Не удалось обновить название категории. Ошибка БД',
                        error: err
                    }]
                })
            })
    }).catch(function (error) {
        res.status(500).json({
            errors: [{
                type: 'category',
                comment: 'Не удалось обновить название категории. Ошибка Translate API',
                error: error
            }]
        })
    });
})

adminAPI.delete('/category', (req, res) => {
    if (!Boolean(req.body.uuids.length)) {
        res.status(422).json({
            errors: [{
                type: 'name',
                comment: 'Вы не выбрали категории'
            }]
        })
        return
    }

    db.Categories.destroy({
        where: {
            uuid: {
                [db.Op.or]: req.body.uuids
            }
        }
    })
        .then(result => {
            res.send('Выбранные категории удалены')
        })
        .catch(err => {
            res.status(500).json({
                errors: [{
                    type: 'category',
                    comment: 'Не удалось удалить категории. Ошибка БД',
                    error: err
                }]
            })
        })
})


adminAPI.put('/product', (req, res) => {
    const errors = []

    if (!Boolean(req.body.product.name)) {
        errors.push({
            type: 'name',
            comment: 'Вы не ввели название товара'
        })
    }
    if (!Boolean(req.body.product.price)) {
        errors.push({
            type: 'price',
            comment: 'Вы не ввели цену товара'
        })
    }
    if (!Boolean(req.body.product.madeIn)) {
        errors.push({
            type: 'madeIn',
            comment: 'Вы не ввели страну производства товара'
        })
    }
    if (!Boolean(req.body.product.materials.length)) {
        errors.push({
            type: 'materials',
            comment: 'Вы не ввели ни одного материала товара'
        })
    }
    if (!Boolean(req.body.product.dimensions.length)) {
        errors.push({
            type: 'dimensions',
            comment: 'Вы не ввели размеры товара'
        })
    }
    if (!Boolean(req.body.product.weight)) {
        errors.push({
            type: 'weight',
            comment: 'Вы не ввели вес товара'
        })
    }
    if (!Boolean(req.body.categoryUUID)) {
        errors.push({
            type: 'category',
            comment: 'Вы не выбрали категорию товара'
        })
    }

    if (errors.length > 0) {
        res.status(422).json({
            errors: errors
        })
        return
    }

    db.Products.create(req.body.product)
        .then(product => {
            product.setCategory(req.body.categoryUUID)
                .then(product => {
                    if (req.body.product.photos.length) {
                        db.ProductPhotos.bulkCreate(req.body.product.photos)
                            .then(photos => {
                                product.addProductPhotos(photos)
                                    .then(product => {
                                        res.json(product)
                                    })
                                    .catch(err => {
                                        res.status(500).json({
                                            errors: [{
                                                type: 'addProductPhotos',
                                                comment: 'Не удалось добавить фотографии к товару',
                                                error: err
                                            }]
                                        })
                                    })
                            })
                            .catch(err => {
                                res.status(500).json({
                                    errors: [{
                                        type: 'ProductPhotos',
                                        comment: 'Не удалось создать фотографии товара',
                                        error: err
                                    }]
                                })
                            })
                    }
                    else {
                        res.json(product)
                    }
                })
                .catch(err => {
                    res.status(500).json({
                        errors: [{
                            type: 'Category',
                            comment: 'Не удалось установить категорию товара',
                            error: err
                        }]
                    })
                })
        })
        .catch(err => {
            res.status(500).json({
                errors: [{
                    type: 'Product',
                    comment: 'Не удалось создать товар',
                    error: err
                }]
            })
        })
})

adminAPI.put('/products-from-file', (req, res) => {
    try {
        if(!req.files) {
            res.status(422).json({
                errors: [{
                    type: 'files',
                    comment: 'Файл не был получен'
                }]
            })
        } else {
            let productsFile = req.files.productsFile;
            productsFile.mv('./uploads/' + productsFile.name);
            const workSheetsFromFile = xlsx.parse(productsFile.data);

            console.log(JSON.stringify(workSheetsFromFile));

            res.sendStatus(200);
        }
    } catch (err) {
        res.status(500).json({
            errors: [{
                type: 'Product',
                comment: 'Не удалось создать товары',
                error: err
            }]
        })
    }
})


adminAPI.patch('/product', (req, res) => {
    db.Products.update(req.body.product, {
        where: { uuid: req.body.product.uuid }
    })
        .then(product => {
            res.send('Товар изменен')
        })
        .catch(err => {
            res.status(500).json({
                errors: [{
                    type: 'Product',
                    comment: 'Не удалось изменить товар',
                    error: err
                }]
            })
        })
})

adminAPI.put('/products-from-json', (req, res) => {
    const errors = []

    if (!Boolean(req.body.categoryUUID)) {
        errors.push({
            type: 'category',
            comment: 'Вы не выбрали категорию товара'
        })
    }

    function chekProduct(product, id) {
        if (!Boolean(product.name)) {
            errors.push({
                type: 'name',
                comment: `Вы не ввели название товара №${id} в файле`
            })
        }
        if (!Boolean(product.price)) {
            errors.push({
                type: 'price',
                comment: `Вы не ввели цену товара №${id} в файле`
            })
        }
        if (!Boolean(product.madeIn)) {
            errors.push({
                type: 'madeIn',
                comment: `Вы не ввели страну производства товара №${id} в файле`
            })
        }
        if (!Boolean(product.materials)) {
            errors.push({
                type: 'materials',
                comment: `Вы не ввели ни одного материала товара №${id} в файле`
            })
        }
        else if (!Boolean(product.materials.length)) {
            errors.push({
                type: 'materials',
                comment: `Вы не ввели ни одного материала товара №${id} в файле`
            })
        }
        if (!Boolean(product.dimensions)) {
            errors.push({
                type: 'dimensions',
                comment: `Вы не ввели размеры товара №${id} в файле`
            })
        }
        else if (!Boolean(product.dimensions.length)) {
            errors.push({
                type: 'dimensions',
                comment: `Вы не ввели размеры товара №${id} в файле`
            })
        }
        if (!Boolean(product.weight)) {
            errors.push({
                type: 'weight',
                comment: `Вы не ввели вес товара №${id} в файле`
            })
        }
    }

    req.body.products.forEach((product, id) => {
        chekProduct(product, id + 1)
    });

    if (errors.length > 0) {
        res.status(422).json({
            errors: errors
        })
        return
    }

    var createdCount = 0
    db.Products.bulkCreate(req.body.products)
        .then(products => {
            products.forEach(product => {
                product.setCategory(req.body.categoryUUID)
                .then(product => {
                    createdCount += 1
                    if (createdCount == req.body.products.length) {
                        res.sendStatus(200)
                    }
                })
                .catch(err => {
                    res.status(500).json({
                        errors: [{
                            type: 'Product',
                            comment: 'Не удалось добавить категорию товарам',
                            error: err
                        }]
                    })
                })
            })
        })
        .catch(err => {
            console.error(err);
        })
})


adminAPI.patch('/productPhotos', (req, res) => {
    db.Products.findOne({
        where: { uuid: req.body.productUUID }
    })
        .then(product => {
            db.ProductPhotos.bulkCreate(req.body.newProductPhotos)
                .then(productPhotos => {
                    product.addProductPhotos(productPhotos)
                        .then(product => {
                            res.send('Фотографии успешно добавлены')
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(500).json({
                                errors: [{
                                    type: 'sequalize',
                                    comment: "Не удалось добавить фотографии данному продукту"
                                }]
                            })
                        })
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        errors: [{
                            type: 'sequalize',
                            comment: "Не удалось создать фотографии для данного продукта"
                        }]
                    })
                })
        })
        .catch(err => {
            res.status(500).json({
                errors: [{
                    type: 'sequalize',
                    comment: "Не удалось получить доступ к данному продукту"
                }]
            })
        })
})

adminAPI.delete('/productPhotos', (req, res) => {
    if (!Boolean(req.body.productPhotos.length)) {
        res.status(422).json({
            errors: [{
                type: 'photos',
                comment: 'Вы не выбрали фотографии'
            }]
        })
        return
    }

    cloudinary.api.delete_resources(req.body.productPhotos,
        function (error, result) {
            if (error) {
                res.status(422).json({
                    errors: [{
                        type: 'photos',
                        comment: 'Не удалось удалить фотографии'
                    }]
                })
                return
            }
            db.Products.findOne({
                where: { uuid: req.body.productUUID },
                include: [{
                    model: db.ProductPhotos,
                    where: {
                        publicID: {
                            [db.Op.or]: req.body.productPhotos
                        }
                    }
                }]
            })
                .then(product => {
                    product.removeProductPhotos(product.ProductPhotos)
                        .then(result => {
                            res.send('Фотографии удалены')
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(500).json({
                                errors: [{
                                    type: 'sequalize',
                                    comment: 'Не удалось удалить фотографии'
                                }]
                            })
                        })
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        errors: [{
                            type: 'sequalize',
                            comment: 'Не удалось найти продукт'
                        }]
                    })
                })
        });
})


adminAPI.get('/uploadimg', (req, res) => {
    /*cloudinary.v2.uploader.upload(
        __dirname + '/../public/icons/up.svg',
        { public_id: "up" },
        function (error, result) {
            if (error) {

                res.json(error);
                return
            }
            res.json(result);
        });*/

    res.send(cloudinary.image('up'))
})

module.exports = adminAPI