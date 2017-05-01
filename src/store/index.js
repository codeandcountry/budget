import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from 'vuex-persistedstate'
var _ = require('lodash/core')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    income: 0,
    title: 'Budget Reset',
    categories: [
    ],
    rate: 10,
    years: 1,
    debt: 0,
    debtRate: 0,
    remaining: 0
  },
  mutations: {
    setIncome (state, {income}) {
      state.income = income
    },
    setRate (state, {rate}) {
      state.rate = rate
    },
    setYears (state, {years}) {
      state.years = years
    },
    setDebt (state, {debt}) {
      state.debt = debt
    },
    setDebtRate (state, {debtRate}) {
      state.debtRate = debtRate
    },
    setRemaining (state, {remaining}) {
      state.remaining = remaining
    },
    addCategory (state, { title }) {
      state.categories.push({
        title: title,
        items: []
      })
    },
    editCategory (state, {category, title}) {
      category.title = title
    },
    addItem (state, {category, title, price}) {
      category.items.push({
        title: title,
        price: price,
        spent: false
      })
    },
    editItem (state, {item, title, price}) {
      item.title = title
      item.price = price
    },
    spentItem (state, {item, spent}) {
      item.spent = spent
    },
    removeCategory (state, {category}) {
      const index = state.categories.indexOf(category)
      state.categories.splice(index, 1)
    },
    removeItem (state, {item}) {
      _.each(state.categories, function (category) {
        if (category.items.indexOf(item) > -1) {
          category.items.splice(category.items.indexOf(item), 1)
        }
      })
    }
  },
  plugins: [createPersistedState()]
})
