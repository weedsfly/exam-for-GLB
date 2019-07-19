<template>
    <div class="calendar-panel">
      <div class="main">
        <div class="topbar">
          {{selectDate}}
          <span class="today" @click="changeDate">今天</span>
        </div>
        <Calendar ref="calendar" :isWeekMode="false" @change="getSelectDate"/>
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
      selectDate: dayjs().format('YYYY-MM-DD')
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
  height: 100px;
  background: #fff;
  width: 100%;
  box-shadow:0 0 8px #ccc;
  border-bottom: 1px solid #eee;
  .main {
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
}
</style>
