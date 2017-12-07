import Vue from 'vue'
import Router from 'vue-router'
import Promise from 'promise-polyfill'
import Table from '@/components/table'

if(!window.Promise){
	window.Promise = Promise;
}

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Table',
      component: Table
    }
  ]
})
