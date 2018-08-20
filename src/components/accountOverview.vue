<template>
    <div id="accountInformation">
        <h3>账户总览</h3>
        <p>账户余额（元）：<span>{{ balance }}</span></p>
        <p class="banlance-des"><i class="red"></i>昨日募集金额 (元) ： <span>{{ yesCollectMoney }}</span></p>
        <p class="banlance-des"><i class="yellow"></i>今日待还款 (元) ： <span>{{ todRemRepayMoney }}</span></p>
        <p class="banlance-des"><i class="bule"></i>今日已还款 (元) ： <span>{{ todRepaidMoney }}</span></p>
    </div> 
</template>

<script>
export default {
  name: "Account",
  data:function(){
      return{
          balance:'0.00',
          yesCollectMoney:'0.00',
          todRemRepayMoney:'0.00',
          todRepaidMoney:'0.00'
      }
  },
  mounted:function(){
    this.getAccountInformation()
  },
  methods:{
      getAccountInformation:function(){
        var that = this;
        this.$api.get("/web-api/account/getAccountInfo", null,function(res) {
        that.balance = res.data.balance;
        that.yesCollectMoney = res.data.yesCollectMoney;
        that.todRemRepayMoney = res.data.todRemRepayMoney;
        that.todRepaidMoney = res.data.todRepaidMoney;
        });
      }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    #accountInformation{
        h3{
          font-weight: normal;
          font-size: 24px;
          color: #2e2e2e;
          line-height: 30px;
          padding-bottom: 10px;
          border-bottom: 1px solid #ededed;
        }
        p{
          margin-top: 68px;
          margin-left: 50px;
          font-size: 18px;
          color: #2e2e2e;
          span{
            font-size: 50px;
            color: #666666;
          }
        }
        .banlance-des{
          margin-top: 22px;
          i{
            display: inline-block;
            width: 20px;
            height: 20px;
            border-radius: 4px;
            margin-bottom: -4px;
            margin-right: 20px;
            margin-left: 20px;
          }
          .red{
            background-color: #fb3365;
          }
          .yellow{
            background-color: #f4b649;
          }
          .bule{
            background-color: #5fb9ff;
          }
          span{
            color: #666666;
            font-size: 30px;
          }
        }
    }
</style>
