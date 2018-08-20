
<template>
  <div id="projectRaise" @click="hidePanel">
    <div class="innerarea2">
      <div class="dairecharge">
      <div class="mu">募</div>
        <span class="biao" id="test" v-on:click="toggle()">募集中标的<img v-bind:src="src" class="jiantou" /></span>
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
              <router-link :to="'/content/projectRepayment'">
            <div class="huan">还</div>
             <span>已还款标的</span>
                </router-link>
           </li>
         </ul>
      </div>
    </div>
    <div class="biaocboxRaise">
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
              募集中
            </div>
          </div>
          <div class="viewmore">
           <router-link target="_blank" :to="'/content/projectRaise_detail/'+item.tenderId">
           查看详情
           </router-link>
          </div>
          <!-- <p class="hksj">还款时间：{{item.repayDate | formatDate}}</p> -->
             <img src="../assets/images/mujibg.png" class="bgimg1" />
      </div>
      <div class="clearfix"></div>
      <el-pagination background layout="prev, pager, next" :page-count="pagecount" :pager-count="11" @current-change="postpageIndex" @prev-click="postpageIndex" @next-click="postpageIndex"> </el-pagination>
    </div>
  </div>
</template>
<script>
import { formatDate } from "../assets/js/date.js";
export default {
  name: "projectRaise",
  data:function() {
    return {
      isShow: false,
      data: [],
      dataList: [],
      pagecount: 0,
      src:'/static/yellowdown.png',
    };
  },
  mounted:function() {
    this.getRaise();
     
  },
  methods: {
    toggle: function() {
      this.isShow = !this.isShow;
        if(this.isShow==true){
        this.src="/static/yellowup.png";
      }
      else if(this.isShow==false){
       this.src="/static/yellowdown.png";
      }
    },
    getRaise:function() {
      var that = this;
      this.$api.get("/web-api/tender/showList", {"type":'2'}, function(res) {
        that.data = res.data;
        that.dataList = res.data.dataList;
        that.pagecount = res.data.pageCount;
      });
    },
    postpageIndex:function(index) {
      let that = this
      var inpagenum = index;
      this.$api.post(
        "/web-api/tender/showList",
        {"type":'2',"pageIndex":inpagenum},
        function(res) {
          that.data = res.data;
          that.dataList = res.data.dataList;
        }
      );
    },
    hidePanel: function(event) {
      var test = document.getElementById("test");
        if (!test.contains(event.target)) {
          if (this.isShow == true) {
            this.isShow = false;
            this.src = "/static/yellowdown.png";
          } else if (this.isShow == false) {
            this.src = "/static/yellowdown.png";
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
@import "../assets/css/projectRaise.scss";
</style>


