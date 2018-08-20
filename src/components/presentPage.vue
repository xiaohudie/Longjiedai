<template>
<div id="presentPage">
<div class="RRhead">
    <p>提现</p>
</div>
<div class="presentbox">
<div class="bankbox">
    <p class="left gdwz">提现银行卡</p>
    <p>
        <img :src="this.logoUrl" class="bankimg" />
       <span>{{ bankName }}（尾号{{ bankAccountNo }}）</span>
    </p>
    <div class="clearfix"></div>
</div>
<div class="kyjjbox">
<p class="left gdwz">可用资金</p>
<p><span>{{balance}}</span>元</p>
<div class="clearfix"></div>
</div>
<div class="txfsbox">
<p class="left gdwz">提现方式</p>
<p>大额提现</p>
<div class="clearfix"></div>
</div>
<div class="txlxbox">
<p class="left gdwz">提现类型</p>
<p><input type="radio" id="commonPresentation" checked/><label for="commonPresentation">普通提现</label></p>
<div class="clearfix"></div>
</div>
<div class="txjebox">
<p class="left gdwz">提现金额</p>
<p><input type="text" v-model="amount" placeholder="请输入提现金额" class="amountin" />元</p>
<div class="clearfix"></div>
</div>
<div class="presentbox">
<button class="presentbtn" @click="postPresent();closeTips()">
  <img src="../assets/images/present-btn.png" />
</button>
<p class="txjl">
   <router-link :to="'/content/accountCenter/presentRecord'">
    提现记录
   </router-link>
</p>
</div>
</div>
        <div class="complete-tips" v-show="showTips">
        <div class="tips-rel">
            <img src="../assets/images/close_tips.png" alt="" @click="closeTips()">
            <div class="tips-box">
                <div class="title">{{present}}遇到问题？</div>
                <p>{{present}}完成前，请不要关闭此页面。完成{{present}}以后，请根据您的情况点击下面按钮</p>
                <p class="tips-des">请在新开的银行存管页面中进行操作之后再选择！</p>
                <span class="complete" @click="closeTips()">已完成{{present}}</span>
                <span class="uncomplete" @click="closeTips()">未完成{{present}}</span>
                <p class="service">如有任何问题，请联系客服  400-698-1588</p>
            </div>
        </div>
        </div>
</div>
</template>

<script>
import { Message } from 'element-ui';
import global_ from '../assets/js/global.js'
var balance;
export default {
  name: "presentPage",
  data:function() {
    return {
      logoUrl: "",
      bankName: "",
      bankAccountNo: "",
      balance: "",
      amount: "",
      showTips: false,
      present: "提现"
    };
  },
  mounted:function() {
    this.getCard(), this.getBalance();
  },
  methods: {
    getCard: function() {
      var that = this;
      this.$api.get("/web-api/account/getLoanerBank", null, function(res) {
        that.logoUrl = res.data.logoUrl;
        that.bankName = res.data.bankName;
        that.bankAccountNo = res.data.bankAccountNo.substr(-4);
      });
    },
    getBalance: function() {
      var inthat = this;
      this.$api.get("/web-api/account/getAccountInfo", null, function(res) {
        inthat.balance = res.data.balance;
        balance = inthat.balance;
      });
    },
    postPresent: function() {
      if (this.amount > balance) {
        Message("您的余额不足");
        this.amount="";
      } else {
        window.open(
          global_.rout+"/web-api/account/cashApply?amount=" +
            this.amount +
            "&withdrawType=00"
        );
      }
    },
    closeTips: function() {
      this.$api.post("/web-api/account/cashApplyQuery", null, function(res) {
        if (res.code == 200) {
          //成功
          this.$router.push("/content/accountCenter/capitalDetails");
        } else {
          //失败
          this.showTips = !this.showTips;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.clearfix {
  clear: both;
}
.left {
  float: left;
}
.right {
  float: right;
}
.RRhead {
  width: 840px;
  height: 39px;
  margin: auto;
  border-bottom: 1px solid #ededed;
  p {
    font-size: 24px;
    color: #2e2e2e;
  }
}
.complete-tips {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  .tips-rel {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: rgba(000, 000, 000, 0.6);
    img {
      position: absolute;
      top: 30%;
      left: 69%;
    }
    .tips-box {
      width: 640px;
      height: 246px;
      background-color: #fff;
      border-radius: 10px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .title {
        width: 100%;
        height: 60px;
        line-height: 60px;
        color: #2b2b2b;
        font-size: 21px;
        background-color: #f1f1f1;
        text-align: center;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        margin-bottom: 2px;
      }
      p {
        color: #898989;
        font-size: 16px;
        width: 560px;
        text-align: left;
        line-height: 34px;
        margin: 0 auto;
      }
      .tips-des {
        color: #555555;
      }
      .service {
        text-align: center;
      }
      span {
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
      .complete {
        background-color: #fa5558;
        color: #fff;
        margin-left: 107px;
      }
      .uncomplete {
        color: #fa5558;
        border: 1px solid #fa5558;
        margin-left: 49px;
      }
    }
  }
}
.presentbox {
  width: 700px;
  margin: 80px auto;
  .bankbox {
    height: 50px;
    line-height: 50px;
    .gdwz {
      width: 92px;
      text-align: right;
      font-size: 18px;
      color: #333;
      margin-right: 36px;
    }
    .bankimg {
      margin-top: 7px;
      position: relative;
      height: 35px;
      margin-right: 14px;
    }
    p {
      span {
        top: -10px;
        position: relative;
      }
    }
  }
  .kyjjbox {
    height: 50px;
    line-height: 50px;
    .gdwz {
      width: 92px;
      text-align: right;
      font-size: 18px;
      color: #333;
      margin-right: 36px;
    }
    p {
      span {
        font-size: 24px;
        color: #ff0844;
        margin-right: 13px;
      }
    }
  }
  .txfsbox {
    height: 50px;
    line-height: 50px;
    .gdwz {
      width: 92px;
      text-align: right;
      font-size: 18px;
      color: #333;
      margin-right: 36px;
    }
  }
  .txlxbox {
    height: 50px;
    line-height: 50px;
    .gdwz {
      width: 92px;
      text-align: right;
      font-size: 18px;
      color: #333;
      margin-right: 36px;
    }
  }
  .txjebox {
    height: 50px;
    line-height: 50px;
    .gdwz {
      width: 92px;
      text-align: right;
      font-size: 18px;
      color: #333;
      margin-right: 36px;
    }
    p {
      input {
        width: 175px;
        height: 31px;
        background-color: #ffffff;
        border: solid 1px #cecece;
        margin-right: 14px;
      }
    }
  }
  #commonPresentation{
    margin-right: 13px;
  }
}
.presentbox {
  margin-top: 60px;
  position: relative;
  p.txjl {
    position: absolute;
    left: 360px;
    top: 28px;
    a {
      text-decoration: none;
      font-size: 16px;
      color: #7a7a7a;
    }
  }
  .presentbtn {
    cursor: pointer;
  }
}
.amountin {
  padding-left: 11px;
  font-size: 14px;
}
</style>