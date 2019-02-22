<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <!-- or name="fade" -->
      <!-- <router-view :key="key"></router-view> -->
      <router-view v-if="isRouterAlive"/>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  data(){
    return{
      isRouterAlive:true
    }
  },
  provide(){
    return {
      reload:this.reload
    }
  },
  computed: {
    // key() {
    //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    // }
  },
  methods:{
    reload(){
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      })
    }
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  position: relative;
  overflow: hidden;
  padding: 20px 30px 10px;
  background-color: #fff;
}
</style>
