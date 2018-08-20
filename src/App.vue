<template>
  <div id="app">
    <myHeader></myHeader>
    <router-view/>
    <myFooter></myFooter>
  </div>
</template>

<script>
import myHeader from './components/myHeader.vue'
import myFooter from './components/myFooter.vue'
export default {
  components: { myHeader, myFooter },
  name: 'App',
}

</script>

<style>
</style>
