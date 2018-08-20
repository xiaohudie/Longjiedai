<template>
    <div id="projectClassify_detail">
        <div class="waitrechargebox">
<img src="../assets/images/dqricon.png" class="biaojiimg" />
        <div class="detail_left">
            <div class="dl1">
            <p class="BTleft">{{tenderName}}</p>
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
            </div>
            <div class="dl3">
             <p class="dl3right">投资进度100%</p>
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
                    <p class="li2_2 ulright" v-if="loanFinishTime==0||loanFinishTime==' '||loanFinishTime==null">资金转入&nbsp;&nbsp;&nbsp;&nbsp;--</p>
                    <p class="li2_2 ulright" v-else>资金转入&nbsp;&nbsp;&nbsp;&nbsp;{{loanFinishTime | newFormatDate}}</p>
                   <div class="clearfix"></div>
               </Li>
               <li>
                    <p class="li3_1 ulleft"></p>
                  <p class="li3_2 ulright" v-if="repayDate==0||repayDate==''||repayDate==null">还款时间&nbsp;&nbsp;&nbsp;&nbsp;--</p>
                     <p class="li3_2 ulright" v-else>还款时间&nbsp;&nbsp;&nbsp;&nbsp;{{repayDate | newFormatDate}}</p>
                   <div class="clearfix"></div>
               </Li>
            </ul>
        </div>
        <div class="detail_right">
           <div class="dr3">
                <router-link :to="'/content/'">
                 <img src="../assets/images/shbtn.png"/>
                   </router-link>
           </div>
        </div>
        <div class="clearfix"></div>
        </div>
    </div>
</template>
<script>
import { formatDate , newFormatDate} from "../assets/js/date.js";
var tenderId;
export default {
  name: "projectClassify_detail",
   data:function() {
    return {
      data: [],
      dataList: [],
      pagecount: 0,
      tenderId,
      tenderName:'',
      baseRate:'',
      ratePlus:'',
      debitTerm:'',
      baseMoney:'',
      repayDate:'',
      amount:'',
      moneyEnoughTime:'',
      realColMoney:0,
      loanFinishTime:'',
      sumInterest:0,
      balance: "",
    };
  },
  mounted:function() {
    tenderId = this.$route.params.id;
    this.getClassifydetail();
    this.getPageInvest();
  },
  methods: {
    getClassifydetail() {
      var detail = this;
      this.$api.get(
        "/web-api/tender/getTender",
        {"tenderId":tenderId},
        function(res) {
          detail.tenderName=res.data.tenderName;
          detail.baseRate=res.data.baseRate;
          detail.ratePlus=res.data.ratePlus;
          detail.debitTerm=res.data.debitTerm;
          detail.baseMoney=res.data.baseMoney;
          detail.repayDate=res.data.repayDate;
          detail.amount=res.data.amount;
          detail.moneyEnoughTime=res.data.moneyEnoughTime;
          detail.realColMoney=res.data.realColMoney;
          detail.loanFinishTime=res.data.loanFinishTime;
          detail.sumInterest=res.data.sumInterest;
        }
      );
    },
    getPageInvest:function() {
      var that = this;
      this.$api.get(
        "/web-api/tender/getPageInvest?tenderId=" + tenderId + "",
        {"tenderId":tenderId},
        function(res) {
          that.data = res.data;
          that.dataList = res.data.dataList;
          that.pagecount = res.data.pageCount;
        }
      );
    },
    postpageIndex:function(index) {
      var inpagenum = index;
      this.$api.post(
        "/web-api/tender/getPageInvest",
        {'tenderId':tenderId,'pageIndex':pageIndex},
       function(res) {
          this.data = res.data;
          this.dataList = res.data.dataList;
        }
      );
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
@import "../assets/css/projectAudit_detail.scss";
</style>
