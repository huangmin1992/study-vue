<template>
  <div class="elem-container">
    <div class="elem-scroll">
        <header-item :headerArr.sync="headerArr" v-if='flag'></header-item>
        <div class="elem-content">
            <nav-item></nav-item>
            <router-view :seller='headerArr' v-if='flag'></router-view>
        </div>
      </div>
  </div>
</template>

<script>
require("es6-promise").polyfill();
require('isomorphic-fetch');

import Header from './header/header';
import NavTab from './nav/nav-tab';


export default {
  name: 'elemContent',
  components:{
    'header-item':Header,
    'nav-item':NavTab,

  },
  data () {
    return {
      headerArr:{},
      flag:false
    }
  },
  mounted(){
    this.$nextTick(()=>{
      this.getSeller()
    })
  },
  methods:{
    getSeller(){
      fetch('./api/seller').then((res)=>{
        return res.json()
      }).then((stroies)=>{
        this.flag = true;
        this.headerArr = stroies.data
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
</style>
