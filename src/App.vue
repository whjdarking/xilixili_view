<template>
  <div id="app">
    <top_navi></top_navi>
    <router-view></router-view>
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

</style>
