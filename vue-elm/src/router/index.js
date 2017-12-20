import Vue from 'vue'
import Router from 'vue-router'
import Promise from "promise-polyfill";

import ElemContent from '@/components/elem-content'
import Goods from '@/components/goods/goods'
import Ratings from '@/components/ratings/ratings'
import Seller from '@/components/sellers/seller'



if(!window.Promise){
    window.Promise = Promise;
}

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ElemContent',
      component: ElemContent,
      redirect:'/goods',
      children:[
        {
          path:'goods',
          name:'Goods',
          component:Goods
        },
        {
          path:'ratings',
          name:'Ratings',
          component:Ratings
        },
        {
          path:'seller',
          name:'Seller',
          component:Seller
        }
      ]
    }
  ]
})
