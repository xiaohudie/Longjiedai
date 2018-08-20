<template>
  <div id="projectAudit">
     <div class="innerarea">
      <div class="dairecharge">
  <span class="time">选择还款时间</span>
          <el-date-picker v-model="value1" type="datetime" placeholder="开始日期" value-format="yyyy-MM-dd"  @change="changetime"></el-date-picker>
    <el-date-picker v-model="value2" type="datetime" placeholder="结束日期" value-format="yyyy-MM-dd" @change="changetime"> </el-date-picker>
      </div>
    </div>
    <div class="biaocbox">
      <div class="biaoin"  v-for="(item,index) in dataList">
          <p class="xsb">{{item.tenderName}}</p>
          <p class="sy">预期年化收益</p>
         <p class="percent">{{item.baseRate}}<span style="font-size:20px;">%</span>+{{item.ratePlus}}<span style="font-size:20px;">%</span></p>
          <p class="sjje">募集金额：{{item.sumMoney}}元</p>
          <div class="percenttiao">
            <div class="inpercenttiao"></div>
          </div>
          <p style="color:#525252;text-align:left;margin-left: 28px;margin-top: 9px;font-size:8px;">进度：0%</p>
          <div class="termbox">
            <div class="term">
              <span class="days">{{item.debitTerm}}</span><span class="day">天</span>
              <p class="tzqx">投资期限</p>
            </div>
            <div class="mjwc">
              待确认
            </div>
          </div>
          <div class="viewmore">
           <router-link target="_blank" :to="'/content/projectAudit_detail/'+item.tenderId">
           确认审核
           </router-link>
          </div>
          <img src="../assets/images/xmshbg.png" class="bgimg3" />
      </div>
      <div class="clearfix"></div>
      <el-pagination background layout="prev, pager, next" :page-count="pagecount" :pager-count="11" @current-change="postpageIndex" @prev-click="postpageIndex" @next-click="postpageIndex"> </el-pagination>
    </div>
  </div>
</template>
<script>
import { formatDate } from "../assets/js/date.js";
export default {
  name: "projectAudit",
  data:function(){
    return {
      value1: "",
      value2: "",
      data: [],
      dataList: [],
      pagecount: 0,
      tenderId: 0
    };
  },
  mounted:function() {
    this.getAudit();
    this.getServerDate();
  },
  methods: {
    getAudit:function() {
      var that = this;
      this.$api.get("/web-api/tender/showList", {'type':'4','start':this.value1}, function(res){
        that.data = res.data;
        that.dataList = res.data.dataList;
        that.pagecount = res.data.pageCount;
      });
    },
    postpageIndex:function(index) {
      var inpagenum = index;
      this.$api.post(
        "/web-api/tender/showList",
        {'type':'4','start':this.value1,'pageIndex':inpagenum},
        function(res) {
          this.data = res.data;
          this.dataList = res.data.dataList;
        }
      );
    },
    getServerDate:function() {
     var myDate = new Date();
     var a=myDate.toLocaleDateString();
     var b=a.replace("/","-");
     var currentTime=b.replace("/","-");
     this.value1=currentTime;
    },
    changetime:function(){
      var inthat = this;
      this.$api.get("/web-api/tender/showList", {'type':'4','start':this.value1,'end':this.value2}, function(res) {
        inthat.data = res.data;
        inthat.dataList = res.data.dataList;
        inthat.pagecount = res.data.pageCount;
      });
    }
  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy年MM月dd日");
    }
  }
};
</script>
<style lang="scss">
@import "../assets/css/projectAudit.scss";
</style>
