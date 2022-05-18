const db = require("../models");
const Category = db.Categories;

exports.create = (category) => {
    return Category.create({
      name: category.name,
      RUname: category.RUname
    })
    .then((category) => {
        console.log(">> Created category: " + JSON.stringify(category, null, 4));
        return category;
    })
    .catch((err) => {
        console.log(">> Error while creating category: ", err);
    });
};

exports.findByUUID = (categoryUUID) => {
    return Category.findByPk(categoryUUID, { include: ["products"] })
    .then((category) => {
        return category;
    })
    .catch((err) => {
        onsole.log(">> Error while finding category: ", err);
    });
};

exports.findAll = () => {
    return Category.findAll()
    .then((category) => {
        return category;
    });
};

exports.findAllWithProducts = () => {
    return Category.findAll({ include: ["products"] })
    .then((category) => {
        return category;
    });
};