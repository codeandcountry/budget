<template>
  <b-card class="category" show-header show-footer>
    <div slot="header">
      <span @click="editing = true" v-show="!editing">{{ category.title }}: <currency v-bind:number="items_total"></currency></span>
      <form v-show="editing" v-on:submit.prevent="doneEdit">
        <div class="row">
          <div class="col">
            <b-form-input v-model="category.title"
              @keyup.enter="doneEdit"></b-form-input>
          </div>
          <div class="col">
            <b-button variant="primary" type="submit">Save</b-button>
          </div>
        </div>
      </form>
    </div>
    <b-list-group>
      <transition-group name="item" tag="div">
        <Item v-for="item in category.items" :item="item" v-bind:key="item"></Item>
      </transition-group>

      <b-list-group-item>
        <form v-on:submit.prevent="addItem">
          <div class="row">
            <div class="col">
              <b-form-input v-model="item_title"
              @keyup.enter="addItem"
              placeholder="title"></b-form-input>
            </div>
            <div class="col">
              <b-form-input v-model="item_price"
              @keyup.enter="addItem"
              placeholder="price"></b-form-input>
            </div>
            <div class="col">
              <b-button variant="success" type="submit">Add Item</b-button>
            </div>
          </div>
        </form>
      </b-list-group-item>
    </b-list-group>
    <small slot="footer" class="text-muted">
      <b-button variant="danger" @click="removeCategory">Remove Category</b-button>
    </small>
  </b-card>
</template>

<script>
import Item from './Item'
import Currency from './Currency'
var _ = require('lodash/core')

export default {
  name: 'category',
  props: ['category'],
  data () {
    return {
      editing: false,
      item_title: '',
      item_price: ''
    }
  },
  computed: {
    items () {
      return this.category.items
    },
    items_total () {
      var totalPrice = 0

      _.each(this.category.items, function (item) {
        totalPrice += 1 * item.price
      })
      return totalPrice
    },
    remaining_to_spend () {
      var remaining = 0

      _.each(this.category.items, function (item) {
        if (!item.spent) {
          remaining += 1 * item.price
        }
      })

      return remaining
    }
  },
  methods: {
    addItem (e) {
      const title = this.item_title
      const price = this.item_price
      const category = this.category
      if (title.trim()) {
        this.$store.commit('addItem', {category, title, price})
      }
      this.item_title = this.item_price = ''
    },
    doneEdit () {
      if (this.editing) {
        const category = this.category
        const title = this.category.title
        this.$store.commit('editCategory', {category, title})
        this.editing = false
      }
    },
    removeCategory () {
      const category = this.category
      this.$store.commit('removeCategory', {category})
    }
  },
  components: {
    Item,
    Currency
  }
}
</script>

<style scoped>
  .category{
    margin-bottom: 2em;
  }
</style>
