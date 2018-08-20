<template>
<div id="rechargeRecord">
<div class="RRhead">
    <p>充值记录</p>
</div>
<div class=tablebox>
 <table class="tzjltable" id="table">
               <thead>
                   <tr>
                       <td>
                           序号
                       </td>
                        <td>
                          金融（元）
                       </td>
                       <td>
                          状态
                       </td>
                       <td>
                           时间
                       </td>
                   </tr>
               </thead>
               <tbody>
                   <tr v-for="(item,index) in dataList">
                       <td>
                          <span>{{index+1+((data.pageIndex-1)*10)}}</span>
                       </td>
                       <td>
                         {{item.amount}}
                       </td>
                       <td>
                           <span v-if="item.status==5">充值成功</span>
                           <span v-else-if="item.status==1">待处理</span>
                            <span v-else-if="item.status==2">处理中</span>
                             <span v-else-if="item.status==3">待入账</span>
                              <span v-else-if="item.status==4">充值失败</span>
                       </td>
                       <td>
                          {{item.gmtCreate | formatDate}}
                       </td>
                   </tr>                
               </tbody>
           </table>
</div>
     <el-pagination background layout="prev, pager, next" :page-count="pagecount" :pager-count="11" @current-change="postpageIndex" @prev-click="postpageIndex" @next-click="postpageIndex"> </el-pagination>
</div>
</template>

<script>
import { formatDate } from "../assets/js/date.js";
export default {
  name: "rechargeRecord",
  data:function() {
    return {
      data: [],
      dataList: [],
      pagecount:0,
    };
  },
  mounted:function() {
    this.getRechargelist();
  },
  methods: {
    getRechargelist: function() {
       var that = this;
      this.$api.get("/web-api/account/getPageChargeRecord", null, function(res){
        that.data = res.data;
        that.dataList = res.data.dataList;
        that.pagecount=res.data.pageCount;
      });
    },
    postpageIndex: function(index) {
      var that = this;
      var inpagenum =index;
      this.$api.post(
        "/web-api/account/getPageChargeRecord",
        {pageIndex:inpagenum},
        function(res) {
          that.data = res.data;
          that.dataList = res.data.dataList;
        }
      );
    },
  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    }
  }
};
</script>
<style lang="scss" scoped>
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

.tablebox{
  height: 551px;
}
.tzjltable {
  width: 830px;
  margin: 40px auto 78px auto;
  border-collapse: collapse;
  thead {
    background-color: rgba(252, 236, 240, 0.3);
    tr {
      text-align: center;
      td {
        padding: 10px 0;
        font-size: 16px;
      }
    }
  }
  tbody {
    tr {
      text-align: center;
      td {
        padding: 10px 0;
        color: #333333;
        font-size: 14px;
        span{
          font-size: 14px;
        }
      }
    }
  }
}

</style>

