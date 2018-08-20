<template>
    <div id="projectClassify_detail">
        <div class="waitrechargebox">
<img src="../assets/images/yhkicon.png" class="biaojiimg" />
        <div class="detail_left">
            <div class="dl1">
            <p class="BTleft">{{tenderName}}</p>
           <p class="Timeright" v-if="repayDate==0">还款时间：--</p>
             <p class="Timeright" v-else>还款时间：{{repayDate | newFormatDate}}</p>
            <div class="clearfix"></div>
            </div>
            <div class="dl2">
            <p class="dl2left">
             {{baseRate}}<span style="font-size:30px;color: #fd4e52;">%</span>+{{ratePlus}}<span style="font-size:30px;color: #fd4e52;">%</span><br>
             <span>预期年化收益</span>
            </p>
            <p class="dl2left2">
              {{debitTerm}}<span style="font-size:30px;color: #535353;">天</span><br>
              <span>投资期限</span>
            </p>
            <p class="dl2right">
             {{baseMoney}}<span style="font-size:30px;color: #535353;">元</span><br>
            <span>起投金额</span>
            </p>
            <div class="clearfix"></div>
            </div>
            <div class="percentin">
                  <div class="inpercenttiao" :style='"width:"+realColMoney/amount*100+"%"'></div>
            </div>
            <div class="dl3">
             <p class="dl3right">投资进度{{realColMoney/amount}}%</p>
             <div class="clearfix"></div>
            </div>
            <ul class="dlul">
               <li>
                   <p class="li1_1 ulleft">融资金额&nbsp;&nbsp;{{amount}}元</p>
                   <p class="li1_2 ulright" v-if="moneyEnoughTime==0||moneyEnoughTime==''||moneyEnoughTime==null">满标时间&nbsp;&nbsp;&nbsp;&nbsp;--</p>
                   <p class="li1_2 ulright" v-else>满标时间&nbsp;&nbsp;&nbsp;&nbsp;{{moneyEnoughTime | newFormatDate}}</p>
                   <div class="clearfix"></div>
               </Li>
               <li>
                    <p class="li2_1 ulleft">实际融资金额&nbsp;&nbsp;{{realColMoney}}元</p>
                   <p class="li2_2 ulright" v-if="loanFinishTime==0||loanFinishTime==''||loanFinishTime==null">资金转入&nbsp;&nbsp;&nbsp;&nbsp;--</p>
                    <p class="li2_2 ulright" v-else>资金转入&nbsp;&nbsp;&nbsp;&nbsp;{{loanFinishTime | newFormatDate}}</p>
                   <div class="clearfix"></div>
               </Li>
               <li>
                    <p class="li3_1 ulleft">投资人收益&nbsp;&nbsp;{{sumInterest}}元</p>
                   <p class="li3_2 ulright" v-if="repayDate==0||repayDate==''||repayDate==null">还款时间&nbsp;&nbsp;&nbsp;&nbsp;--</p>
                     <p class="li3_2 ulright" v-else>还款时间&nbsp;&nbsp;&nbsp;&nbsp;{{repayDate | newFormatDate}}</p>
                   <div class="clearfix"></div>
               </Li>
            </ul>
        </div>
        <div class="detail_right">
           <div class="dr1">
               <p class="dr1left">账户余额：<span>{{balance}}</span>元</p>
               <p class="dr1right">
                   <router-link :to="'/content/accountCenter/inchargePage'">
                   充值
                   </router-link>
               </p>
               <div class="clearfix"></div>
           </div>
           <div class="dr2">
              <p>实际还款：<input class="money" name="moneyinput" v-model="inputvalue" readonly="readonly"  /><span>元</span></p>
           </div>
           <div class="dr33">
                <a>
                 <img src="../assets/images/yhkbtn.png"/>
                   </a>
           </div>
           <div class="dr4">
               <p>温馨提示：</p>
               <p>1. 实际还款金额=实际还款+投资人收益</p>
               <p>2. 账户余额不足时，请及时充值，以免耽误还款时间。</p>
           </div>
        </div>
        <div class="clearfix"></div>
        </div>
        <div class="waitrechargeul">
           <div class="ulhead">
               <img src="../assets/images/tzjl.png" />
               <span>投资记录</span>
           </div>
           <table class="tzjltable">
               <thead>
                   <tr>
                       <td>
                           序号
                       </td>
                        <td>
                          投资人
                       </td>
                       <td>
                           投资金额（元）
                       </td>
                       <td>
                           投资时间
                       </td>
                   </tr>
               </thead>
               <tbody>
                   <tr v-for="(item,index) in dataList">
                       <td>
                          {{index+1+((data.pageIndex-1)*10)}}
                       </td>
                       <td>
                           {{item.phone}}
                       </td>
                       <td>
                           {{item.money}}
                       </td>
                       <td>
                           {{item.investTime | formatDate}}
                       </td>
                   </tr>
               </tbody>
           </table>
<el-pagination background layout="prev, pager, next" :page-count="pagecount" :pager-count="11" @current-change="postpageIndex" @prev-click="postpageIndex" @next-click="postpageIndex"> </el-pagination>
           <div class="clearfix"></div>
        </div>
    </div>
</template>
<script>
import { formatDate, newFormatDate } from "../assets/js/date.js";
var tenderId, inputvalue;
export default {
  name: "projectClassify_detail",
  data:function() {
    return {
      data: [],
      dataList: [],
      pagecount: 0,
      tenderId,
      tenderName: "",
      baseRate: "",
      ratePlus: "",
      debitTerm: "",
      baseMoney: "",
      repayDate: "",
      amount: "",
      moneyEnoughTime: "",
      realColMoney: 0,
      loanFinishTime: "",
      sumInterest: 0,
      balance: "",
      inputvalue: 0
    };
  },
  mounted:function() {
    tenderId = this.$route.params.id;
    this.getPageInvest();
    this.getBalance();
    this.getRepaymentdetail();
  },
  methods: {
    getRepaymentdetail:function() {
      var detail = this;
      this.$api.get(
        "/web-api/tender/getTender",
        {"tenderId":tenderId},
        function(res) {
          detail.tenderName = res.data.tenderName;
          detail.baseRate = res.data.baseRate;
          detail.ratePlus = res.data.ratePlus;
          detail.debitTerm = res.data.debitTerm;
          detail.baseMoney = res.data.baseMoney;
          detail.repayDate = res.data.repayDate;
          detail.amount = res.data.amount;
          detail.moneyEnoughTime = res.data.moneyEnoughTime;
          detail.realColMoney = res.data.realColMoney;
          detail.loanFinishTime = res.data.loanFinishTime;
          detail.sumInterest = res.data.sumInterest;
          inputvalue = detail.realColMoney + detail.sumInterest;
        }
      );
    },
    getPageInvest:function() {
      var that = this;
      this.$api.get(
        "/web-api/tender/getPageInvest",
       {"tenderId":tenderId},
       function(res) {
          that.data = res.data;
          that.dataList = res.data.dataList;
          that.pagecount = res.data.pageCount;
        }
      );
    },
    postpageIndex:function(index) {
      let that = this;
      var inpagenum = index;
      this.$api.post(
        "/web-api/tender/getPageInvest",
        {"tenderId":tenderId,"pageIndex":inpagenum},
       function(res) {
          that.data = res.data;
          that.dataList = res.data.dataList;
        }
      );
    },
    getBalance: function() {
      var inthat = this;
      this.$api.get("/web-api/account/getAccountInfo", null, function(res) {
        inthat.balance = res.data.balance;
      });
    }
  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
    newFormatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy年MM月dd日");
    }
  }
};
</script>
<style lang="scss">
@import "../assets/css/projectRepayment_detail.scss";
</style>
