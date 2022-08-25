import dayjs  from "dayjs";
import Vue from "vue";
import 'dayjs/locale/zh-cn' // ES 2015 

dayjs.locale('zh-cn') // 全局使用
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

Vue.filter('relativeTime',val=>{
    return dayjs().to(dayjs(val))
})
