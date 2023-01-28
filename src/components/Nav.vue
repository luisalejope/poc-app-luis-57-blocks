<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router'
import desktopLogo from "../assets/logoPortafolio1.png";



</script>
<template>
    <header class="template-app">
        <div class="wrapper">

            <nav class="navContainer">
                <div class="routes">

                    <RouterLink class="linkNav" to="/" exactActiveClass="active">
                        Home
                    </RouterLink>
                    <RouterLink class="linkNav" to="/favorites" exactActiveClass="active">
                        Favorites
                    </RouterLink>

                </div>
            </nav>
        </div>
    </header>
</template>

<style scoped>
.wrapper {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 3.5rem;
    background-color: rgb(233, 232, 232);
    -webkit-box-shadow: 0px 3px 13px -5px rgba(0, 0, 0, 0.42);
    -moz-box-shadow: 0px 3px 13px -5px rgba(0, 0, 0, 0.42);
    box-shadow: 0px 3px 13px -5px rgba(0, 0, 0, 0.42);
}

.navContainer {
    width: 90%;
    display: flex;
}



.routes {
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

.linkNav {
    font-size: 25px;
    margin-left: 1rem;
    font-size: large;
    text-decoration: none;
    color: #323232;
}

.linkNav:hover {
    color: #fe4066;
}

.active {
    color: #fe4066
}
</style>