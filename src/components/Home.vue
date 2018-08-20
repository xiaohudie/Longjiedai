<template>
  <div id="Home">
    <div class="wrap">
      <div class="top-section">
        <div class="classification-nav flex">
          <div class="bank flex1">
            <img src="../assets/images/bank.png" alt="">
            <div class="nav-info">
              <h3>银行存管</h3>
              <p>攀枝花市商业银行</p>
            </div>
          </div>
          <div class="industry flex1">
            <img src="../assets/images/industry.png" alt="">
            <div class="nav-info">
              <h3>行业权威</h3>
              <p>中国互金行业优秀示范企业</p>
            </div>
          </div>
          <div class="compliance-safety flex1">
            <img src="../assets/images/compliance.png" alt="">
            <div class="nav-info">
              <h3>合规安全</h3>
              <p>正式获得ICP经营许可证</p>
            </div>
          </div>
          <div class="safe-reliable flex1">
            <img src="../assets/images/safe.png" alt="">
            <div class="nav-info">
              <h3>安全可靠</h3>
              <p>可信网站3A认证</p>
            </div>
          </div>
        </div>
        <div class="account-information">
          <img src="../assets/images/account-user.png" alt="">
          <span>账户信息</span>
        </div>
        <div class="balance-info">
          <div class="cell" style="margin-top:31px;">
            <span>账户可用余额（元）：</span><span class="balance">     ¥{{ balance }}</span>
            <span>提现冻结余额（元）：</span><span class="balance">     ¥{{ freezeCash }}</span>
          </div>
          <div class="cell">
            <span>还款冻结余额（元）：</span><span class="balance">     ¥{{ freezeRepay }}</span>
            	<router-link class="recharge" :to="'/content/accountCenter/inchargePage'">
                充值
              </router-link>
              <router-link class="putForward" :to="'/content/accountCenter/presentPage'">
                提现
              </router-link>
          </div>
        </div>
      </div>
      <div class="bottom-section">
        <div class="account-information">
          <img src="../assets/images/account-user.png" alt="">
          <span>账户信息</span>
        </div>
        <div class="repayment-info">
          <span>待还款:
            <router-link class="recharge" :to="'/content/projectClassify'">
                {{ repayCount }}
            </router-link>笔
          </span>
          <span>待审核:
            <router-link class="recharge" :to="'/content/projectAudit'">
                {{ repaidCount }}
            </router-link>笔
          </span>
          <span>已还款:
            <router-link class="recharge" :to="'/content/projectRepayment'">
                {{ inCheckCount }}
            </router-link>笔(共计还款金额¥{{ repaySumMoney }})
          </span>
          <span>募集中:
            <router-link class="recharge" :to="'/content/projectRaise'">
                {{ collectCount }}
            </router-link>笔(共计还款金额¥{{ repaySumMoney }})
          </span>
          <span>逾&nbsp;&nbsp;&nbsp;期:<a class="overdue" href="javascript:;">--</a>笔</span>
        </div>
      </div>
      <div class="pop" v-show="popShow">
        <div class="rel">
          <div class="OpenAccount">
            <img src="../assets/images/openBtn.png" alt="" @click="OpenAccount()">
          </div>   
        </div>
      </div>



    </div>
    <div class="sqbox" v-show="authorizationShow">
      <div class="sqin">
        <p class="yjsq">一键授权</p>
        <p class="ywcz">输入交易密码授权一键自动审核权限</p>
        <P class="cunguanpass">存管交易密码<input class="jiaoyipass" v-model="tradePassword" placeholder="请输入正确的验证码" /></P>
        <p class="forgetpass"><a @click="forgetPassword()">忘记存管交易密码？</a></p>
        <div class="confirmbtn">
          <img src="../assets/images/confirm-btn.png" @click="toAuditAuth()"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import global_ from '../assets/js/global.js'
export default {
  name: 'home',
  data :function() {
    return {
        balance:'--',
        freezeCash:'--',
        freezeRepay:'--',
        repayCount:'--',
        repaidCount:'--',
        inCheckCount:'--',
        collectCount:'--',
        popShow:false,
        authorizationShow:false,
        tradePassword:'',
        repaySumMoney:'0',
    }
  },
  mounted:function(){
  this.isOpenAccount()
  },
  methods:{
      getHomeInformation:function(){
        var that = this;
        this.$api.get("/web-api/account/getLoanerAccount", null,function(res) {
        that.balance = res.data.loanerAccountInfo.balance;
        that.freezeCash = res.data.loanerAccountInfo.freezeCash;
        that.freezeRepay = res.data.loanerAccountInfo.freezeRepay;
        that.repayCount = res.data.countInfo.repayCount;
        that.repaidCount = res.data.countInfo.repaidCount;
        that.inCheckCount = res.data.countInfo.inCheckCount;
        that.collectCount = res.data.countInfo.collectCount;
        that.repaySumMoney = res.data.countInfo.repaySumMoney;
        });
      },
      OpenAccount:function(){
        window.open(global_.rout+"/web-api/account/comContract");
      },
      closePop:function(){
        this.popShow = !this.popShow;
      },
      closePopAuthorization:function(){
        this.authorizationShow = !this.authorizationShow;
      },
      isOpenAccount:function(){
        var that= this;
        this.$api.post("/web-api/account/getLoanerInfo",null,function(res) {
          if(res.data.openStatus != 4){
            that.closePop();
          }else{
            if(res.data.refundAuth !=1){
              that.closePopAuthorization();
            }else{
              that.getHomeInformation()
            }
          }
        });
      },
    toAuditAuth:function(){
      if(this.tradePassword == ''){
        alert('请输入交易密码')
      }else{
        let that = this
        this.$api.get("/web-api/account/auditAuth",{"tradePassword":that.tradePassword},function(res) {
          if(res.code == 200){
            alert(res.message)
            that.closePopAuthorization()
          }else{
            alert(res.message)
          }         
        })
      }
    },
    forgetPassword:function(){
       window.open(global_.rout+"/web-api/account/findTradePassword");
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
 .sqbox{
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.5);
    top: 0;
    left: 0;
    z-index: 100;
    .sqin{
      background: url(../assets/images/llbg.png)no-repeat;
      position: fixed;
      width: 411px;
      height: 422px;
      top: 25%;
      left: 36%;
    }
    .yjsq{
      position: absolute;
      top: 162px;
      left: 160px;
      font-size: 22px;
    }
    .ywcz{
      position: absolute;
    top: 220px;
    left: 45px;
    font-size: 20px;
    color: #898989;
    }
    .cunguanpass{
      position: absolute;
      top: 263px;
      left: 45px;
      font-size: 20px;
      color: #555555;
      .jiaoyipass{
        width: 178px;
        border: 2px solid #bdbdbd;
        border-radius: 5px;
        height: 42px;
        margin-left: 22px;
        font-size: 16px;
        padding-left: 5px;
      }
    }
    .forgetpass{
      text-align: right;
      position: absolute;
      top:313px;
      left: 45px;
      width: 310px;
      a{
        color: #fa5558;
        font-size: 16px;
        text-decoration: underline;
      }
    }
    .confirmbtn{
      width: 174px;
      height: 46px;
      position: absolute;
      top: 345px;
      left: 94px;
      cursor: pointer;
    }
  }
  .wrap{
    background: url(../assets/images/home-background.jpg) no-repeat;
    background-size: 100% 490px;
    -webkit-background-size: 100% 490px;
    position: relative;
    background-color: #f5f3f3;
    width: 100%;
    height: 1058px;
    padding-top: 410px;
    .pop{
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-color: rgba(000, 000, 000, .6);
      z-index: 99;
      .rel{
        position: relative;
        width: 100%;
        height: 100%;
        .OpenAccount{
          position: absolute;
          width: 410px;
          height: 517px;
          background: url(../assets/images/openAccount.png) no-repeat;
          background-size: 100% 100%;
          top: 50%;
          left: 50%;  
          transform: translate(-50%,-50%);
          -webkit-transform: translate(-50%,-50%);
          padding-top: 438px;
          img{
            display: block;
            margin: 0 auto;
            width: 270px;
            height: 80px;
          }
        }
      }
    }
    .top-section{
      width: 1200px;
      margin: 0 auto;
      background-color: #fff;
      padding: 35px;
      -moz-box-shadow:0px 0px 10px #cccccc; 
      -webkit-box-shadow:0px 0px 10px #cccccc; 
      box-shadow:0px 2px 10px #cccccc;
      .classification-nav{
        align-items: center;
        .flex1{
          text-align: left;
            img{
              margin-right: 10px;
              width: 50px;
              height: 50px;
              display: inline-block;
              margin-bottom: -7px;
              }
            .nav-info{
              display: inline-block;
              h3{
                color: #333333;
                font-size: 18px;
                text-align: left;
                margin-bottom: 5px;
              }
              p{
                color: #a0a0a0;
                font-size: 14px;
                text-align: left;
              }
            }
        }
      }
      .account-information{
        text-align: left;
        margin-top: 35px;
        border-bottom:1px solid #ededed;
        padding-bottom: 8px; 
        img{
          width: 18px;
          height: 18px;
        }
        span{
          color: #636363;
          font-size: 20px;
        }
      }
      .balance-info{
        .cell{
          margin-top: 15px;
          text-align: left;
          span{
            color: #333333;
            font-size: 18px;
          }
          .balance{
            color: #fa5558;
            font-size: 18px;
            margin-right: 55px;
            width: 103px;
            display: inline-block;
          }
          a{
            display: inline-block;
            text-decoration: none;
            width: 108px;
            height: 46px;
            line-height: 46px;
            color: #fff;
            border-radius: 8px;
            text-align: center;
          }
          .recharge{
            background-color: #fc4147;
            margin-left: 539px;
            margin-right: 25px;
          }
          .putForward{
            background-color: #5fb9ff;
          }
        }
      }
    }
    .bottom-section{
      width: 1200px;
      margin: 0 auto;
      background-color: #fff;
      padding: 35px;
      margin-top: 24px;
      border-bottom:1px solid #dce1ea;
      .account-information{
        text-align: left;
        border-bottom:1px solid #ededed;
        padding-bottom: 8px; 
        img{
          width: 18px;
          height: 18px;
        }
        span{
          color: #636363;
          font-size: 20px;
        }
      }
      .repayment-info{
        width: 100%;
        text-align: left;
        span{
          display: inline-block;
          color: #333333;
          font-size: 17px;
          width: 49.5%;
          margin-top: 24px;
          a{
            color: #fa5558;
            font-size: 17px;
            margin-left: 15px;
            margin-right: 15px;
          }
        }
      }
    }
  }
  .overdue{
    text-decoration: none;
  }
</style>
