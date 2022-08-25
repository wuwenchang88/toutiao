<template>
  <div class="layout-container">
    <router-view></router-view>
    <van-tabbar v-model="active" class="layout-tabbar" route>
      <van-tabbar-item  to="/layout/home">
        <i slot="icon" class="iconfont icon-shouye"></i>
        <p>首页</p>
      </van-tabbar-item>
       <van-tabbar-item  to="/layout/qa">
        <i slot="icon" class="iconfont icon-wenda"></i>
        <p>问答</p>
      </van-tabbar-item>
       <van-tabbar-item  to="/layout/video">
        <i slot="icon" class="iconfont icon-shipin"></i>
        <p>视频</p>
      </van-tabbar-item>
       <van-tabbar-item  to="/layout/my">
        <i slot="icon" class="iconfont icon-wode"></i>
        <p>我的</p>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "layout",
  data() {
    return {
      active: 0,
    };
  },
};
</script>

<style lang='less' scoped>
.layout-container {
  background: #f5f7f9;
  .layout-tabbar {
    .iconfont {
      font-size: 40px;
    }
    p{
        font-size: 20px;
    }
  }
}
</style>