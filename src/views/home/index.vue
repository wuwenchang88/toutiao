<template>
  <div class="home-container">
    <van-nav-bar class="home-title" fixed>
      <van-button
        slot="title"
        round
        type="info"
        icon="search"
        class="search-btn"
        
      >
        搜索</van-button
      >
    </van-nav-bar>
    <van-tabs v-model="active" class="channel-tab" animated swipeable>
      <van-tab v-for="obj in channel" :key="obj.id" :title="obj.name"><ArticleList :channel="obj"></ArticleList></van-tab>

      <div slot="nav-right"  class="hamburger-btn">
         <i class="iconfont icon-gengduo"></i>
      </div>
    </van-tabs>
  </div>
</template>

<script>
import {userChannel} from '@/api/home.js'
import ArticleList from '@/components/article-list.vue'
export default {
   data() {
    return {
      active: 0,
      channel:[]
    };
  },
  components: {
    ArticleList
  },
  created () {
    this.getuserChannel()
  },
  methods: {
    async getuserChannel(){
      try {
         const res = await userChannel()
         this.channel =res.data.data.channels
      } catch (err) {
         this.$toast('获取用户频道失败')
      }
     
    }
  }
};
</script>

<style  scoped lang="less" >
.home-container {
  :deep(.van-nav-bar__title){
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    :deep(.van-icon-search) {
      color: #fff;
      font-size: 32px;
    }

  }
  :deep(.channel-tab){
   
    .van-tabs__wrap{
      height: 83px;
      border-bottom: 1px solid #edeff3;
      position: fixed;
      top:92px;
      left:0px;
      right:0px;
      z-index: 1;
      .van-tabs__nav--line{
        padding-bottom: 0;
        padding-right: 66px;
      }
        .van-tab {
          border-right: 1px solid #edeff3;
          width: 200px;
          font-size: 30px;
          color: #777777;
        }
        .van-tab--active{
          color:#333
        }
        .van-tabs__line{
          width: 31px;
          height: 6px;
          background: #3296fa;
          bottom: 8px;
        }
        .hamburger-btn{
          width: 66px;
          height: 82px;
          position: fixed;
          right:0;

           background-color: rgba(255, 255, 255, 0.902);
          display: flex;
          justify-content: center;
          align-items: center;
          &:before{
            content: '';
             position: absolute;
              left: 0;
              width: 1px;
              height: 58px;
              background-image: url(~@/assets/gradient-gray-line.png);
              background-size: contain;
          }
          .iconfont{
            font-size: 33px;
          }
        }
    }
  }
}
</style>