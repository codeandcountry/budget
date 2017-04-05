<template>
  <div class="budget">
    <h1>{{ title }}</h1>
    <div v-show="!editing">
      <span @click="editing = true">Total Income: <currency v-bind:number="income"></currency></span>
    </div>

    <div v-show="!editing">
      <span @click="editing = true">Years to invest: <span class="years">{{ years }}</span></span>
    </div>

    <div v-show="!editing">
      <span @click="editing = true">Interest rate: <span class="rate">{{ rate }}</span></span>
    </div>

    <form v-show="editing" v-on:submit.prevent="doneEdit">
      <input v-model="new_income"
        @keyup.enter="doneEdit"><br>
      <input v-model="new_years"
        @keyup.enter="doneEdit"><br>
      <input v-model="new_rate"
        @keyup.enter="doneEdit">
      <button type="submit">Save</button>
    </form>

    <section style="width:70%; float: left;">
      <transition-group name="category" tag="ul">
        <Category v-for="category in categories" :category="category" v-bind:key="category"></Category>
      </transition-group>
      <form v-on:submit.prevent="addCategory">
        <button type="submit">Add Category</button>
        <input class="new-category"
            v-model="new_category_title"
            autocomplete="off"
            placeholder="title">
      </form>
    </section>

    <section style="width:30%; float: left; position: relative;">
      <div class="investing" style="position: fixed; background-color: #fff3db; padding: 10px; border: 1px black solid;">
        <span>Remaining to invest: <currency v-bind:number="remaining_to_budget"></currency></span><br><br>

        <span>Invested one time: <currency v-bind:number="invested_one_time"></currency></span><br>
        <span style="font-weight:bold">Invested every month: <currency v-bind:number="invested_monthly_b"></currency></span>
      </div>
    </section>
  </div>
</template>

<script>
import Category from './Category'
import Currency from './Currency'
var _ = require('lodash/core')

export default {
  name: 'budget',
  data () {
    return {
      new_category_title: '',
      editing: false,
      new_income: this.$store.state.income,
      new_rate: this.$store.state.rate,
      new_years: this.$store.state.years
    }
  },
  computed: {
    title () {
      return this.$store.state.title
    },
    income () {
      return this.$store.state.income
    },
    rate () {
      return this.$store.state.rate
    },
    years () {
      return this.$store.state.years
    },
    categories () {
      return this.$store.state.categories
    },
    remaining_to_budget () {
      var remaining = 0

      _.each(this.$store.state.categories, function (cat) {
        _.each(cat.items, function (item) {
          remaining += 1 * item.price
        })
      })

      return this.$store.state.income - remaining
    },
    remaining_to_spend () {
      var remaining = 0

      _.each(this.$store.state.categories, function (cat) {
        _.each(cat.items, function (item) {
          if (!item.spent) {
            remaining += 1 * item.price
          }
        })
      })

      return remaining
    },
    invested_one_time () {
      var remaining = this.remaining_to_budget
      var rate = this.$store.state.rate / 100
      var periods = this.$store.state.years * 12

      var futureValue = remaining * Math.pow((1 + rate / 12), periods)

      return futureValue
    },
    invested_monthly () {
      var remaining = this.remaining_to_budget
      var rate = this.$store.state.rate / 100
      var periods = this.$store.state.years * 12

      var futureValue = (1 + rate) * remaining * ((Math.pow((1 + rate), periods) - 1) / rate)

      return futureValue
    },
    invested_monthly_b () {
      var remaining = this.remaining_to_budget
      var rate = this.$store.state.rate / 100
      // var periods = this.$store.state.years * 12
      var years = this.$store.state.years
      var presentValue = 0

      var futureValue = presentValue * Math.pow((1 + rate / 12), years * 12) + remaining * ((Math.pow((1 + rate / 12), years * 12) - 1) / (rate / 12)) * (1 + rate / 12)

      return futureValue
    }
  },
  methods: {
    addCategory () {
      const title = this.new_category_title
      if (title.trim()) {
        this.$store.commit('addCategory', {title})
      }
      this.new_category_title = ''
    },
    doneEdit () {
      const income = this.new_income
      this.$store.commit('setIncome', {income})

      const years = this.new_years
      this.$store.commit('setYears', {years})

      const rate = this.new_rate
      this.$store.commit('setRate', {rate})

      this.editing = false
    }
  },
  components: {
    Category,
    Currency
  }
}
</script>

<style scoped>

.category-list-item {
  display: inline-block;
  margin-right: 10px;
}
.category-list-enter-active{
  transition: all .5s;
}
.category-list-leave-active {
  transition: all .3s;
}
.category-list-enter, .category-list-leave-to, .category-list-leave-active {
  opacity: 0;
  transform: translateX(30px);
}
h1, h2 {
  font-weight: normal;
}

a {
  color: #42b983;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
