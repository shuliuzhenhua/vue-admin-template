<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { getVueRouter } from '@/api/router'
export default {
  name: 'App',
  mounted() {
    getVueRouter()
  }
}
</script>
