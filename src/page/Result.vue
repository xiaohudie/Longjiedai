<template>
  <div id="Result">
  <div class="ResultHearder" style="width: 100%;background-color: #fff;">
    <div class="logo-wrap" style="width:1200px;margin: 0 auto; padding:10px 0;background:#fff;">
        <img src="../assets/images/logo.png" alt="logo">
    </div>
    </div>
    <div class="Resultbox">
         <div class="inResult">
<img :src="img" class="inleft" />
<div class="inright">
    <p class="tishi">{{ message }}</p>
    <p class="reason">{{ errorReson }}</p>
</div>
<div class="clearfix"></div>
         </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Result",
  data:function() {
    return {
      img: "",
      message: "",
      errorReson: ""
    };
  },
  mounted:function() {
    this.resultInfo();
  },
  methods: {
    getUrlParam:function(name){
      var str = decodeURI(location.href); //取得解码后的地址栏
      var num = str.indexOf("?");
      str = str.substr(num + 1);
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
      var r = str.match(reg); //匹配目标参数
      if (r != null) return unescape(r[2]);
      return null; //返回参数值
    },
    resultInfo:function(){
      let s = this.getUrlParam("status");
      let m = this.getUrlParam("message");
      let e = this.getUrlParam("errorReson");
      this.message = m;
      this.errorReson = e;
      if (s == "success") {
        this.img = "/static/Success.png";
      } else {
        this.img == "/static/Fail.png";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.clearfix {
  clear: both;
}
.Resultbox {
  width: 1200px;
  height: 614px;
  margin: 30px auto 100px auto;
  background: #fff;
  position: relative;
  .inResult {
    width: 551px;
    height: 72px;
    position: absolute;
    top: 220px;
    left: 325px;
    .inleft {
      float: left;
    }
    .inright {
      float: right;
      width: 455px;
      .tishi {
        font-family: MicrosoftYaHei;
        font-size: 28px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #2e2e2e;
      }
      .reason {
        font-family: MicrosoftYaHei;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #6d6d6d;
        margin-top: 12px;
      }
    }
  }
}
</style>