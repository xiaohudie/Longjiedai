<template>
  <div id="login" style="width: 100%;background-color: #fff;">
    <div class="logo-wrap" style="width:1200px;margin: 0 auto; padding:10px 0;background:#fff;">
        <img src="../assets/images/logo.png" alt="logo">
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'login',
  data:function () {
    return {
    }
  }
}
</script>
