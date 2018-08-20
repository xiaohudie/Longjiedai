<template>
  <div id="Header" class="header">
    <div class="header-info flex">
      <div class="info-left flex1">
        <img src="../assets/images/call.png" alt="">
        <span class="call">客服热线：400-698-1588</span>
        <span class="call-time">（周一至周五：09:00~21:00，周六至周日：09:00~17:00）</span>
      </div>
      <div class="info-right">
        <!-- <router-link :to="'/'"> -->
          <span :class="hasPhone ? 'hasLogin' : 'user-phone' ">{{ login }}</span>
        <!-- </router-link> -->
        |
        <router-link :to="path">
          <span @click="exit()" class="exit">退出</span>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Header',
    data:function() {
      return {
        path:'',
        login:'登录',
        hasPhone:false
      }
    },
    mounted:function(){
      let t = this.getCookie("web-token")
      if(t != ''&& t != null){
        this.getPhone()
      }else{
        this.login = '登录'
        this.hasPhone = false
      }
    },
    watch: {
      '$route':function(){
        let t = this.getCookie("web-token")
        if(t != ''&& t != null){
          this.getPhone()
        }else{
          this.login = '登录'
          this.hasPhone = false
        }
      }
    },
    methods:{
      getCookie:function (name){
      var strcookie = document.cookie;//获取cookie字符串
      var arrcookie = strcookie.split("; ");//分割
      //遍历匹配
      for ( var i = 0; i < arrcookie.length; i++) {
      var arr = arrcookie[i].split("=");
      if (arr[0] == name){
      return arr[1];
      }
      }
      return "";
      },
      getPhone:function(){
        let that = this;
        this.$api.get("/web-api/account/getLoanerInfo", null,function(res) {
           that.login ='欢迎您！' + res.data.mobile
            that.hasPhone = true
        });
      },
      exit:function(){
        let that = this;
        this.$api.get("/web-api/logout", null,function(res) {
           this.$router.push('/')
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.header{
position: relative;
width: 100%;
background-color: #fff;
&:before{
position: absolute;
top: 30px;
left: 0;
content: '';
background-color: #f0f0f0;
width: 100%;
height: 1px;
}
.header-info{
width: 1200px;
margin: 0 auto;
height: 30px;
line-height: 30px;
background: #fff;
.info-left{
img{
width: 18px;
height: 15px;
margin-bottom: -2px;
margin-right: 10px;
}
.call{
font-size: 14px;
color: #000000;
margin-right: 15px;
}
.call-time{
color: #7f7f7f;
font-size: 14px;
}
}
.info-right{
.user-phone{
font-size: 12px;
color: #000000;
margin-right: 10px;
}
.exit{
font-size: 12px;
color: #000000;
margin-left: 10px;
}
}
}
}

.info-right {
  color: #dedede;
}
.info-right a:first-child{
  text-decoration: none;
}

.my{
  width: 22px;
  height: 22px;
  margin-right: 5px;
  margin-bottom: -5px;
}

.hasLogin{
  color: #fa5558;
  font-size: 12px;
  margin-right: 10px;
}
</style>