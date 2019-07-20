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
  }
}
</script>
