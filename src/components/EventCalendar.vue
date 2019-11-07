<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar flat color="white">
          <v-btn text small @click="prev">
            <v-icon small>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn text small @click="next">
            <v-icon small>mdi-chevron-right</v-icon>
          </v-btn>
          <v-toolbar-title class="ml-8" > {{ title }} </v-toolbar-title>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="events"
          :event-color="getEventColor"
          :event-margin-bottom="3"
          :now="today"
          type="month"
          @click:more="viewMore"
          @change="updateRange"
        ></v-calendar>

        <v-dialog v-model="dialog" scrollable max-width="400px">
          <v-card>
            <v-card-title> {{ seeMoreDate }} </v-card-title>
            <v-divider></v-divider>
            <v-card-text v-if="seeMoreDates" class="py-4" style="height: 300px;">
              <v-list-item v-for="(event, key) in seeMoreDates" :key="key" two-line>
                <v-list-item-content>
                  <span class='text--primary'> {{ event.name }} </span>
                  <v-list-item-subtitle class="py-2 font-italic" >
                    <span> {{ event.start }} - {{ event.end }} </span>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false"> Close </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'

export default {
  data: () => ({
    seeMoreDate: null,
    seeMoreDates: [],
    today: moment().format("YYYY-MM-DD"),
    focus: moment().format("YYYY-MM-DD"),
    dialog: false,
    start: null,
    end: null,
  }),
  computed: {
    ...mapState({
      'events': state => state.events
    }),
    title () {
      const { start, end } = this

      if (!start || !end) {
        return ''
      }

      const startMonth = this.monthFormatter(start)
      const startYear = start.year
      return `${startMonth} ${startYear}`
    },
    monthFormatter () {
      return this.$refs.calendar.getFormatter({
        timeZone: 'UTC', month: 'long',
      })
    },
  },
  mounted () {
    this.$refs.calendar.checkChange()
  },
  methods: {
    getEventColor (event) {
      return event.color
    },
    prev () {
      this.$refs.calendar.prev()
    },
    next () {
      this.$refs.calendar.next()
    },
    updateRange ({ start, end }) {
      this.start = start
      this.end = end
    },
    viewMore ({date}) {
      this.dialog = true
      this.seeMoreDate = moment(date).format('MMMM DD')
      this.seeMoreDates = this.events.filter(function(data, i) {
        return ( data['start'] === date || data['end'] === date );
      })
    }
  },
}
</script>

<style lang="scss" >
  .v-calendar-weekly .v-calendar-weekly__head-weekday {
    border-bottom: #e0e0e0 1px solid;
    padding: 10px;
  }

  .v-calendar-weekly__day-label {
    margin: unset;
    margin-bottom: 10px !important;
    .v-btn--fab {
      height: 20px !important;
    }
    .v-btn--round {
      border-radius: 10px;
      height: auto;
    }
  }
</style>