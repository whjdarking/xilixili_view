<template>
    <div id="app" class="app">
        <top_navi></top_navi>
        <router-view :key="$route.fullPath"></router-view>
    </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import top_navi from "./components/top_navi"

export default {
    name: 'app',
    components: {
        top_navi
    }
}
</script>

<style>
.app {
    max-width: 1400px;
    margin: 0 auto;
}

@media screen and (min-width: 2500px) {
    .abc {
        width: 2400px
    }
}

@media screen and (min-width: 2000px) {
    .abc {
        width: 1400px
    }
}

@media screen and (min-width: 1610px) {
    .abc {
        width: 1100px
    }
}

</style>
