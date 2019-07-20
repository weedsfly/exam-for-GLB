<template>
    <div>
        <Clock/>
    </div>
</template>

<script>
import Clock from './Clock'
export default {
  name: 'Calendar',
  components: {
    Clock
  },
  data () {
    return {
    }
  },
  methods: {
    changeMode (mode) {
      this.showWeek = mode
    }
  }
}
</script>

<style scoped>
</style>
