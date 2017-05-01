<template>
  <div class="budget">
    <div class="row">
      <h1>Budget Reset</h1>
    </div>
    <div class="row">
      <div class="col-sm-12 col-lg-8">
        <transition-group name="category" tag="ul">
          <Category v-for="category in categories" :category="category" v-bind:key="category"></Category>
        </transition-group>
        <b-card header="Add Category">
          <form v-on:submit.prevent="addCategory">
            <div class="row">
              <div class="col">
                <b-form-input class="new-category"
                    v-model="new_category_title"
                    autocomplete="off"
                    placeholder="title"></b-form-input>
              </div>
              <div class="col">
                <b-button variant="success" type="submit"><i class="fa fa-minus-circle" aria-hidden="true"></i>     Add Category</b-button>
              </div>
            </div>
          </form>
        </b-card>
      </div>
      <div class="col-sm-12 col-lg">
        <div class="row">
          <div class="col-sm-12 col-md col-lg-12">
            <b-card header="Income and settings">
              <form v-on:submit.prevent="doneEdit">
                <div class="row">
                  <div class="col">
                    Total Income:
                  </div>
                  <div class="col">
                    <b-input-group left="$">
                      <b-form-input v-model="new_income"
                        @keyup="doneEdit"></b-form-input>
                    </b-input-group>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    Years to invest:
                  </div>
                  <div class="col">
                    <b-input-group right="years">
                      <b-form-input v-model="new_years"
                        @keyup="doneEdit"></b-form-input>
                    </b-input-group>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    Interest rate: 
                  </div>
                  <div class="col">
                    <b-input-group right="%">
                      <b-form-input v-model="new_rate"
                    @keyup="doneEdit"></b-form-input>
                </b-input-group>
                  </div>
                </div>
              </form>
            </b-card>
          </div>
          <div class="col-sm-12 col-md col-lg-12">
            <b-card header="Opportunity Cost" class="investing">
              <span>Remaining to budget: <b><currency v-bind:number="remaining_to_budget"></currency></b></span><br><br>

              <span>If you invested your remaining to budget this month it could be worth <b><currency v-bind:number="invested_one_time"></currency> in {{ years }} years</b></span><br><br>

              <span>If your budgest looked like this every month and you invested your remaining to budget your nest egg could be <b><currency v-bind:number="invested_monthly_b"></currency> in {{ years }} years</b></span>
            </b-card>
          </div>
        </div>

        <div class="row">
          <div class="col-sm-12 col-md col-lg-12">
            <b-card header="Debt">
              <form v-on:submit.prevent="doneEdit">
                <div class="row">
                  <div class="col">
                    Total Income:
                  </div>
                  <div class="col">
                    <b-input-group left="$">
                      <b-form-input v-model="new_income"
                        @keyup="doneEdit"></b-form-input>
                    </b-input-group>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    Total Debt:
                  </div>
                  <div class="col">
                    <b-input-group left="$">
                      <b-form-input v-model="new_debt"
                        @keyup="doneEditDebt"></b-form-input>
                    </b-input-group>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    Interest rate: 
                  </div>
                  <div class="col">
                    <b-input-group right="%">
                      <b-form-input v-model="new_debt_rate"
                    @keyup="doneEditDebt"></b-form-input>
                </b-input-group>
                  </div>
                </div>
              </form>
            </b-card>
          </div>
          <div class="col-sm-12 col-md col-lg-12">
            <b-card header="Payoff Cost" class="investing">
              <span>Remaining to budget: <b><currency v-bind:number="remaining_to_budget"></currency></b></span><br><br>

              <span>If your budgest looked like this every month and you paid down your debt you be debt free in<b> {{ months_to_payoff }} months</b></span>
            </b-card>
          </div>
        </div>
      </div>
    </div>
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
      new_years: this.$store.state.years,
      new_debt: this.$store.state.debt,
      new_debt_rate: this.$store.state.debtRate
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
    debt () {
      return this.$store.state.debt
    },
    debtRate () {
      return this.$store.state.debtRate
    },
    remaining_to_budget () {
      var remaining = 0

      _.each(this.$store.state.categories, function (cat) {
        _.each(cat.items, function (item) {
          remaining += 1 * item.price
        })
      })

      // cache
      this.$store.commit('setRemaining', this.$store.state.income - remaining)

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
    },
    months_to_payoff () {
      // N = −log(1−iA/P) / log(1+i)
      var debtRate = (this.debtRate / 12) / 100
      var payment = this.remaining_to_budget
      var debt = this.debt

      console.log(debtRate)
      console.log(payment)
      console.log(debt)

      var months = -Math.log(1 - debtRate * debt / payment) / Math.log(1 + debtRate)

      return Math.ceil(months)
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
    },
    doneEditDebt () {
      const debt = this.new_debt
      this.$store.commit('setDebt', {debt})

      const debtRate = this.new_debt_rate
      this.$store.commit('setDebtRate', {debtRate})

      console.log('edit debt')
    }

  },
  components: {
    Category,
    Currency
  }
}
</script>

<style scoped>
.budget{
  padding: 2em;
}

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
.card{
  margin-bottom: 2em; 
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
