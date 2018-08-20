<template>
  <div id="Content">
    <navBar></navBar>
    <keep-alive>
    <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import navBar from '../components/navBar'
export default {
  name: 'Content',
  components: { navBar }
}

</script>

<style>
</style>