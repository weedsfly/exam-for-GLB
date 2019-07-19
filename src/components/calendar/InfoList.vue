<template>
    <div class="infolist">
       <ul>
           <li v-for="(item, index) in dateList" :key="index">
               <h3>{{item.title}} <span class="time">{{item.time}}</span></h3>
               <p class="subtitle">{{item.subTitle}}</p>
               <p class="role" v-if="item.role === 1" :class="{blue: item.role === 1}">我的角色：经办人</p>
               <p class="role" v-if="item.role === 2" :class="{yellow: item.role === 2}">我的角色：交办人</p>
               <i class="icon-dot" @click="goDetail(item.id)"></i>
           </li>
       </ul>
    </div>
</template>

<script>
const dateList = [{
  id: '001',
  title: '227市场',
  subTitle: '定价依据和客户判定',
  role: 1,
  time: '16:24'
}, {
  id: '002',
  title: '新软件',
  subTitle: '成立体验小组，测试软件',
  role: 2,
  time: '13:34'
}, {
  id: '003',
  title: '2-3-6手提项目',
  subTitle: '236手提灭火器项目，10月需要提交给需求方',
  role: 2,
  time: '09:24'
}, {
  id: '004',
  title: '消防资格考试',
  subTitle: '考试纲要 考试时间 考试地点',
  role: 1,
  time: '昨天'
}, {
  id: '005',
  title: '总裁办招新',
  subTitle: '招新人',
  role: 1,
  time: '10-28'
}, {
  id: '001',
  title: '227市场',
  subTitle: '定价依据和客户判定',
  role: 1,
  time: '16:24'
}, {
  id: '002',
  title: '新软件',
  subTitle: '成立体验小组，测试软件',
  role: 2,
  time: '13:34'
}, {
  id: '003',
  title: '2-3-6手提项目',
  subTitle: '236手提灭火器项目，10月需要提交给需求方',
  role: 2,
  time: '09:24'
}, {
  id: '004',
  title: '消防资格考试',
  subTitle: '考试纲要 考试时间 考试地点',
  role: 1,
  time: '昨天'
}, {
  id: '005',
  title: '总裁办招新',
  subTitle: '招新人',
  role: 1,
  time: '10-28'
}]
export default {
  name: 'InfoList',
  data () {
    return {
      dateList
    }
  },
  methods: {
    goDetail (id) {
      console.log(id)
    }
  }
}
</script>

<style scoped>
.infolist {
    li {
      margin: 5px 10px;
      padding: 10px;
      border-bottom: 1px solid #eee;
      position: relative;
      h3 {
        font-size: 18px;
        color: #333;
        .time {
          float: right;
          font-size: 12px;
          color: #aaa;
        }
      }
      .subtitle {
        font-size: 12px;
        color: #aaa;
        padding-bottom: 2px;
      }
      .role {
        font-size: 12px;
        color: #aaa;
        &.blue {
          color: #3daad0;
        }
        &.yellow {
          color: #ffa831;
        }
      }
      .icon-dot {
        position: absolute;
        right: 10px;
        bottom: 6px;
        display: block;
        margin: 0 auto;
        width: 22px;
        height: 22px;
        background: url(../../assets/images/icon-dot.png);
        background-size: cover;
      }
    }
}
</style>
