/*
•   Возможность добавлять / убирать работников магазина
•	Возможность добавлять / убирать карточки товаров
•	Возможность добавлять / убирать категории товаров
•	Возможность удалять комментарии, нарушающие правила сайта
*/

const axios = require('axios');
const validator = require('validator')
const bcrypt = require('bcrypt')
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
        console.log(error);
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

function chekProduct(product, id) {
    const checkErrors = []

    if (!Boolean(product.name)) {
        checkErrors.push({
            type: 'name',
            comment: `Вы не ввели название товара №${id} в файле`
        })
    }
    if (!Boolean(product.price)) {
        checkErrors.push({
            type: 'price',
            comment: `Вы не ввели цену товара №${id} в файле`
        })
    }
    if (!Boolean(product.madeIn)) {
        checkErrors.push({
            type: 'madeIn',
            comment: `Вы не ввели страну производства товара №${id} в файле`
        })
    }
    if (!Boolean(product.materials)) {
        checkErrors.push({
            type: 'materials',
            comment: `Вы не ввели ни одного материала товара №${id} в файле`
        })
    }
    else if (!Boolean(product.materials.length)) {
        checkErrors.push({
            type: 'materials',
            comment: `Вы не ввели ни одного материала товара №${id} в файле`
        })
    }
    if (!Boolean(product.dimensions)) {
        checkErrors.push({
            type: 'dimensions',
            comment: `Вы не ввели размеры товара №${id} в файле`
        })
    }
    else if (!Boolean(product.dimensions.length)) {
        checkErrors.push({
            type: 'dimensions',
            comment: `Вы не ввели размеры товара №${id} в файле`
        })
    }
    if (!Boolean(product.weight)) {
        checkErrors.push({
            type: 'weight',
            comment: `Вы не ввели вес товара №${id} в файле`
        })
    }

    return checkErrors
}

adminAPI.put('/products-from-file', (req, res) => {
    const errors = []

    try {
        if (req.files) {
            let productsFile = req.files.productsFile;
            productsFile.mv('./uploads/' + productsFile.name);
            const productsData = xlsx.parse(productsFile.data);

            var productsObjects = []
            productsData[0].data.forEach(productRow => {
                const productObj = {}
                productRow.forEach((value, id) => {
                    if (productsData[0].data[0][id] == 'materials') {
                        productObj[productsData[0].data[0][id]] = value.split('/').map(value => value[0].toUpperCase() + value.slice(1))
                    }
                    else if (productsData[0].data[0][id] == 'dimensions') {
                        productObj[productsData[0].data[0][id]] = value.split('/').map(value => +value)
                    }
                    else (
                        productObj[productsData[0].data[0][id]] = value
                    )

                })
                productsObjects.push(productObj)
            })
            productsObjects.shift()

            productsObjects.forEach((product, id) => {
                errors.concat(chekProduct(product, id + 1))
            });

            if (errors.length > 0) {
                res.status(422).json({
                    errors: errors
                })
                return
            }

            var createdCount = 0
            db.Products.bulkCreate(productsObjects)
                .then(products => {
                    products.forEach(product => {
                        product.setCategory(req.body.categoryUUID)
                            .then(product => {
                                createdCount += 1
                                if (createdCount == productsObjects.length) {
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
        }
        else {
            res.status(422).json({
                errors: [{
                    type: 'files',
                    comment: 'Файл не был получен'
                }]
            })
        }
    }
    catch (err) {
        console.log(err);
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

adminAPI.delete('/products', (req, res) => {
    if (!Boolean(req.body.products.length)) {
        res.status(422).json({
            errors: [{
                type: 'products',
                comment: 'Вы не выбрали товары'
            }]
        })
        return
    }

    var productsCount = 0

    req.body.products.forEach(product => {
        if (product.photos.length) {
            cloudinary.api.delete_resources(product.photos,
                function (error, result) {
                    if (!error) {
                        db.ProductPhotos.destroy({
                            where: {
                                publicID: {
                                    [db.Op.or]: product.photos
                                }
                            }
                        })
                            .then(result => {
                                db.Products.destroy({
                                    where: { uuid: product.uuid }
                                })
                                    .then(result => {
                                        productsCount += 1
                                        if (productsCount == req.body.products.length) {
                                            res.sendStatus(200)
                                        }
                                    })
                                    .catch(err => {
                                        console.log(err);
                                        res.status(500).json({
                                            errors: [{
                                                type: 'sequalize',
                                                comment: 'Не удалось удалить продукт'
                                            }]
                                        })
                                        return
                                    })
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    errors: [{
                                        type: 'sequalize',
                                        comment: 'Не удалось удалить фотографии из базы данных'
                                    }]
                                })
                            })
                    }
                    else {
                        res.status(500).json({
                            errors: [{
                                type: 'cloudinary',
                                comment: 'Не удалось удалить фотографии выбранных товаров'
                            }]
                        })
                    }
                })
        }
        else {
            db.Products.destroy({
                where: { uuid: product.uuid }
            })
                .then(result => {
                    productsCount += 1
                    if (productsCount == req.body.products.length) {
                        res.sendStatus(200)
                    }
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        errors: [{
                            type: 'sequalize',
                            comment: 'Не удалось удалить продукт'
                        }]
                    })
                    return
                })
        }
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

adminAPI.post('/deleteComments', (req, res) => {
    if (req.body.commentUuids.length) {
        db.Comments.destroy({
            where: {
                uuid: {
                    [db.Op.or]: req.body.commentUuids,
                }
            }
        })
            .then(result => {
                res.send('Комментарии удалены')
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    errors: [{
                        type: 'sequalize',
                        comment: 'Не удалось удалить комментарии'
                    }]
                })
            })
    }
    else {
        res.status(422).json({
            errors: [{
                type: 'empty',
                comment: 'Вы не выбрали комментарии'
            }]
        })
    }
})

adminAPI.get('/employee', (req, res) => {
    db.Users.findAll({
        where: { roleUUID: { [db.Op.not]: '00000000-0000-0000-0000-000000000000' } },
        order: [['roleUUID', 'ASC'], ['name', 'ASC']]
    })
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                errors: [{
                    type: 'sequalize',
                    comment: 'Не удалось получить список работников'
                }]
            })
        })
})

adminAPI.patch('/employee', (req, res) => {
    const errors = []
    const updateData = {}

    if (Boolean(req.body.newPassword)) {
        updateData.password = newPassword
    }

    if (!Boolean(req.body.name)) {
        errors.push({
            type: 'name',
            comment: 'Вы не ввели свое имя'
        })
    }
    else {
        updateData.name = req.body.name
    }

    if (!Boolean(req.body.email)) {
        errors.push({
            type: 'email',
            comment: 'Вы не ввели свою электронную почту'
        })
    }
    else if (!validator.isEmail(req.body.email)) {
        errors.push({
            type: 'email',
            comment: 'Вы ввели некорректную электронную почту'
        })
    }
    else {
        updateData.email = req.body.email
    }

    if (Boolean(req.body.phone) && !validator.isMobilePhone(req.body.phone)) {
        console.log(req.body.phone);
        errors.push({
            type: 'phone',
            comment: 'Вы ввели некорректный номер телефона'
        })
    }
    else {
        updateData.phone = req.body.phone
    }

    if (errors.length > 0) {
        res.status(422).json({
            errors: errors
        })
        return
    }

    db.Users.update(updateData, {
        where: { uuid: req.body.workerUuid }
    })
        .then(result => {
            res.send('Страница работника обновлена')
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                errors: [{
                    type: 'sequalize',
                    comment: 'Не удалось обновить страницу работника'
                }]
            })
        })
})

adminAPI.patch('/promoteEmployee', (req, res) => {
    const errors = []

    if (!Boolean(req.body.login)) {
        errors.push({
            type: 'login',
            comment: 'Вы не ввели логин'
        })
    }

    if (!Boolean(req.body.password)) {
        errors.push({
            type: 'password',
            comment: 'Вы не ввели пароль'
        })
    }

    if (!Boolean(req.body.roleUuid)) {
        errors.push({
            type: 'roleUuid',
            comment: 'Вы не выбрали должность'
        })
    }

    if (errors.length > 0) {
        res.status(422).json({
            errors: errors
        })
        return
    }

    db.Users.findOne({
        where: { login: req.body.login }
    })
        .then(user => {
            bcrypt.compare(req.body.password, user.password).then(success => {
                if (success) {
                    user.update({ roleUUID: req.body.roleUuid })
                        .then(result => {
                            res.send('Должность работника обновлена')
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(500).json({
                                errors: [{
                                    type: 'sequalize',
                                    comment: 'Не удалось обновить должность работника'
                                }]
                            })
                        })
                }
                else {
                    res.status(422).json({
                        errors: [{
                            type: 'password',
                            comment: 'Неверный пароль'
                        }]
                    })
                }
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                errors: [{
                    type: 'login',
                    comment: 'Пользователя с таким логином не существует'
                }]
            })
        })
})

adminAPI.delete('/employee', (req, res) => {
    db.Users.findOne({
        where: { uuid: req.body.workerUuid }
    })
        .then(user => {
            bcrypt.compare(req.body.password, user.password).then(success => {
                if (success) {
                    db.Users.destroy({
                        where: { uuid: req.body.workerUuid }
                    })
                        .then(result => {
                            res.send('Страница работника удалена')
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(500).json({
                                errors: [{
                                    type: 'sequalize',
                                    comment: 'Не удалось удалить страницу работника'
                                }]
                            })
                        })
                }
                else {
                    res.status(422).json({
                        errors: [{
                            type: 'password',
                            comment: 'Неверный пароль'
                        }]
                    })
                }
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                errors: [{
                    type: 'sequalize',
                    comment: 'Не удалось получить список работников'
                }]
            })
        })
})

module.exports = adminAPI