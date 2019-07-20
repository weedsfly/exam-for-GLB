<template>
    <div class="calendar-panel">
      <div class="main" :class="{weekmode: false}">
        <div class="topbar">
          {{selectDate}}
          <span class="today" @click="changeDate">今天</span>
        </div>
        <Calendar ref="calendar" :isWeekMode="showWeek" @change="getSelectDate"/>
      </div>
      <div class="navbar">
        <i class="icon-arrow up" @click="showWeek=!showWeek"></i>
        <div class="nav">
          <ul>
            <li class="isActive">已设置提醒</li>
            <li>创建时间</li>
            <li>最后发言时间</li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
import dayjs from 'dayjs'
import Calendar from './Calendar'
export default {
  name: 'CalendarPanel',
  components: {
    Calendar
  },
  data () {
    return {
      selectDate: dayjs().format('YYYY-MM-DD'),
      showWeek: false
    }
  },
  methods: {
    changeDate () {
      // 不传时间默认回到“今天”
      this.$refs.calendar.changeDateView()
    },
    getSelectDate (date) {
      // console.log(date)
      this.selectDate = dayjs(date).format('YYYY-MM-DD')
    }
  }
}
</script>

<style scoped>
.calendar-panel {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  background: #fff;
  width: 100%;
  .main {
    height: 316px;
    transition: height 0.3s ease;
    &.weekmode {
      height: 140px;
      overflow: hidden;
    }
    .topbar {
      position: relative;
      height: 44px;
      line-height: 44px;
      background: #333;
      color: #fff;
      text-align: center;
      font-size: 16px;
      .today {
        position: absolute;
        right: 15px;
        top: 0;
      }
    }
  }
  .navbar {
    .icon-arrow {
      display: block;
      margin: 0 auto;
      margin-bottom: 10px;
      width: 16px;
      height: 16px;
      &.up {
        background: url(../../assets/images/icon-arrow-up.png);
        background-size: cover;
      }
      &.down {
        background: url(../../assets/images/icon-arrow-down.png);
        background-size: cover;
      }
    }
    .nav {
      width: 100%;
      box-shadow:0 0 5px #bbb;
      border-bottom: 1px solid #ddd;
      box-shadow:0 0 5px #ccc;
      border-top: 1px solid #eee;
      ul {
        margin: 0 20px;
        display: flex;
        li {
          flex: 1;
          color: #333;
          text-align: center;
          font-size: 12px;
          height: 40px;
          line-height: 40px;
          position: relative;
          &.isActive {
            color: #2a579a;
            &::after {
              content: '';
              display: block;
              width: 42px;
              height: 2px;
              background: #2a579a;
              position: absolute;
              left: 30%;
              bottom: 0;
            }
          }
        }
      }
    }
  }
}
</style>
