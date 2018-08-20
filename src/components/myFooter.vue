<template>
<div id="Footer" class="footer">
<div style="width:1200px;margin:auto;background:#fff;height:100%;padding-top: 55px;">
<P class="company flex">2017-2018 杭州兵海投资管理有限公司所有 浙ICP备17043516号</P>
<p>市场有风险 投资需谨慎</p >
<!-- <script src="https://kxlogo.knet.cn/seallogo.dll?sn=e18053033010074110ep22000000&amp;size=0"></script> -->
<span style="display:inline-block;position: absolute;bottom:30px;width:auto;left: 50%;transform: translateX(-50%);">
<a href="https://ss.knet.cn/verifyseal.dll?sn=e18053033010074110ep22000000&amp;ct=df&amp;a=1&amp;pa=0.7966632853637985" id="kx_verify" tabindex="-1" target="_blank" kx_type="图标式" style="display:inline-block;">
<img src="https://ss.knet.cn/static/images/logo/credit.png" style="border:none;" oncontextmenu="return false;" alt="可信网站">
</a>
</span>
</div>
</div>
</template>

<script>
export default {
name: 'Footer',
data:function () {
return {
}
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.footer{
position: relative;
width: 100%;
height: 216px;
background-color: #fff;
.company{
justify-content: center;
}
p{
width: 100%;
color: #666666;
font-size: 16px;
line-height: 30px;
text-align: center;
}
}
</style>