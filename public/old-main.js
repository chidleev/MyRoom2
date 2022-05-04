import router from "/js/router.js"

const app = Vue.createApp({})

app.use(router)

app.component('left-menu', {
    data() {
        return {
            categories: [
                {'id':10, 'name':'Диваны'},
                {'id':12, 'name':'Кресла'},
                {'id':34, 'name':'Люстры'},
                {'id':23, 'name':'Столы'},
                {'id':40, 'name':'Кровати'},
                {'id':80, 'name':'Шкафы'}
            ]
        }
    },

    template: `
    <div id="left-menu">
        <router-link to="/about" id="logo">
            <img src="/img/icons/logo.svg" alt="Логотип">
            <span>MyRoom</span>
        </router-link>

        <div id="category-list">
            <span>Категории</span>
            <ul>
                <li v-for="item in categories" :key="item.id">
                    <router-link :to="'/catalog/'+item.id" id="category-button" active-class="active">{{item.name}}</router-link>
                </li>
            </ul>
        </div>
    </div>`
})

app.component('right-menu', {
    data() {},

    template: `
    <div id="right-menu">
        <div id="top">
            <router-link to="/profile" id="profile_icon" class="icon" active-class="active">
                <img src="/img/icons/profile.svg" alt="Профиль">
            </router-link>

            <router-link to="/catalog" id="catalog_icon" class="icon" active-class="active">
                <img src="/img/icons/catalog.svg" alt="Профиль">
            </router-link>

            <router-link to="/basket" id="basket_icon" class="icon" active-class="active">
                <img src="/img/icons/basket.svg" alt="Профиль">
            </router-link>
        </div>

        <div id="bottom">
            <router-link to="/profile/logout" id="logout_icon" class="icon" active-class="active">
                <img src="/img/icons/logout.svg" alt="Профиль">
            </router-link>

            <router-link to="/about" id="about_icon" class="icon" active-class="active">
                <img src="/img/icons/about.svg" alt="Профиль">
            </router-link>

            <router-link to="#" id="up_icon" class="icon">
                <img src="/img/icons/up.svg" alt="Профиль">
            </router-link>
        </div>
    </div>`
})

app.mount('#app')