<template>
<div id="nav">
<div class="area">
<div class="logo">
<router-link :to="'/content/'">
<img src="../assets/images/logo.png" />
</router-link>
</div>
<ul class="nav">
<li v-for="(tab, index) in tabs" v-bind:class='{ "active": tab.select }' @click="tabsSwitch(index)">
<div>
	<router-link :to="tab.link">
      {{ tab.name }}
  </router-link>
</div>
</li>
</ul>
<div class="clearfix"></div>
</div>
</div>
</template>

<script>
export default {
name: "navBar",
data:function(){
    return{
              tabs: [
              {
                name:'首页',
                select: true,
                link:'/content'
              },
              {
                name:'平台项目',
                select: false,
                link:'/content/projectClassify'
              }, 
              {
                name:'项目审核',
                select: false,
                link:'/content/projectAudit'
              },
               {
                name:'账户中心',
                select: false,
                link:'/content/accountCenter/accountOverview'
              },
              ]
    }
},
  watch:{
    '$route':function(){
      if(this.$route.path=="/content/accountCenter/inchargePage"){
        this.tabsSwitch(3)
      }
      if(this.$route.path=="/content/accountCenter/presentPage"){
        this.tabsSwitch(3)
      }
      if(this.$route.path=="/content"){
        this.tabsSwitch(0)
      }
      if(this.$route.path=="/content/projectClassify" ||this.$route.path=="/content/projectRepayment"||this.$route.path=="/content/projectRaise"){
        this.tabsSwitch(1)
      }
      if(this.$route.path=="/content/projectAudit"){
        this.tabsSwitch(2)
      }
    }
  },
  methods: {
  tabsSwitch: function(tabIndex) {
      let len = 4;

    for(var i = 0; i < len; i++) {
      this._data.tabs[i].select = false;
      
    }
    this._data.tabs[tabIndex].select = true;
  }
}
};
</script>

<style lang="scss" scoped>
.clearfix{
clear: both;
}
#nav{
width: 100%;
margin: 0;
background: #fff;
}
.area{
width: 1200px;
margin: auto;
background: #fff;
}
.logo{
float: left;
margin-top: 13px;
}
.nav{
width: 464px;
float: right;
li{
height: 90px;
line-height: 90px;
display: inline-block;
}
li a{
font-size: 20px;
font-family: '微软雅黑';
font-weight: bold;
text-decoration: none;
padding: 0 18px;
color: #595959;
display: block;
}
li.active{
border-bottom: 3px solid #fd4e52;
}
}
</style>