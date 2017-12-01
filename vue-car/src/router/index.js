import Vue from 'vue'
import Router from 'vue-router'
import Promise from "promise-polyfill";
import carIndex from '@/components/carIndex'
import Address from '@/components/address'


if(!window.Promise){
	window.Promise = Promise;
}

Vue.use(Router)

export default new Router({
	mode:'history',
  	routes: [
	    {
	      path: '/',
	      name: 'carIndex',
	      component: carIndex,
	    },
	    {
	    	path:'/address',
	    	name:'address',
	    	component:Address
	    }
  	]
})
