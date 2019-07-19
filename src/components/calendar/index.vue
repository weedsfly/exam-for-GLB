<template>
    <div>
        <InfoList/>
        <Tabbar/>
    </div>
</template>

<script>
import InfoList from './InfoList'
import Tabbar from './Tabbar'
export default {
  name: 'Calendar',
  components: {
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
