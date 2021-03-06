<template>
  <div class="m-calendar" ref="calendar">
    <div class="m-week-header">
      <div
        class="m-week-day"
        v-for="item in weekNames"
        :key="item">
        {{item}}
      </div>
    </div>
    <div
      class="m-months-container weekmode"
      @touchstart="touchstart"
      @touchmove="touchmove"
      @touchend="touchend"
      v-show="isWeekMode">
      <div
        class="m-months-wrapper"
        :style="{'transform': `translate3d(${-translateX*100}%, 0, 0)`}">
      <div class="m-months">
        <div
          class="m-row"
          v-for="(week, weekIndex) in fullWeek"
          :key="weekIndex"
          :style="{
            transform: `translate3d(${(weekIndex-1+translateX + (isTouching ? touch.x : 0))*100}%, 0, 0)`,
            transitionDuration: isTouching ? '0s' : '.3s',
          }">
          <div
              class="m-day"
              v-for="(day,dayIndex) in week"
              :key="dayIndex"
              @click="onDayClick(day)">
              <span
                :class="{
                  'm-day-num':true,
                  'm-grey': day.isGrey,
                  'm-today': day.isToday,
                  'm-disable': day.isDisable,
                  'm-select': day.isSelect,
                  'm-during': day.isDuring,
                  'm-mark': day.isMark
                }">
                {{day.value}}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="m-months-container"
      @touchstart="touchstart"
      @touchmove="touchmove"
      @touchend="touchend"
      v-show="!isWeekMode"
    >
      <div
        class="m-months-wrapper"
        :style="{'transform': `translate3d(${-translateX*100}%, 0, 0)`}"
      >
        <div
          class="m-months"
          v-for="(month,monthIndex) in fullDate"
          :key="monthIndex"
          :style="{
            transform: `translate3d(${(monthIndex-1+translateX + (isTouching ? touch.x : 0))*100}%, 0, 0)`,
            transitionDuration: isTouching ? '0s' : '.3s',
          }"
        >
          <div
            class="m-row"
            v-for="(week,weekIndex) in month"
            :key="weekIndex"
          >
            <div
              class="m-day"
              v-for="(day,dayIndex) in week"
              :key="dayIndex"
              @click="onDayClick(day)"
            >
              <span
                :class="{
                  'm-day-num':true,
                  'm-grey': day.isGrey,
                  'm-today': day.isToday,
                  'm-disable': day.isDisable,
                  'm-select': day.isSelect,
                  'm-during': day.isDuring,
                  'm-mark': day.isMark
                }"
              >
                {{day.value}}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '@/assets/styles/calendar.pcss'
import dayjs from 'dayjs'
let touchStartPosition
let touchEndPosition

export default {
  name: 'inlineCalendar',
  props: {
    isWeekMode: {
      type: Boolean,
      default: false
    },
    defaultDate: {
      type: [Date, Number, Array, String, dayjs]
    },
    disabledDate: {
      type: Array,
      default () {
        return []
      }
    },
    minDate: {
      type: [Date, Number, Array, String, dayjs]
    },
    maxDate: {
      type: [Date, Number, Array, String, dayjs]
    },
    mode: {
      type: String,
      default: 'single'
    },
    dayClick: {
      type: Function,
      default () {
        return function () {
          return true
        }
      }
    },
    enableTouch: {
      type: Boolean,
      default: true
    },
    monthNames: {
      type: Array,
      default () {
        return ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
      }
    },
    weekNames: {
      type: Array,
      default () {
        return ['日', '一', '二', '三', '四', '五', '六']
      }
    },
    yearName: {
      type: String,
      default: '年'
    }
  },
  watch: {
    mode () {
      this.init()
    }
  },
  data () {
    return {
      fullDate: [[], [], []],
      translateX: 0,
      showDate: {
        year: undefined,
        month: undefined
      },
      showWeekDate: {
        year: undefined,
        month: undefined,
        date: undefined
      },
      dateNow: {
        year: dayjs().year(),
        month: dayjs().month() + 1,
        date: dayjs().date()
      },
      selectDate: [],
      touch: {
        x: 0,
        y: 0
      },
      isTouching: false,
      fullWeek: []
    }
  },
  created () {
    this.init()
    // console.log(dayjs().valueOf())
  },
  methods: {
    init (date) {
      this.selectDate = []
      let { defaultDate, mode } = this
      if (date) {
        defaultDate = date
      }
      let dateToShow = dayjs().startOf('month')
      if (mode === 'single' && defaultDate) {
        this.selectDate = dayjs(defaultDate).startOf('day')
        dateToShow = this.selectDate.startOf('month')
      }
      if (mode === 'multiple' && Array.isArray(defaultDate)) {
        if (defaultDate.length > 0) {
          this.selectDate = defaultDate.map((item) => dayjs(item).startOf('day'))
        }
      }
      if (mode === 'during' && Array.isArray(defaultDate)) {
        if (defaultDate.length === 2) {
          const startDate = dayjs(defaultDate[0]).startOf('day')
          const endDate = dayjs(defaultDate[1]).startOf('day')
          if (startDate.isBefore(endDate) || startDate.isSame(endDate)) {
            this.selectDate = [startDate, endDate]
          }
        }
      }
      this.showDate = {
        year: dateToShow.year(),
        month: dateToShow.month() + 1
      }
      this.getFullDate(this.showDate)

      let curDateObj = this.dateNow
      this.showWeekDate = {
        year: curDateObj.year,
        month: curDateObj.month,
        date: curDateObj.date
      }
      this.getFullWeek(this.showWeekDate)
    },
    touchstart (event) {
      if (this.enableTouch) {
        touchStartPosition = event.touches[0].clientX
        touchEndPosition = event.touches[0].clientY
        this.touch = {
          x: 0,
          y: 0
        }
        this.isTouching = true
      }
    },
    touchmove (event) {
      if (this.enableTouch) {
        this.touch = {
          x: (event.touches[0].clientX - touchStartPosition) / this.$refs.calendar.offsetWidth,
          y: (event.touches[0].clientY - touchEndPosition) / this.$refs.calendar.offsetHeight
        }
      }
    },
    touchend (event) {
      if (this.enableTouch) {
        this.isTouching = false
        if (Math.abs(this.touch.x) > Math.abs(this.touch.y) && Math.abs(this.touch.x * this.$refs.calendar.offsetWidth) > 20) {
          if (this.touch.x > 0) {
            this.isWeekMode ? this.changeWeek('prev') : this.changeMonth('prev')
          } else if (this.touch.x < 0) {
            this.isWeekMode ? this.changeWeek('next') : this.changeMonth('next')
          }
        } else {
          this.touch = {
            x: 0,
            y: 0
          }
        }
      }
    },
    // 触发change事件
    emitChange () {
      this.$emit('change', this.selectDate)
    },
    // 触发切换年月事件
    emitSwitch (showDate) {
      this.$emit('switch', showDate)
    },
    // 日期点击事件
    onDayClick (day) {
      console.log(day)
      if (!this.dayClick(day.dateTime)) {
        return
      }
      switch (this.$props.mode) {
        case 'single':
          if (!day.isSelect && !day.isDisable) {
            this.selectDate = day.dateTime
            this.getFullDate(this.showDate)
            this.getFullWeek(this.showWeekDate)
            this.emitChange()
          }
          break
        case 'multiple':
          if (!day.isSelect && !day.isDisable) {
            this.selectDate.push(day.dateTime)
            this.getFullDate(this.showDate)
            this.getFullWeek(this.showWeekDate)
            this.emitChange()
          } else {
            if (this.selectDate.length > 1) {
              this.selectDate = this.selectDate.filter((item) => !item.isSame(day.dateTime))
              this.getFullDate(this.showDate)
              this.getFullWeek(this.showWeekDate)
              this.emitChange()
            }
          }
          break
        case 'during':
          if (day.isDisable) return
          if (this.selectDate.length === 0) {
            this.selectDate = [day.dateTime]
          } else if (this.selectDate.length === 1) {
            this.selectDate.push(day.dateTime)
            if (this.selectDate[1].isBefore(this.selectDate[0])) {
              this.selectDate.reverse()
            }
          } else if (this.selectDate.length === 2) {
            this.selectDate = [day.dateTime]
          }
          this.getFullDate(this.showDate)
          this.emitChange()
          break
      }
    },
    // 切换年份
    changeYear (action) {
      const date = dayjs(`${this.showDate.year}-${this.showDate.month}`)
      let computedDate
      switch (action) {
        case 'prev':
          this.translateX += 1
          computedDate = date.subtract(1, 'year')
          break
        case 'next':
          this.translateX -= 1
          computedDate = date.add(1, 'year')
          break
      }
      this.showDate = {
        year: computedDate.year(),
        month: computedDate.month() + 1
      }
      this.emitSwitch(this.showDate)
      this.getFullDate(this.showDate)
      this.getFullWeek(this.showWeekDate)
    },
    // 切换月份
    changeMonth (action) {
      const date = dayjs(`${this.showDate.year}-${this.showDate.month}`)
      let computedDate
      switch (action) {
        case 'prev':
          this.translateX += 1
          computedDate = date.subtract(1, 'month')
          break
        case 'next':
          this.translateX -= 1
          computedDate = date.add(1, 'month')
          break
      }
      this.showDate = {
        year: computedDate.year(),
        month: computedDate.month() + 1
      }
      this.emitSwitch(this.showDate)
      this.getFullDate(this.showDate)
      this.getFullWeek(this.showWeekDate)
    },
    // 切换星期
    changeWeek (action) {
      const date = dayjs(`${this.showWeekDate.year}-${this.showWeekDate.month}`).date(this.showWeekDate.date)
      let computedDate
      switch (action) {
        case 'prev':
          this.translateX += 1
          computedDate = date.subtract(7, 'day')
          break
        case 'next':
          this.translateX -= 1
          computedDate = date.add(7, 'day')
          break
      }
      this.showWeekDate = {
        year: computedDate.year(),
        month: computedDate.month() + 1,
        date: computedDate.date()
      }
      this.emitSwitch(this.showWeekDate)
      this.getFullWeek(this.showWeekDate)
    },
    // 暴露出去的方法：切换已选的时间
    changeDate (date) {
      console.log(this)
      if (!dayjs(date).isValid()) {
        console.error('Type of parameter is invalid!')
      }
      this.init(date)
    },
    // 暴露出去的方法：切换当前显示的时间
    changeDateView (date = dayjs()) {
      const changeDate = dayjs(date)
      this.showDate = {
        year: changeDate.year(),
        month: changeDate.month() + 1
      }
      this.getFullDate(this.showDate)

      let curDateObj = this.dateNow
      this.showWeekDate = {
        year: curDateObj.year,
        month: curDateObj.month,
        date: curDateObj.date
      }
      this.getFullWeek(this.showWeekDate)
    },
    getFullDate () {
      const date = dayjs(`${this.showDate.year}-${this.showDate.month}`)
      const thisDate = this.getDate(date)
      const prevDate = this.getDate(date.subtract(1, 'month'))
      const nextDate = this.getDate(date.add(1, 'month'))
      this.fullDate = [
        prevDate.fullDate,
        thisDate.fullDate,
        nextDate.fullDate
      ]
    },
    getFullWeek () {
      const date = dayjs(`${this.showWeekDate.year}-${this.showWeekDate.month}`).date(this.showWeekDate.date)
      const thisDate = this.getWeekDate(date)
      const prevDate = this.getWeekDate(date.subtract(7, 'day'))
      const nextDate = this.getWeekDate(date.add(7, 'day'))
      this.fullWeek = [
        prevDate.fullWeek,
        thisDate.fullWeek,
        nextDate.fullWeek
      ]
    },
    // 当前日期是否备注
    isMark (date) {
      let mark = false
      let dateValue = dayjs(date).valueOf()
      let markDate = [dayjs('2019-07-08'), dayjs('2019-07-16'), dayjs('2019-07-18'), dayjs('2019-07-22')]
      markDate.forEach(item => {
        let temp = dayjs(item).valueOf()
        if (dateValue === temp) {
          mark = true
        }
      })
      return mark
    },
    // 当前日期是否被选中
    isSelect (date) {
      let select = false
      switch (this.$props.mode) {
        case 'single':
          if (this.selectDate && date.isSame(this.selectDate)) {
            select = true
          }
          break
        case 'multiple':
          if (this.selectDate.length > 0 && this.selectDate.some((item) => date.isSame(item))) {
            select = true
          }
          break
      }
      return select
    },
    // 当前时间是否在selectDate之间
    isBetting (date) {
      if (this.mode === 'during') {
        const startDate = this.selectDate[0]
        const endDate = this.selectDate[1]
        if (this.selectDate.length === 1) {
          return date.isSame(startDate)
        } else if (this.selectDate.length === 2) {
          return (date.isAfter(startDate) && date.isBefore(endDate)) || date.isSame(startDate) || date.isSame(endDate)
        }
      }
      return false
    },
    getIsDisable (dateTime) {
      let isDisable = false
      const disabledDate = this.disabledDate.map((item) => dayjs(item).startOf('day'))
      if (this.minDate || this.maxDate) {
        if (this.minDate) {
          const minDate = dayjs(this.minDate).startOf('day')
          isDisable = dateTime.isBefore(minDate)
        }
        if (!isDisable && this.maxDate) {
          const maxDate = dayjs(this.maxDate).endOf('day')
          isDisable = dateTime.isAfter(maxDate)
        }
      } else if (disabledDate.length > 0) {
        if (this.mode !== 'during') {
          isDisable = disabledDate.some((item) => item.isSame(dateTime))
        }
      }
      return isDisable
    },
    getDate (thisDate) {
      let date = []
      const prevDate = thisDate.subtract(1, 'month')
      const nextDate = thisDate.add(1, 'month')
      const firstDayOfWeek = (thisDate.day() + 1) || 7
      const dayCountOfThisMonth = thisDate.daysInMonth()
      const dayCountOfPrevMonth = prevDate.daysInMonth()
      const prevIndexOfThisMonth = firstDayOfWeek - 1
      const NextIndexOfThisMonth = firstDayOfWeek + dayCountOfThisMonth - 2
      // const disabledDate = this.disabledDate.map((item) => dayjs(item).startOf('day'))
      for (let i = 0; i < 7 * 6; i++) {
        // 上月
        if (i < prevIndexOfThisMonth) {
          const value = dayCountOfPrevMonth - (firstDayOfWeek - i - 2)
          const dateTime = prevDate.date(value)
          date[i] = {
            value,
            dateTime,
            isGrey: true,
            isToday: dateTime.isSame(dayjs().startOf('day')),
            isSelect: this.isSelect(dateTime),
            isDisable: this.getIsDisable(dateTime),
            isDuring: this.isBetting(dateTime),
            isMark: this.isMark(dateTime)
          }
        }
        // 当月
        if (
          i >= prevIndexOfThisMonth &&
          i <= NextIndexOfThisMonth
        ) {
          const value = i - firstDayOfWeek + 2
          const dateTime = thisDate.date(value)
          date[i] = {
            value,
            dateTime,
            isGrey: false,
            isToday: dateTime.isSame(dayjs().startOf('day')),
            isSelect: this.isSelect(dateTime),
            isDisable: this.getIsDisable(dateTime),
            isDuring: this.isBetting(dateTime),
            isMark: this.isMark(dateTime)
          }
        }
        // 下月
        if (i > NextIndexOfThisMonth) {
          const value = i - firstDayOfWeek - dayCountOfThisMonth + 2
          const dateTime = nextDate.date(value)
          date[i] = {
            value,
            dateTime,
            isGrey: true,
            isToday: dateTime.isSame(dayjs().startOf('day')),
            isSelect: this.isSelect(dateTime),
            isDisable: this.getIsDisable(dateTime),
            isDuring: this.isBetting(dateTime),
            isMark: this.isMark(dateTime)
          }
        }
      }
      const fullDate = []
      for (let i = 0; i < 6; i++) {
        fullDate.push(date.slice(i * 7, (i + 1) * 7))
      }
      // console.log(fullDate)
      return {
        fullDate
      }
    },
    getWeekDate (thisDate) {
      const fullWeek = []
      let date = []
      let weekOfDate = Number(dayjs(thisDate).format('d'))
      if (weekOfDate === 7) {
        weekOfDate = 0
      }
      for (var i = 0; i < 7; i++) {
        let valueObj = dayjs(thisDate).subtract(weekOfDate - i, 'day')
        const value = valueObj.date()
        const dateTime = valueObj
        date[i] = {
          value,
          dateTime,
          isGrey: false,
          isToday: dateTime.isSame(dayjs().startOf('day')),
          isSelect: this.isSelect(dateTime),
          isDisable: this.getIsDisable(dateTime),
          isDuring: this.isBetting(dateTime),
          isMark: this.isMark(dateTime)
        }
        fullWeek.push(date[i])
      }
      // console.log(fullWeek)
      return {
        fullWeek
      }
    }
  }
}
</script>
