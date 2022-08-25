<template>
  <div class="login-container">
    <van-nav-bar class="login-title" :title="$route.meta.title" />
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field
        v-model="user.mobile"
        name="mobile"
        type="number"
        placeholder="请输入手机号"
        :rules="userFormRules.mobile"
      >
        <i slot="left-icon" class="iconfont icon-shouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        type="number"
        name="code"
        placeholder="请输入验证码"
        class="input-code"
        :rules="userFormRules.code"
      >
        <i slot="left-icon" class="iconfont icon-yanzhengma"></i>
       
        <template #button>
             <van-count-down :time="time" format="ss s" v-if="iscount" @finish="iscount=false"/>
          <van-button v-else native-type="button" size="small" class="login-code-btn" type="primary"
          @click="onSendCode"
            >获取验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button class="login-btn" block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import {userLogin,sendCode} from '@/api/user.js'

export default {
  data() {
    return {
        user:{
            mobile:'',
            code:''
        },
        time:5*1000,
        iscount:false,
        userFormRules:{
            mobile:[
                { required: true, message: '请输入手机号' },
                { pattern :/^1[3|5|7|8]\d{9}$/,message:'请输入正确的手机号'}

            ],
            code:[
                 { required: true, message: '请输入验证码' },
                   { pattern :/^\d{6}$/,message:'请输入6位验证码'}
            ]
        }
    };
  },
  methods: {
    async onSubmit() {
        this.$toast.loading({
            message: '加载中...',
            forbidClick: true,
            duration: 0,
            });
        try{
            const {data:{data}} = await userLogin(this.user)
            console.log(data);
            this.$store.commit('updateUser',data)
            this.$router.back()
            this.$toast.success('登录成功')
         
        }catch(err){
          console.log(err);
            if(err.response.status===400){
                   this.$toast.fail('手机或者验证码错误')
                  console.log('手机或者验证码错误',err);
            }else{
                 this.$toast.fail('登录失败')
                 console.log('登录失败',err);
            }
          
        }
        //  try {
        //         const res = await userLogin(this.user)
        //         console.log('登录成功', res)
        //     } catch (err) {
        //         if (err.response.status === 400) {
        //             console.log('登录失败', err)
        //         }
        //     }
    },
    async onSendCode(){
        try {
          /* 
          重置表单验证
          */
            this.$refs.loginForm.resetValidation()
          //执行mobile表单验证
             await this.$refs.loginForm.validate('mobile')
        } catch (err) {
            console.log(err);
            return
        }
        this.iscount=true

        try {
            await sendCode(this.user.mobile)
              this.$toast.success('发送成功')
        } catch (err) {
           this.iscount=false
           if(err.response.status===429){
                 this.$toast.fail('发送太频繁了，请稍后重试')
           }else{
                 this.$toast.fail('发送失败')
           }
            console.log('登录失败',err);
        }
    }
  },
};
</script>

<style scoped lang="less" >
.login-container {
  .van-form {
    :deep(.van-field__left-icon) {
      margin-right: 0.3rem;
    }
    .iconfont {
      font-size: 37px;
    }
    .login-btn {
      border-radius: 10px;
      width: 694px;
      height: 88px;
      background: #6db4fb;
      font-size: 30px;
    }
    .login-code-btn {
      background: #ededed;
      width: 160px;
      height: 46px;
      border: 1px solid #ededed;
      color: #666666;
      font-size: 22px;
      border-radius: 23px;
      vertical-align: middle;
    }
    .input-code {
      :deep(.van-field__control) {
        border-right: 1px solid #eee;
      }
    }
  }
}
</style>