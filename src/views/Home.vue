<template>
  <div class="flex bg-gray-100">
    <div class="w-2/5 h-screen">
      <div class="p-12 pt-20 px-16" >
        <event-form />
      </div>
    </div>
    <div class="w-3/5 bg-gray-200 h-screen px-6 py-0 ">
      <event-calendar />
    </div>
  </div>
</template>

<script>
import EventForm from '@/components/EventForm'
import EventCalendar from '@/components/EventCalendar'
import { mapActions } from 'vuex'

export default {
  name: 'home',
  components: { EventForm, EventCalendar },
  created() {
    this.getList()
  },
  methods: {
    ...mapActions({
      fetchEvents: 'fetchEvents',
    }),
    getList() {
      this.fetchEvents().then(() => {
        console.log('Completed')
      }).catch(() => {
        this.$message.error('Oops, Error fetching events.');
      });
    }
  },
}
</script>
