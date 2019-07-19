<template>
    <div>
        <CalendarPanel/>
        <InfoList/>
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
    }
  }
}
</script>

<style scoped>
</style>
