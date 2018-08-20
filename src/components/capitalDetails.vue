<template>
<div id="capitalDetails">
  <div class="box">
      <h3>账户明细</h3>
			<ul class="table-title">
				<li v-for="(tab, index) in tabs" v-bind:class='{ "on-choose": tab.select }'>
					<a href="#" class="tab-link" @click="tabsSwitch(index);changeType(index);postpageIndex(0)" v-bind:class="{active:tab.isActive}">{{tab.name}}</a>
				</li>
			</ul>
 
			<div class="cards">
				<div class="tab-card">
          <div class="cell title">
            <span>序号</span>
            <span>金融（元）</span>
            <span>状态</span>
            <span>投资时间</span>
          </div>
          <ul>
            <li v-for="(item,index) in dataList">
              <span>{{index+1+((data.pageIndex-1)*10)}}</span>
              <span v-if="item.balanceType==1">+{{ item.amount}}</span>
              <span v-else>-{{ item.amount}}</span>
              <span>{{ item.balanceContent}}</span>
              <span>{{ item.tradeTime | formatDate}}</span>
            </li>
          </ul>
        </div>
			</div>
      <el-pagination background layout="prev, pager, next" :page-count="pagecount" :pager-count="11" @current-change="postpageIndex" @prev-click="postpageIndex" @next-click="postpageIndex"> </el-pagination>
		</div>
</div>
</template>

<script>
import { formatDate } from "../assets/js/date.js";
var currentpageIndex;
export default {
  name: "capitalDetails",
  data:function(){
    return{
      tabs: [
              {
                name: "全部",
                isActive: true,
                select: true
              },
              {
                name: "提现",
                isActive: false,
                select: false
              }, 
              {
                name: "充值",
                isActive: false,
                select: false
              }, 
              {
                name: "还款",
                isActive: false,
                select: false
              },
              {
                name: "入账",
                isActive: false,
                select: false
              }
              ],
      active: false,
      data: [],
      dataList: [],
      pagecount:0,
      type:0
    }
  },
  mounted:function() {
    this.postpageIndex(1);
  },
  methods: {
  tabsSwitch: function(tabIndex) {
    for(var i = 0; i < 5; i++) {
      this._data.tabs[i].isActive = false;
      this._data.tabs[i].select = false;
    }
    this._data.tabs[tabIndex].isActive = true;
    this._data.tabs[tabIndex].select = true;

  },
  // getPageInvest() {
  //     var that=this;
  //     this.$api.get("/web-api/subject/getPageInvest", null, res => {
  //         that.data=res.data;
  //         that.dataList = res.data.dataList;
  //         that.pagecount=res.data.pageCount;
  //     });
  //   },
     postpageIndex:function(index) {
      var inpagenum =index;
      var that=this;
      this.$api.post(
        "/web-api/account/getPageAccountLog",
        {"pageIndex":inpagenum,"type":this.type},
        function(res) {
          this.data = res.data;
          this.dataList = res.data.dataList;
          that.pagecount=res.data.pageCount;
        }
      );
    },
    changeType:function(t){

      this.type = t;
    }
},
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    }
  }
}
</script>
<style lang="scss" scoped>
h3{
    font-weight: normal;
    font-size: 24px;
    color: #2e2e2e;
    line-height: 30px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ededed;
    margin-bottom: 52px;
}
.table-title{
  width: 100%;
  border-bottom: 1px dashed #e7e7e7;
  li{
    width: 82px;
    height: 56px;
    line-height: 56px;
    text-align: center;
    display: inline-block;
    a{
      text-decoration: none;
      color: #333333;
      font-size: 16px;
    }
  }
  .on-choose{
    border-bottom:2px solid #fd4e52;
    a{
    color: #fd4e52;
    }
  }
}
.cards{
  .tab-card{
    .title{
      width: 100%;
      height: 40px;
      line-height: 40px;
      margin-top: 21px;
      background-color: rgba(252,236,240,0.3);
      span{
        display: inline-block;
        width: 180px;
        text-align: left;
        padding-left: 20px;
      }
    }
    ul{
      min-height: 380px;
      margin-bottom: 76px;
      li{
        width: 100%;
        height: 38px;
        line-height: 38px;
        span{
          display: inline-block;
          width: 180px;
          padding-left: 20px;
          font-size: 13px;
          color: #333333;
        }
      }
    }
  }
}

.pagelist {
  button:active {
    background-color: #ff777a;
    border-radius: 2px;
    border: solid 1px #cccccc;
    a {
      display: block;
      font-size: 14px;
      text-decoration: none;
      color: #ffffff;
    }
  }
  .pagein:active {
    background-color: #ff777a;
    border-radius: 2px;
    border: solid 1px #cccccc;
    a {
      display: block;
      font-size: 14px;
      text-decoration: none;
      color: #ffffff;
    }
  }
}
</style>