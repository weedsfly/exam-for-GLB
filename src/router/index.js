import Vue from 'vue'
import Router from 'vue-router'
import Calendar from '@/components/calendar/Index'
import Clock from '@/components/clock/Index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Calendar
    },
    {
      path: '/calendar',
      name: 'Calendar',
      component: Calendar
    },
    {
      path: '/clock',
      name: 'Clock',
      component: Clock
    }
  ]
})
