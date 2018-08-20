<template>
  <div id="Account">
<div class="Accountleft">
<div class="userbox">
	<img src="../assets/images/head.png" class="left userhead" />
	<p class="left useraccount">{{ mobile }}</p>
	<img src="../assets/images/fenge.png" class="left fenge" />
	<p class="right checkout">
    <router-link :to="path">
     <span @click="exit()" class="exit">退出</span>
    </router-link>
  </p>
</div>
<ul class="statebox">
 <li>
	 <img src="../assets/images/openedicon.png" />
	 <p>已开户</p>
 </li>
 <li>
	  <img src="../assets/images/OnCardicon.png" />
	 <p>已绑卡</p>
 </li>
 <li>
	 <img src="../assets/images/Auditinicon.png" />
	 <p>已授权审核</p>
 </li>
 <li>
	 <img src="../assets/images/Onrepaymenticon.png" />
	 <p>已授权还款</p>
 </li>
</ul>
<div class="btnbox">
<div class="RechargeBTn" @click="changeStatus(0)" v-bind:class='{ "currentSelect": curSelects[0].curSelect }'>
	<router-link :to="'/content/accountCenter/inchargePage'">
                 充值
  </router-link>
</div>
<div class="PutforwardBTn" @click="changeStatus(1)" v-bind:class='{ "currentSelect": curSelects[1].curSelect }'>
	<router-link :to="'/content/accountCenter/presentPage'">
                 提现
  </router-link>
</div>
</div>
<ul class="accountnav">
<li v-for="(tab, index) in tabs" v-bind:class='{ "on-choose": tab.select }' @click="tabsSwitch(index)">
<div>
	<router-link :to="tab.link">
      <img v-bind:src="tab.select ? tab.srcCur : tab.src" />{{ tab.name }}
  </router-link>
</div>
</li>
	</ul>
</div>
<div class="Accountright">
 <router-view/>
</div>
<div class="clearfix"></div>
	</div>
</template>

<script>
export default {
  name: "Account",
  data:function() {
    return {
      tabs: [
        {
          name: "账户总览",
          select: true,
          src: "/static/accounticon.png",
          srcCur: "/static/accountredicon.png",
          link: "/content/accountCenter/accountOverview"
        },
        {
          name: "资金明细",
          select: false,
          src: "/static/resticon.png",
          srcCur: "/static/restredicon.png",
          link: "/content/accountCenter/capitalDetails"
        },
        {
          name: "银行卡",
          select: false,
          src: "/static/cardicon.png",
          srcCur: "/static/cardredicon.png",
          link: "/content/accountCenter/bankCard"
        }
      ],
      curSelects: [
        {
          curSelect: false
        },
        {
          curSelect: false
        }
      ],
      incharge: "充值",
      putForward: "提现",
      mobile:'',
      path:''
    };
  },
    mounted:function() {
    this.getMobile();
  },
  methods: {
    getMobile: function() {
      var that = this;
      this.$api.get("/web-api/account/getLoanerInfo", null, function(res) {
        that.mobile = res.data.mobile;
      });
    },
    tabsSwitch: function(tabIndex) {
      let len = 3;

      for (var i = 0; i < len; i++) {
        this._data.tabs[i].select = false;
      }
      this._data.tabs[tabIndex].select = true;
    },
    changeStatus: function(n) {
      for (var i = 0; i < 2; i++) {
        this.curSelects[i].curSelect = false;
      }
      this.curSelects[n].curSelect = true;
    },
    exit: function() {
      let that = this;
      this.$api.get("/web-api/logout", null, function(res)  {
        this.$router.push("/");
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.cleardix {
  clear: both;
}
#Account {
  width: 1200px;
  margin: 30px auto 100px auto;
  height: 798px;
}
.left {
  float: left;
}
.right {
  float: right;
}
.Accountleft {
  float: left;
  width: 280px;
  height: 798px;
  background-color: #ffffff;
  .userbox {
    width: 252px;
    height: 70px;
    margin: 46px auto 0 auto;
    .userhead {
      width: 70px;
      height: 70px;
      border-radius: 70px;
    }
    .useraccount {
      font-size: 18px;
      color: #929292;
      line-height: 75px;
      margin-left: 5px;
    }
    .fenge {
      margin-top: 26px;
    }
    .checkout {
      font-size: 18px;
      color: #2e2e2e;
      margin-top: 25px;
      a {
        font-size: 18px;
        color: #2e2e2e;
      }
    }
  }
  .statebox {
    width: 240px;
    height: 70px;
    margin: 20px auto;
    li {
      float: left;
      text-align: center;
      width: 60px;
      padding: 0 7px;
      p {
        font-size: 14px;
        color: #333;
      }
    }
  }
  .btnbox {
    width: 240px;
    height: 46px;
    margin: 38px auto;
    .RechargeBTn {
      width: 108px;
      height: 46px;
      background-color: #fff;
      border-radius: 8px;
      border: 1px solid #fc4147;
      margin-right: 18px;
      float: left;
      text-align: center;
      line-height: 46px;
      a {
        display: block;
        width: 100%;
        height: 46px;
        line-height: 44px;
        color: #fc4147;
        font-size: 21px;
        text-decoration: none;
      }
    }
    .RechargeBTn.currentSelect {
      background-color: #fc4147;
      color: #fff;
      a {
        color: #fff;
      }
    }
    .PutforwardBTn.currentSelect {
      background-color: #5fb9ff;
      color: #fff;
      a {
        color: #fff;
      }
    }
    .PutforwardBTn {
      width: 108px;
      height: 46px;
      border-radius: 8px;
      border: solid 1px #5fb9ff;
      background: #fff;
      text-align: center;
      line-height: 46px;
      float:right;
    }
    a {
      display: block;
      width: 100%;
      height: 46px;
      line-height: 44px;
      color: #5fb9ff;
      font-size: 21px;
      text-decoration: none;
    }
  }
  .accountnav {
    height: 180px;
    width: 280px;
    margin: 76px auto;
    .on-choose {
      background-color: #fef4f4;
      color: #fc4147;
      border-left: 4px solid #fc4147;
      a {
        color: #fc4147;
        img{
          margin-left: 81px;
        }
      }
    }
    li {
      height: 60px;
      line-height: 60px;
      position: relative;
      div {
        width: 200px;
        margin: auto;
        height: 100%;
        border-bottom: 1px solid #ededed;
        a {
          display: block;
          width: 100%;
          height: 100%;
          font-size: 16px;
          color: #212121;
          text-decoration: none;
          position: absolute;
          left: 0;
          img {
            margin-right: 15px;
            margin-left: 85px;
            position: relative;
            top: 4px;
          }
        }
      }
    }
  }
}
.Accountright {
  width: 900px;
  float: right;
  height: 800px;
  background-color: #ffffff;
  padding: 40px 30px;
}
</style>
