<template>
  <b-list-group-item class="item">
    <div v-show="!editing">
      <!--<label><b-form-checkbox v-model="spent"></b-form-checkbox></label>-->
      <div class="row">
        <div class="col-6 col-sm">
          <span @click="editing = true">{{ item.title }}</span>
        </div>
        <div class="col-6 col-sm">
          <span @click="editing = true"><currency v-bind:number="item.price"></currency></span>
        </div>
        <div class="col-6 col-sm" v-show="goal === 'RETIREMENT'">
          <toggle-button @change="toggleMonthly" :value="true" :width="75" :labels="{checked: 'monthly', unchecked: 'once'}"/>
        </div>
        <div v-show="!isMonthly && goal === 'RETIREMENT'" class="col-6 col-sm">
          <span><currency v-bind:number="once"></currency></span>
        </div>
        <div v-show="isMonthly && goal === 'RETIREMENT'" class="col-6 col-sm">
          <span><currency v-bind:number="monthly"></currency></span>
        </div>
        <div class="col-6 col-sm" v-show="goal === 'DEBT'">
          <span>{{ payoffCost }} days</span>
        </div>
        <div class="col-1">
          <i class="fa fa-times-circle remove" aria-hidden="true" @click="removeItem"></i>
        </div>
      </div>
    </div>
    <form v-show="editing" v-on:submit.prevent="doneEdit">
      <div class="row">
        <div class="col">
          <b-form-input v-model="item.title"
          @keyup.enter="doneEdit"></b-form-input>
        </div>
        <div class="col">
          <b-form-input v-model="item.price"
          @keyup.enter="doneEdit"></b-form-input>
        </div>
        <div class="col">
          <span><currency v-bind:number="once"></currency></span>
        </div>
        <div class="col">
          <span><currency v-bind:number="monthly"></currency></span>
        </div>
        <div class="col">
          <b-button variant="primary" type="submit">Save</b-button>
        </div>
      </div>
    </form>
  </b-list-group-item>
</template>

<script>
import Currency from './Currency'
var _ = require('lodash/core')

export default {
  name: 'item',
  props: ['item', 'goal'],
  data () {
    return {
      editing: false,
      spent: this.item.spent,
      isMonthly: true
    }
  },
  computed: {
    once () {
      var price = this.item.price
      var rate = this.$store.state.rate / 100
      var periods = this.$store.state.years * 12

      var futureValue = price * Math.pow((1 + rate / 12), periods)

      return futureValue
    },
    monthly () {
      var price = this.item.price
      var rate = this.$store.state.rate / 100
      // var periods = this.$store.state.years * 12
      var years = this.$store.state.years
      var presentValue = 0

      var futureValue = presentValue * Math.pow((1 + rate / 12), years * 12) + price * ((Math.pow((1 + rate / 12), years * 12) - 1) / (rate / 12)) * (1 + rate / 12)

      return futureValue
    },
    payoffCost () {
      // N = −log(1−iA/P) / log(1+i)
      var debtRate = (this.$store.state.debtRate / 12) / 100
      // var payment = this.$store.state.remaining
      var debt = this.$store.state.debt

      // var potentialPayment = payment + this.item.price

      var budgeted = 0

      _.each(this.$store.state.categories, function (cat) {
        _.each(cat.items, function (item) {
          budgeted += 1 * item.price
        })
      })

      var payment = parseFloat(this.$store.state.income) - budgeted
      var potentialPayment = payment + parseFloat(this.item.price)

      console.log('rate: ' + debtRate)
      console.log('payment: ' + payment)
      console.log('payment 2: ' + potentialPayment)
      console.log('debt: ' + debt)
      console.log(this)

      var months = -Math.log(1 - debtRate * debt / payment) / Math.log(1 + debtRate)
      var potentialMonths = -Math.log(1 - debtRate * debt / potentialPayment) / Math.log(1 + debtRate)

      return Math.ceil((months - potentialMonths) * 30)
    }
  },
  methods: {
    doneEdit (e) {
      const item = this.item
      const title = this.item.title
      const price = this.item.price

      if (this.editing) {
        this.$store.commit('editItem', {item, title, price})
        this.editing = false
      }
    },
    removeItem () {
      const item = this.item
      this.$store.commit('removeItem', {item})
    },
    toggleMonthly (e) {
      this.isMonthly = e.value
    }
  },
  watch: {
    spent () {
      const item = this.item
      const spent = this.spent
      this.$store.commit('spentItem', {item, spent})
    }
  },
  components: {
    Currency
  }
}
</script>

<style scoped>

h4 {
  margin: 0;
  padding: 0;
}

.item {
  display: block;
  //margin-bottom: 10px;
  padding: 1em;
  //border: 1px solid black;
}

i.remove:hover{
  color: #d9534f;
}
</style>
