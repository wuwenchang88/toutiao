<template>
  <van-cell class="article-item">
    <div slot="title" class="title">{{ obj.title }}</div>
    <div slot="label">
        <div  v-if="obj.cover.type===3" class="cover-img">
             <van-image
                v-for="(item,index) in obj.cover.images" :key="index"
                slot="default"
                fit="cover"
                :src="item"
                />
        </div>
        <div class="item-span">
      <span>{{ obj.aut_name }}</span>
      <span>{{ obj.comm_count }}评论</span>
      <span>{{ obj.pubdate |relativeTime }}</span>
      </div>
    </div>
    <van-image
    v-if="obj.cover.type===1"
        slot="default"
      
        fit="cover"
        :src="obj.cover.images[0]"
        />
  </van-cell>
</template>

<script>
export default {
  props: {
    obj: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="less" scoped>
.article-item{
  .van-cell__value{
    flex: unset;
    width:232px;
    height: 146px;
    margin-left: 25px;
    .van-image{
        width:232px;
    height: 146px;
    }
}
.item-span span{
  margin-right: 20px;
    font-size: 22px;
    color: #b4b4b4;
}
.cover-img{
  display: flex;
  padding: 30px 0;

  .van-image{
    flex: 1;
    height: 146px;
    &:not(:last-child){
   margin-right:10px ;
    }
  }
}
}

</style>