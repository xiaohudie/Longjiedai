<template>
  <div id="toLogin" class="toLogin">
    <div class="wrap flex">
        <div class="login-section">
            <div class="title">
                欢迎登录
            </div>
            <div class="content">
                <div class="cell cell1">
                    <img class="phone-icon" src="../assets/images/icon-phone.png" alt="">
                    <input id="iphone" v-model="mobile" type="text" placeholder="请输入手机号码">
                </div>
                <div class="cell cell2">
                    <img class="password-icon" src="../assets/images/icon-password.png" alt="">
                    <img class="password-isopen" v-bind:src='isPassword ? "/static/icon-close.png" : "/static/icon-open.png"' alt=""  @click="changeInputType()">
                    <input id="passwordInput" v-model="password" v-bind:type='isPassword ? "password" : "text"' placeholder="请输入密码" @keyup.enter="toLogin()">
                </div>
                <router-link :to='href'>
                <img id="loginBtn" src="../assets/images/toLoginButton.png" alt="" @click="toLogin()">
                </router-link>
                <router-link to='/resetPassword'>
                    <a class="ChangePassword" href="javascript:;">忘记密码</a>
                </router-link>
                
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui';
export default {
  name: 'toLogin',
  data:function() {
    return {
        isPassword:false,
        mobile:'',
        password:'',
        href:''
    }
  },
  methods: {
  changeInputType: function() {
      this.isPassword = !this.isPassword
  },
  toLogin:function(){
      var reg=/^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/;
      let reg1=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
        if(this.mobile==''){
        Message("请输入手机号码");
        }else if(!reg.test(this.mobile)){
        Message("手机格式不正确");
        }else if(this.password==''){
            Message("请输入密码");
        // }else if(!reg1.test(this.password)){
        // Message("密码格式不正确");
        } else{
            var that = this;
            this.$api.post("/web-api/login", 
            {'mobile':this.mobile,'password':this.password}
            ,function(res) {   
                    that.$router.push('/content')
            })
        }
  }
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
input::-webkit-input-placeholder {
    /* placeholder颜色  */
    color: #a6a3a3;
    /* placeholder字体大小  */
    font-size: 12px;
  }
.toLogin{
  width: 100%;
  height: 490px;
  background: url(../assets/images/login-background.png) no-repeat;
  background-size: 100% 100%;
  -webkit-background-size: 100% 100%;
  margin-bottom: 148px;
  .wrap{
      width: 1200px;
      margin: 0 auto;
      justify-content: flex-end;
      padding-top: 50px;
      .login-section{
        width: 350px;
        height: 365px;
        text-align: center;
        background-color: #fff;
        .title{
            width: 100%;
            height: 60px;
            line-height: 60px;
            background-color: #f2f2ff;
            color:#333333;
            font-size: 18px;
            margin-bottom: 30px;
        }
        .cell1{
            .phone-icon{
                width: 12px;
                height: 18px;
                position: absolute;
                left: 10px;
                top: 13px;
            }
        }

        .cell2{
            .password-icon{
                width: 16px;
                height: 18px;
                position: absolute;
                left: 10px;
                top: 13px;
            }
            .password-isopen{
                position: absolute;
                right: 10px;
                top:20px;
            }
        }
        .cell{
            width: 290px;
            margin: 0 auto 20px;
            position: relative;
            #iphone{
                width: 100%;
            }
            input{
                width: 100%;
                display: inline-block;
                border:1px solid #cecece;
                height: 44px;
                border-radius: 4px;
                color:#555555;
                font-size: 12px;
                padding-left: 35px;
            }
        }
        #loginBtn{
            margin-top: 12px;
            width: 270px;
            height: 86px;
            line-height: 44px;
            border-radius: 4px;
            color: #fff;
            font-size: 18px;
            text-align: center;
        }
        .ChangePassword{
            display: block;
            width: 292px;
            margin: 0 auto;
            color: #fa5558;
            font-size: 16px;
            text-align: left;
        }
      }
  }
}
</style>
