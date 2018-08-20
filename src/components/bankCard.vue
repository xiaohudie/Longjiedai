<template>
    <div id="bankCard" class="bankCard">
        <h3>银行卡</h3>
        <div class="card">
            <div class="card-title">
                <img :src="this.logoUrl" alt="">
                <span class="card-name">{{ bankName }}</span>
            </div>
            <h4>**** **** **** {{ bankAccountNo }}</h4>
        </div>
    </div>

</template>

<script>
export default {
  name: "bankCard",
  data:function(){
      return{
          logoUrl:'/static/zhaoshang-logo.png',
          bankName:'招商银行',
          bankAccountNo:'5287'
      }
  },
  mounted:function(){
    this.getCard()
  },
  methods:{
      getCard:function(){
        var that = this;
        this.$api.get("/web-api/account/getLoanerBank", null,function(res) {
        that.logoUrl = res.data.logoUrl;
        that.bankName = res.data.bankName;
        that.bankAccountNo = res.data.bankAccountNo.substr(-4);
        });
      }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
h3{
font-weight: normal;
font-size: 24px;
color: #2e2e2e;
line-height: 30px;
padding-bottom: 10px;
border-bottom: 1px solid #ededed;
}

.card{
margin-top: 52px;
width: 375px;
height: 195px;
border-radius: 14px;
background: url(../assets/images/bank-card.png) no-repeat;
background-size: 100% 100%;
-webkit-background-size: 100% 100%;
padding:20px 16px;
.card-title{
margin-bottom: 42px;
img{
display: inline-block;
width: 38px;
height: 38px;
margin-bottom: -13px;
margin-right: 16px;
}
span{
display: inline-block;
font-size: 20px;
color: #fff;
margin-top: -5px;
}
}
h4{
text-align: center;
color: #fff;
font-size: 25px;
}
}
</style>
