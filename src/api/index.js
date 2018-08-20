import { Message } from 'element-ui';
import router from '@/router'

// 配置API接口地址
var root = '/api-loaner'
// 引用axios
var axios = require('axios')
axios.defaults.withCredentials=true;
//axios.headers={'Access-Control-Allow-Origin':root};

//axios.baseURL=root;
// 自定义判断元素类型JS

/*
  接口处理函数
  这个函数每个项目都是不一样的，我现在调整的是适用于
  https://cnodejs.org/api/v1 的接口，如果是其他接口
  需要根据接口的参数进行调整。参考说明文档地址：
  https://cnodejs.org/topic/5378720ed6e2d16149fa16bd
  主要是，不同的接口的成功标识和失败提示是不一致的。
  另外，不同的项目的处理方法也是不一致的，这里出错就是简单的alert
*/

function apiAxios (method, url, params, success, failure) {
  console.log(root+url);
  

  function getCookie(sName)//获取cookie里面的token
  {
  var aCookie = document.cookie.split("; ");
  for (var i=0; i < aCookie.length; i++)
  {
  var aCrumb = aCookie[i].split("=");
  if (sName == aCrumb[0])
  return unescape(aCrumb[1]);
  }
  return null;
  }
  

  //http request 拦截器
axios.interceptors.request.use(
  function(config) {
    const token = getCookie('web-token');
    config.data = JSON.stringify(config.data);
    config.headers = {
      'Content-Type':'application/x-www-form-urlencoded'
    }
    // if(token){
    //   config.params = {'token':token}
    // }
    return config;
  },
  function(error) {
    return Promise.reject(err);
  }
);


//http response 拦截器
axios.interceptors.response.use(
  function(response) {

    if(response.data.code =="10001"){
      router.push({
        path:"/",
        query:{redirect:router.currentRoute.fullPath}//从哪个页面跳转
      })
      // window.location.hash = '/'
    }
    return response;
  },
  function(error) {
    return Promise.reject(error)
  }
)

  axios({
    method: method,
    url: url,
    data: method === 'POST' || method === 'PUT' ? params : params,
    params: method === 'GET' || method === 'DELETE' ? params : params,
    baseURL: root,
    withCredentials: true,
    headers: {'Access-Control-Allow-Credentials':'true','Access-Control-Allow-Origin':"*"}
  })
  .then(function (res) {
    if (res.status==200) {
      if (success) {
        success(res.data);
      }
    } else {
      if (failure) {
        failure(res.data)
      } else {
        Message(JSON.stringify(res.data.message))
      }
    }
  })
  .catch(function (err) {
    let res = err.response
    if (err) {
      Message('api error, HTTP CODE: ' + res.status)
    }
  })
}

// 返回在vue模板中的调用接口
export default {
  get: function (url, params, success, failure) {
    return apiAxios('GET', url, params, success, failure)
  },
  post: function (url, params, success, failure) {
    return apiAxios('POST', url, params, success, failure)
  },
  put: function (url, params, success, failure) {
    return apiAxios('PUT', url, params, success, failure)
  },
  delete: function (url, params, success, failure) {
    return apiAxios('DELETE', url, params, success, failure)
  }
}