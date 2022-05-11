const db = require("../models");
const Product = db.Products;

exports.create = (categoryId, product) => {
    return Product.create({
        name: product.name,
        description: product.description,
        price: product.price,
        width: product.width,
        llength: product.llength,
        height: product.height,
        weight: product.weight,
        warranty: product.warranty,
        categoryId: categoryId
    })
    .then((product) => {
        console.log(">> Created product: " + JSON.stringify(product, null, 4));
        return product;
    })
    .catch((err) => {
        console.log(">> Error while creating product: ", err);
    });
};

exports.findByUUID = (productUUID) => {
    return Product.findByPk(productUUID, { include: ["category"] })
    .then((product) => {
        return product;
    })
    .catch((err) => {
        onsole.log(">> Error while finding product: ", err);
    });
};

exports.findAll = () => {
    return Product.findAll({ include: ["category"] })
    .then((product) => {
        return product;
    });
};