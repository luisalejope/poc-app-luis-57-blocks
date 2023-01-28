<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router'
import desktopLogo from "../assets/logoPortafolio1.png";



</script>
<template>
    <header class="template-app">
        <div class="wrapper">

            <nav class="navContainer">
            <div class="itemsContainer">
                <div class="leftNav">
                    <Link to="/">
                        <img class="logoNav" src={desktopLogo} alt="desktopLogo" />
                    </Link>
                </div>
            </div>

            <div class="rightNav">

                <RouterLink

                    class="linkNav"

                    to="/"
                >
                    Home
                </RouterLink>
                <RouterLink

                    class="linkNav"

                    to="/my-work"
                >
                    My Work
                </RouterLink>

                <RouterLink

                    class="linkNav"

                    to="/projects"
                >
                    Projects
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
    background-color: rgb(155, 154, 154);
}
.navContainer {
    width: 90%;
    display: flex;
}

.logoNav {
    width: 100px;
    height: auto;
}

.itemsContainer {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.leftNav {
    display: flex;
    align-items: center;
}

.rightNav {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 40%;
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

a.active {
    color: #fe4066;
}

p {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
}

@media (max-width: 844px) {
    .logoNav {
        width: 30px;
        margin: 0 0 5px 10px;
    }
}


/* MOBILE */

.menuToggle {
    display: block;
    width: 100%;
    position: relative;
    top: 50px;
    left: 20px;

    z-index: 1;

    -webkit-user-select: none;
    user-select: none;
}


.menuToggle input {
    display: block;
    width: 40px;
    height: 32px;
    position: absolute;
    top: -7px;
    left: -5px;

    cursor: pointer;

    opacity: 0;
    /* hide this */
    z-index: 2;
    /* and place it over the hamburger */

    -webkit-touch-callout: none;
}

/*
 * Just a quick hamburger
 */
.menuToggle span {
    display: block;
    width: 33px;
    height: 4px;
    margin-bottom: 5px;
    position: relative;

    background: #fe4066;
    border-radius: 3px;

    z-index: 1;

    transform-origin: 4px 0px;

    transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1.0),
        background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1.0),
        opacity 0.55s ease;
}

.menuToggle span:first-child {
    transform-origin: 0% 0%;
}

.menuToggle span:nth-last-child(2) {
    transform-origin: 0% 100%;
}

/* 
 * Transform all the slices of hamburger
 * into a crossmark.
 */
.menuToggle input:checked~span {
    opacity: 1;
    transform: rotate(45deg) translate(-2px, -1px);
    background: #232323;
}

/*
 * But let's hide the middle one.
 */
.menuToggle input:checked~span:nth-last-child(3) {
    opacity: 0;
    transform: rotate(0deg) scale(0.2, 0.2);
}

/*
 * Ohyeah and the last one should go the other direction
 */
.menuToggle input:checked~span:nth-last-child(2) {
    transform: rotate(-45deg) translate(0, -1px);
}

/*
 * Make this absolute positioned
 * at the top left of the screen
 */
.menu {
    display: flex;
    flex-direction: column;
    position: fixed;
    width: 100%;
    height: 100vh;
    margin: -100px 0 0 -50px;
    padding: 50px;
    padding-top: 125px;
    overflow-x: hidden;
    overflow-y: auto;

    background: #ededed;
    list-style-type: none;
    -webkit-font-smoothing: antialiased;
    /* to stop flickering of text in safari */

    transform-origin: 0% 0%;
    transform: translate(-100%, 0);

    transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1.0);
}


/*
 * And let's slide it in from the left
 */
.menuToggle input:checked~div {
    transform: none;
    overflow-y: hidden;
}

/* .menuToggle input:checked ~ span
{
  position: fixed;
} */


.containerLink {
    display: flex;
    align-items: center;
    margin: 40px 0;
}
</style>