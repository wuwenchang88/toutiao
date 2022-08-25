<template>
  <div class="my-container">
  
    <div v-if="user" class="header login-header">
      <div class="base-info">
        <div class="left">
          <van-image
            class="img"
            fit="cover"
            round
           :src="userInfo.photo"
          
          />
          <span class="name">{{userInfo.name}}</span>
        </div>
        <div class="right">
          <van-button type="default" class="btn" round size="small">编辑资料</van-button>
        </div>
      </div>
      <div class="user-status">
          <div class="li">
              <p>66</p>
              <span>头条</span>
          </div>
           <div class="li">
              <p>66</p>
              <span>关注</span>
          </div>
           <div class="li">
              <p>66</p>
              <span>粉丝</span>
          </div>
           <div class="li">
              <p>66</p>
              <span>获赞</span>
          </div>
      </div>
    </div>
      <div v-else  class="header not-login-header">
      <div class="not-login">
        <img src="~@/assets/mobile.png"   @click="$router.push('/login')" alt="" />
        <p>登录 / 注册</p>
      </div>
    </div>
     <!--  头部结束 -->
    <div class="info2">
        <van-grid clickable :column-num="2">
          <van-grid-item >
            <i slot="icon" class="iconfont icon-shoucang"></i>
            <span slot="text" class="text">收藏</span>
          </van-grid-item>
          <van-grid-item >
            <i slot="icon" class="iconfont icon-lishi"></i>
            <span slot="text" class="text">历史</span>
          </van-grid-item>
        </van-grid>
    </div>
  
      <van-cell title="消息通知" is-link />
   <van-cell title="小智同学" is-link />
   <van-cell v-if="user" @click="tuichu" title="退出登录" class="btn-tuichu" clickable/>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {userInfo} from '@/api/user.js'
export default {
  data () {
    return {
      userInfo:{}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    if(this.user){
      this.getinfo()
    }
  },
  methods: {
    tuichu(){
      this.$dialog.confirm({
      title: '退出提示',
      message: '是否确认退出？',
    })
      .then(() => {
        // on confirm
       this.$store.commit('updateUser',null)
      })
      .catch(() => {
        // on cancel
      
      });
    },
    async getinfo(){
      try {
         const res = await userInfo()
         this.userInfo = res.data.data
      } catch (err) {
        this.$toast('获取数据失败，请稍后重试')
      }
    
    }
  }
};
</script>

<style lang="less" scoped>
.my-container {
  .header {
    height: 366px;
    background: url("~@/assets/banner.png") no-repeat;
    background-size: cover;
  }

  .not-login-header {
    display: flex;
    justify-content: center;
    align-items: center;
    .not-login {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      img {
        width: 132px;
        height: 132px;
      }
      p {
        font-size: 28px;
        margin-top: 20px;
        color: #fff;
      }
    }
  }
  .login-header {
  
    padding: 80px 32px 0px;
    .base-info {
        display: flex;
      height: 150px;
      width:100%;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        align-items: center;

        .img {
          width: 132px;
          height: 132px;
          border: 3px solid #fff;
        }
        .name {
          font-size: 30px;
          color: #fff;
          margin-left: 22px;
        }
      }
      .right{
        display: flex;
        align-items: center;
        .btn{
          height: 33px;
          font-size: 20px;color: #666;
        }
        
      }
    }
    .user-status{
      display: flex;
      width:100%;
      height: 135px;
      justify-content:center;
      .li{
        flex: 1;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        p{
          color:#fff;
          font-size: 36px;
          margin:0
        }
        span{
           color:#fff;
          font-size: 23px;
        }
      }
    }
  }
  .info2{
    margin-bottom: 9px;
    .iconfont{
      font-size: 45px;
    }
    .icon-shoucang{
      color:#eb5253
    }
    .icon-lishi{
      color:#ff9d1d
    }
    .text{
      font-size: 28px;
      color:#333;
      margin-top:10px
    }
  }
  .btn-tuichu{
    text-align: center;
    color:#f00
  }
}
</style>