<template>
  <div class="flex bg-gray-100">
    <div class="w-2/5 h-screen">
      <div class="p-12 pt-20 px-16" >
        <event-form @isSaved="getList" />
      </div>
    </div>
    <div class="w-3/5 bg-gray-200 h-screen px-6 py-0 ">
      <v-overlay :absolute="true" :z-index="100" :value="loading" >
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
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
  data () {
    return {
      loading: true
    }
  },
  created() {
    this.getList()
  },
  methods: {
    ...mapActions({
      fetchEvents: 'fetchEvents',
    }),
    getList() {
      this.loading = true
      this.fetchEvents().then(() => {
        setTimeout(() => {
          this.loading = false
        }, 1500);
      }).catch(() => {
        this.$message.error('Oops, Error fetching events.');
      });
    }
  },
}
</script>
