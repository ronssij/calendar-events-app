<template>
  <el-form class="calendar-event-form" :label-position="labelPosition" label-width="100px" :model="form">
    <el-form-item label="Event" :error="hasError('title', true)" >
      <el-input v-model="form.title" clearable/>
    </el-form-item>
    <el-form-item label="Date" :error="hasError('range', true)" >
      <el-date-picker
        v-model="dateRange"
        type="daterange"
        range-separator="-"
        start-placeholder="From"
        end-placeholder="To"
        value-format="yyyy-MM-dd"
        @keydown="$event.preventDefault()"
        style="width:100%" />
    </el-form-item>
    <el-form-item>
      <el-checkbox-group class="form-checkbox" v-model="form.days">
        <el-checkbox label="Mon" name="type" />
        <el-checkbox label="Tue" name="type" />
        <el-checkbox label="Wed" name="type" />
        <el-checkbox label="Thu" name="type" />
        <el-checkbox label="Fri" name="type" />
        <el-checkbox label="Sat" name="type" />
        <el-checkbox label="Sun" name="type" />
      </el-checkbox-group>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="create(form)" > Save </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      formErrors: {},
      labelPosition: 'top',
      dateRange: ''
    };
  },
  computed: {
    ...mapState({
      'form': state => state.form
    })
  },
  methods: {
    ...mapActions({
      createEvent: 'createEvent'
    }),
    create (form) {
      this.createEvent(form).then(() => {
        this.formErrors = {}
        this.$emit('isSaved')
      }).catch((err) => {
        if ( err.response.status === 422 ) {
          this.formErrors = err.response.data.errors
        }
        this.$message.error('Oops, Error saving events.');
      })
    },
    hasError (field, returnMessage = false) {
      if (this.formErrors[field]) {
        return returnMessage ? this.formErrors[field][0] : true
      } else {
        return returnMessage ? null : false
      }
    }
  },
  watch: {
    dateRange (newDate) {
      if ( newDate ) {
        this.form.start = newDate[0]
        this.form.end   = newDate[1]
      } else {
        this.form.start = ''
        this.form.end   = ''
        this.dateRange  = ''
      }
    },
  },
}
</script>


<style lang="scss">
  .calendar-event-form {
    .el-form-item__label {
      line-height: 0 !important;
    }
    .el-form-item {
      margin-bottom: 35px;
    }
  }

  .form-checkbox {
    .el-checkbox {
      margin-right: 9px
    }
  }
</style>
