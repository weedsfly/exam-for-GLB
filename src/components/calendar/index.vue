<template>
    <div>
        <CalendarPanel @changeMode="changeMode"/>
        <InfoList class="marginTop" :class="{weekmode: showWeek}"/>
        <Tabbar/>
    </div>
</template>

<script>
import CalendarPanel from './CalendarPanel'
import InfoList from './InfoList'
import Tabbar from './Tabbar'
export default {
  name: 'Calendar',
  components: {
    CalendarPanel,
    InfoList,
    Tabbar
  },
  data () {
    return {
      showWeek: false
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
.marginTop {
  margin-top: 390px;
  &.weekmode {
    margin-top: 210px;
  }
}
</style>
