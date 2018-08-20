<template>
    <div id="inchargePage" class="inchargePage">
        <h3>充值</h3>
        <div class="presentbox">
            <div class="bankbox">
            <p class="left gdwz">账户余额<span class="banlance">0.00</span>元</p>
            </div>
            <div class="bankbox">
            <p class="left gdwz">企业用户<span>杭州兵海投资管理有限公司</span></p>
            </div>
            <div class="bankbox">
            <p class="left gdwz">充值方式<span>网银充值</span></p>
            </div>
            <div class="bankbox">
            <p class="left gdwz">充值金额<span><input type="text" v-model="amount" placeholder="请输入充值金额"></span>元</p>
            </div>
        </div>
        <label class="zhaoshang-label" for="zhaoshang"><input type="radio" name="bank-name" value="0803080000" checked @click='getValue("0803080000")'><img src="../assets/images/zhaoshang.png" alt=""></label>
        <label for="pingan"><input type="radio" name="bank-name"  value="0804100000" @click='getValue("0804100000")'><img src="../assets/images/pingan.png" alt=""></label>
        <label for="minsheng"><input type="radio" name="bank-name"  value="0803050000" @click='getValue("0803050000")'><img src="../assets/images/minsheng.png" alt=""></label>
        <div class="recharge-cell flex">
        <img src="../assets/images/recharge.png" @click="chargeApply()" alt="">
        <router-link :to="'/content/accountCenter/rechargeRecord'">
            <a href="" class="recharge-btn">充值记录</a>
        </router-link> 
        </div>
        <div class="complete-tips" v-show="showTips">
        <div class="tips-rel">
            <img src="../assets/images/close_tips.png" alt="" @click="closeTips()">
            <div class="tips-box">
                <div class="title">充值遇到问题？</div>
                <p>充值完成前，请不要关闭此页面。完成充值以后，请根据您的情况点击下面按钮</p>
                <p class="tips-des">请在新开的银行存管页面中进行操作之后再选择！</p>
                <span class="complete" @click="closeTips()">已完成充值</span>
                <span class="uncomplete" @click="closeTips()">未完成充值</span>
                <p class="service">如有任何问题，请联系客服  400-698-1588</p>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import { Message } from 'element-ui';
import global_ from '../assets/js/global.js'
export default {
  name: "inchargePage",
  data:function(){
      return{
          amount:'',
          bankCode:'0803080000',
          showTips:false
      }
  },
  methods:{
      chargeApply:function(){
          if(this.amount==''||this.amount == 0){
              Message("请输入充值金额")
          }else{
              this.showTips = !this.showTips
              window.open(global_.rout+"/web-api/account/chargeApply?amount="+this.amount+"&withdrawType=00&bankCode="+this.bankCode)
          }
      },
      getValue:function(code){
          this.bankCode = code;
      },
    closeTips:function(){
        this.$api.post("/web-api/account/chargeApplyQuery",null,function(res) {
          if(res.code == 200){
              //成功
              this.$router.push('/content/accountCenter/capitalDetails')
          }else{
              //失败
              this.showTips = !this.showTips
          }
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.complete-tips{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  .tips-rel{
    position: relative;
    width: 100%;
    height: 100%;
    background-color: rgba(000,000,000,0.6);
    img{
      position: absolute;
      top: 30%;
      left: 69%;
    }
    .tips-box{
      width: 640px;
      height: 246px;
      background-color: #fff;
      border-radius: 10px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      .title{
        width: 100%;
        height: 60px;
        line-height: 60px;
        color: #2b2b2b;
        font-size: 21px;
        background-color: #f1f1f1;
        text-align: center;
        border-top-left-radius:10px; 
        border-top-right-radius:10px; 
        margin-bottom: 2px;
      }
      p{
        color: #898989;
        font-size: 16px;
        width: 560px;
        text-align: left;
        line-height: 34px;
        margin: 0 auto;
      }
      .tips-des{
        color: #555555;
      }
      .service{
        text-align: center;
      }
      span{
        display: inline-block;
        width: 185px;
        height: 37px;
        line-height: 37px;
        text-align: center;
        font-size: 17px;
        border-radius: 6px;
        margin-top: 25px;
        margin-bottom: 15px;
        cursor: pointer;
      }
      .complete{
        background-color: #fa5558;
        color: #fff;
        margin-left: 107px;
      }
      .uncomplete{
        color: #fa5558;
        border: 1px solid #fa5558;
        margin-left: 49px;
      }
    }
  }
}

input::-webkit-input-placeholder{
            color:#c0c0c0;
            font-size: 14px;
        }
h3{
    font-weight: normal;
    font-size: 24px;
    color: #2e2e2e;
    line-height: 30px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ededed;
}

.presentbox {
  width: 700px;
  margin: 80px auto;
    .bankbox{
        margin-bottom: 20px;
        p{
            font-size: 18px;
            color: #333333;
            span{
                margin-left: 30px;
            }
            input{
                width: 175px;
                height: 31px;
                line-height: 31px;
                border:1px solid #cecece;
                padding-left: 14px;
                margin-right: 14px;
            }
            .banlance{
                font-size: 24px;
                color: #fa5558;
            }
        }
    }
}

label{
    input{
        width: 15px;
        height: 15px;
        margin-right: 13px;
        margin-left: 36px;
    }
}
.zhaoshang-label{
    margin-left: 40px;
}

.recharge-cell{
    margin-left: 55px;
    margin-top: 62px;
    align-items: center;
    img{
        display: inline-block;
        width: 378px;
        height: 91px;
    }
    a{
        display: inline-block;
        color: #7a7a7a;
        font-size: 16px;
        text-decoration: none;
        margin-left: 5px;
    }
}

</style>
