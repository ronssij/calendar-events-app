<template>
  <div class="flex bg-gray-100">
    <div class="w-2/5 h-screen">
      <div class="p-12 pt-20 px-16" >
        <event-form />
      </div>
    </div>
    <div class="w-3/5 bg-gray-200 h-screen p-6 pt-20">
      <div>
        {{ events }}
      </div>
    </div>
  </div>
</template>

<script>
import EventForm from '@/components/EventForm'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'home',
  components: { EventForm },
  created() {
    this.getList()
  },
  computed: {
    ...mapState({
      'events': state => state.events
    }),
  },
  methods: {
    ...mapActions({
      fetchEvents: 'fetchEvents',
    }),
    getList() {
      this.fetchEvents().then(() => {
        console.log('ok kaaeyoh')
      }).catch(() => {
        this.$message.error('Oops, Error fetching events.');
      });
    }
  },
}
</script>
