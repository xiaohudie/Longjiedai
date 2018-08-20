
<template>
  <div id="projectRepayment" @click="hidePanel">
    <div class="innerarea3">
      <div class="dairecharge">
      <div class="huan">还</div>
        <span class="biao" id="test" v-on:click="toggle()">已还款标的<img v-bind:src="src" class="jiantou" /></span>
          <span class="time">选择还款时间</span>
                <el-date-picker v-model="value1" type="datetime" placeholder="开始日期" value-format="yyyy-MM-dd"  @change="changetime"></el-date-picker>
    <el-date-picker v-model="value2" type="datetime" placeholder="结束日期" value-format="yyyy-MM-dd" @change="changetime"> </el-date-picker>
      </div>
      <div id="tcin" v-show="isShow">
         <ul>
           <li>
              <router-link :to="'/content/projectClassify'">
             <div class="dai">待</div>
             <span>待还款标的</span>
              </router-link>
           </li>
           <li>
              <router-link :to="'/content/projectRaise'">
            <div class="mu">募</div>
             <span>募集中标的</span>
                </router-link>
           </li>
         </ul>
      </div>
    </div>
    <div class="biaocboxRepay">
      <div class="biaoin" v-for="(item,index) in dataList">
          <p class="xsb">{{item.tenderName}}</p>
          <p class="sy">预期年化收益</p>
          <p class="percent">{{item.baseRate}}<span style="font-size:20px;">%</span>+{{item.ratePlus}}<span style="font-size:20px;">%</span></p>
          <p class="sjje">投资进度：{{item.realColMoney/item.amount*100}}%</p>
          <div class="percenttiao">
               <div class="inpercenttiao" :style='"width:"+item.realColMoney/item.amount*100+"%"'></div>
          </div>
          <div class="termbox">
            <div class="term">
              <span class="days">{{item.debitTerm}}</span><span class="day">天</span>
              <p class="tzqx">投资期限</p>
            </div>
            <div class="mjwc">
              已还款
            </div>
          </div>
          <div class="viewmore">
           <router-link target="_blank" :to="'/content/projectRepayment_detail/'+item.tenderId">
           查看详情
           </router-link>
          </div>
          <p class="hksj">还款时间：{{item.repayDate | formatDate}}</p>
            <img src="../assets/images/huanbg.png" class="bgimg2" />
      </div>               
      <div class="clearfix"></div>
      <el-pagination background layout="prev, pager, next" :page-count="pagecount" :pager-count="11" @current-change="postpageIndex" @prev-click="postpageIndex" @next-click="postpageIndex"> </el-pagination>
    </div>
  </div>
</template>
<script>
import { formatDate } from "../assets/js/date.js";
export default {
  name: "projectRepayment",
   data:function() {
    return {
      value1: "",
      value2: "",
      isShow: false,
      data: [],
      dataList: [],
      pagecount: 0,
      src: "/static/greendown.png"
    };
  },
  mounted:function() {
    this.getServerDate();
    this.getRepayment();
  },
  methods: {
    toggle: function() {
      this.isShow = !this.isShow;
      if (this.isShow == true) {
        this.src = "/static/greenup.png";
      } else if (this.isShow == false) {
        this.src = "/static/greendown.png";
      }
    },
    getRepayment: function() {
      var that = this;
      this.$api.post(
        "/web-api/tender/showList",
        {"type":"3","start":this.value1},
        function(res) {
          that.data = res.data;
          that.dataList = res.data.dataList;
          that.pagecount = res.data.pageCount;
        }
      );
    },
    postpageIndex: function(index) {
      var inpagenum = index;
      this.$api.post(
        "/web-api/tender/showList",
        {"type":"3","pageIndex":inpagenum},
         function(res) {
          this.data = res.data;
          this.dataList = res.data.dataList;
        }
      );
    },
    getServerDate: function() {
      var myDate = new Date();
      var a = myDate.toLocaleDateString();
      var b = a.replace("/", "-");
      var currentTime = b.replace("/", "-");
      this.value1 = currentTime;
    },
    changetime: function() {
      var inthat = this;
      this.$api.get("/web-api/tender/showList",
        {"type":"3","start":this.value1,"end":this.value2},
       function(res) { 
          inthat.data = res.data;
          inthat.dataList = res.data.dataList;
          inthat.pagecount = res.data.pageCount;
        }
      );
    },
    hidePanel: function(event) {
      var test = document.getElementById("test");
        if (!test.contains(event.target)) {
          if (this.isShow == true) {
            this.isShow = false;
            this.src = "/static/greendown.png";
          } else if (this.isShow == false) {
            this.src = "/static/greendown.png";
          }
        }
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
@import "../assets/css/projectRepayment.scss";
</style>


