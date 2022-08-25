<template>
  <div class="article-list">
    <van-pull-refresh 
    v-model="isLoading"
     @refresh="onRefresh"
     :success-text='success_text'
     :success-duration='2000'
     >
    <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
      <ArticleItem v-for="(obj,index) in list" :key="index" :obj="obj" ></ArticleItem>
      
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import {getArticleList} from '@/api/home.js'
import ArticleItem from '@/components/article-item.vue'
export default {
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  components: {
    ArticleItem
  },
    data() {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp:null,
      error: false,
      isLoading: false,
      success_text:'刷新成功了噢'
    };
  },
  methods: {

   async onLoad(){
      try {
        const res = await getArticleList({
          channel_id:this.channel.id,
          timestamp:this.timestamp || Date.now()

        })
        // if(Math.random()>0.5){
        //     JSON.parse('asd')
        // }
    
          this.list.push(...res.data.data.results)
          this.loading = false;
      // 数据全部加载完成
        if(res.data.data.results.length){
          this.timestamp = res.data.data.pre_timestamp
        }else{
           this.finished = true;
        }
      } catch (err) {
        console.log(err);
          this.error =true
          this.loading = false;
      }
    },
    async onRefresh(){
        try {
            const res = await getArticleList({
              channel_id:this.channel.id,
              timestamp: Date.now()

            })
        
            this.list.unshift(...res.data.data.results)
            this.isLoading = false;
            this.success_text =`刷新成功了噢,一共更新了${res.data.data.results.length}条`
        } catch (err) {
          this.isLoading = false;
            this.success_text =`刷新失败，请稍后重试`
        }
     }
  },
}
</script>

<style lang='less' scoped>
.article-list{
  margin-top:174px;
  margin-bottom: 100px;
  height: 79vh;
  overflow-y: auto;
}
</style>