import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/page/Login'
import Result from '@/page/Result'
import Home from '@/components/Home'
import projectClassify from '@/components/projectClassify'
import projectRaise from '@/components/projectRaise'
import projectRepayment from '@/components/projectRepayment'
import projectAudit from '@/components/projectAudit'
import accountCenter from '@/components/accountCenter'
import toLogin from '@/components/toLogin'
import resetPassword from '@/components/resetPassword'
import projectClassify_detail from '@/components/projectClassify_detail'
import projectRaise_detail from '@/components/projectRaise_detail'
import projectRepayment_detail from '@/components/projectRepayment_detail'
import projectAudit_detail from '@/components/projectAudit_detail'
import accountOverview from '@/components/accountOverview'
import bankCard from '@/components/bankCard'
import capitalDetails from '@/components/capitalDetails'
import rechargeRecord from '@/components/rechargeRecord'
import presentRecord from '@/components/presentRecord'
import presentPage from '@/components/presentPage'
import inchargePage from '@/components/inchargePage'
import Content from '@/page/Content'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      children:[ 
        {
          path: '/',
          name: 'toLogin',
          component: toLogin
        },
        {
          path: 'resetPassword',
          name: 'resetPassword',
          component: resetPassword
        }
    ]
    },
    {
      path: '/Content',
      name: 'Content',
      component: Content,
      children:[ 
          {
            path: '/',
            name: 'Home',
            component: Home
          },
          {
            path: 'projectClassify',
            name: 'projectClassify',
            component: projectClassify
          },
          {
            path: 'projectRaise',
            name: 'projectRaise',
            component: projectRaise
          },
          {
            path: 'projectRepayment',
            name: 'projectRepayment',
            component: projectRepayment
          },
          {
            path: 'projectAudit',
            name: 'projectAudit',
            component: projectAudit
          },
          {
            path: 'projectClassify_detail/:id',
            name: 'projectClassify_detail',
            component: projectClassify_detail
          },
          {
            path: 'projectRaise_detail/:id',
            name: 'projectRaise_detail',
            component: projectRaise_detail
          },
          {
            path: 'projectRepayment_detail/:id',
            name: 'projectRepayment_detail',
            component: projectRepayment_detail
          },
          {
            path: 'projectAudit_detail/:id',
            name: 'projectAudit_detail',
            component: projectAudit_detail
          },
          {
            path: 'accountCenter',
            name: 'accountCenter',
            component: accountCenter,
            children:[
              {
                path: 'accountOverview',
                name: 'accountOverview',
                component: accountOverview
              },
              {
                path: 'capitalDetails',
                name: 'capitalDetails',
                component: capitalDetails
              },
              {
                path: 'bankCard',
                name: 'bankCard',
                component: bankCard
              },
              {
                path: 'rechargeRecord',
                name: 'rechargeRecord',
                component: rechargeRecord
              },
              {
                path: 'presentRecord',
                name: 'presentRecord',
                component: presentRecord
              },
              {
                path: 'presentPage',
                name: 'presentPage',
                component: presentPage
              },
              {
                path: 'inchargePage',
                name: 'inchargePage',
                component: inchargePage
              }              
            ]
          }
      ]
    },
    {
      path: '/Result',
      name: 'Result',
      component: Result,
    }
  ]
})

