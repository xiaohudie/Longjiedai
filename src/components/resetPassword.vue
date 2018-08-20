<template>
  <div id="resetPassword" class="resetPassword">
    <div class="content">
      <div class="title">
        忘记密码
      </div>
      <div class="reset-section">
        <div class="cell">
          <span>手机号码</span>
          <input v-model="mobile" type="text" placeholder="请输入您的手机号">
        </div>
        <div class="cell">
          <span>手机验证码<button @click="formatPhone()" class="cdnBtn" :disabled="disabled">{{ btntxt }}</button></span>
          <input type="number" v-model="code" placeholder="请输入验证码">
        </div>
        <div class="cell">
          <span>新的登录密码</span>
          <input type="text" v-model="password" placeholder="密码应为6-12位，字母数字组合">
        </div>
        <img class="reset-btn" @click="resetPassword()" src="../assets/images/reset-btn.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui';
export default {
  name: 'resetPassword',
  data:function() {
    return {
      mobile:'',
      code:'',
      password:'',
      time:60,
      btntxt:'获取验证码',
      disabled:false
    }
  },
  methods: {
  countdown: function() {
    let that = this;
     var timer = setInterval(function () {
        that.time--;
        that.disabled=true;
        that.btntxt=that.time+"s后重新获取";
        if (that.time == 0) {
        clearInterval(timer);
        that.disabled=false;
        that.btntxt="获取验证码";
        that.time=60;
      }
     },1000)
  },
  formatPhone:function(){
    let that = this
    var reg=/^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/;
    if(this.mobile==''){
        Message("请输入手机号码");
        }else if(!reg.test(this.mobile)){
        Message("手机格式不正确");
        }else{
        this.$api.get("/web-api/sms/getMsgCode",{"mobile":this.mobile,"type":"2"}, function(res) {
          if(res.code == "200"){
            that.countdown();
            that.time=60;
            Message(res.message);
          }else{
            Message(res.message);
          }
        });
        }
  },
  resetPassword:function(){
    var that = this;
    let reg=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
    if(this.mobile==''){
      Message("请输入手机号码");
    }else if(this.password==''){
        Message("请输入新密码");
        }else if(!reg.test(this.password)){
        Message("密码格式不正确");
        }else{
        this.$api.get("/web-api/resetPassword", {mobile:this.mobile,code:this.code,newPassword:this.newPassword},function(res) {
          Message(res.message);
        that.$router.push('/');
        });
        }
  }
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#resetPassword{
  background-color: #f5f3f3;
  width: 100%;
  overflow: hidden;
  .content{
  width: 1200px;
  margin: 0 auto;
  background-color: #fff;
  margin-top: 30px;
  margin-bottom: 65px;
  .title{
    text-align: center;
    font-size: 24px;
    color: #2d2d2d;
    height: 90px;
    line-height: 90px;
    border-bottom:1px solid #eceaea; 
  }
  .reset-section{
    padding-top: 55px;
    text-align: center;
    padding-bottom: 75px;
    .cell{
      margin-bottom: 22px;
      span{
        position: relative;
        display: inline-block;
        width: 84px;
        text-align:right;
        font-size: 14px;
        color: #2d2d2d;
        margin-right: 20px;
        .cdnBtn{
        position: absolute;
        right: -314px;
        top: -5px;
        width: 80px;
        height: 30px;
        background-color: #f5f3f3;
        border-radius: 2px;
        color: #ec3a2e;
        font-size: 12px;
      }
      }
      input{
        width: 292px;
        height: 40px;
        font-size: 12px;
        padding-left: 10px;
        border: 1px solid #e8e8e8;
        border-radius: 4px;
      }
    }
    .reset-btn{
      margin-top: 20px;
    }
  }
}
}

</style>
