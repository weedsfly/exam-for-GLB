<template>
  <div class="wrap">
    <div class="clock">
      <div class="clock-circle"></div>
      <div class="clock-hour" :style="{transform:hourRotate}"></div>
      <div class="clock-minute" :style="{transform:minuteRotate}"></div>
      <div class="clock-second" :style="{transform:secondRotate}"><i></i></div>
      <b class="hour" v-for="h in timeList" :key="h">
        <span>
          <i>{{h}}</i>
        </span>
      </b>
      <div class="clock-dial">
        <ul>
          <li v-for="n in 60" :key="n"></li>
        </ul>
      </div>
      <div class="clock-circle-outside"></div>
    </div>
  </div>
</template>

<script>
import '@/assets/styles/clock.pcss'
export default {
  data () {
    return {
      timeList: [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      hourRotate: 'rotatez(0deg)',
      minuteRotate: 'rotatez(0deg)',
      secondRotate: 'rotatez(0deg)'
    }
  },
  methods: {
    show () {
      this.showTime()
      if (this._timer) clearInterval(this._timer)
      this._timer = setInterval(() => {
        this.showTime()
      }, 1000)
    },
    showTime () {
      const now = new Date()
      let times = [now.getHours(), now.getMinutes(), now.getSeconds()]
      let hour = +times[0]
      hour = hour > 11 ? hour - 12 : hour
      let minute = +times[1]
      let second = +times[2] || 0
      let hourAngle = hour * 30 + minute * 6 / 360 * 30
      let minuteAngle = minute * 6
      let secondAngle = second * 6
      this.hourRotate = `rotatez(${hourAngle}deg)`
      this.minuteRotate = `rotatez(${minuteAngle}deg)`
      this.secondRotate = `rotatez(${secondAngle}deg)`
    }
  },
  mounted () {
    this.show()
  },
  destroyed () {
    if (this._timer) clearInterval(this._timer)
  }
}
</script>
