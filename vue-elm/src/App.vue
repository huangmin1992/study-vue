<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
require('../static/fontSize.js')
export default {
  name: 'app'
}
</script>

<style scope lang='less'>
  @import url('./commen/less/icons.less');
  @import url('./commen/less/style.less');
</style>
