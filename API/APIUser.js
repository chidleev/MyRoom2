/*
•	Возможность регестрироваться и логиниться
•	Возможность просматривать товары в корзине
•	Возможность покупать мебель
•	Возможность ставить оценку мебели и комментировать ее
•	Возможность просматривать историю посещений карточек товаров (localStorage)
*/

const express = require('express')

const userAPI = express()

userAPI.get('/', (req, res) => {
    res.send("User api work")
})

module.exports = userAPI