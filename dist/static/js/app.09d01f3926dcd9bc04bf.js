webpackJsonp([1,0],[function(t,e,i){"use strict";function s(t){return t&&t.__esModule?t:{default:t}}var n=i(4),a=s(n),o=i(7),r=s(o),c=i(27),l=s(c);new a.default({store:r.default,el:"#app",template:"<App/>",components:{App:l.default}})},,,function(t,e,i){var s=i(1)(i(11),i(35),null,null);t.exports=s.exports},,,,function(t,e,i){"use strict";function s(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var n=i(4),a=s(n),o=i(37),r=s(o),c=i(36),l=s(c),u=i(2);a.default.use(r.default),e.default=new r.default.Store({state:{income:0,title:"Budget Reset",categories:[],rate:10,years:1,debt:0,debtRate:0,remaining:0,goal:0},mutations:{setIncome:function(t,e){var i=e.income;t.income=i},setRate:function(t,e){var i=e.rate;t.rate=i},setYears:function(t,e){var i=e.years;t.years=i},setDebt:function(t,e){var i=e.debt;t.debt=i},setDebtRate:function(t,e){var i=e.debtRate;t.debtRate=i},setRemaining:function(t,e){var i=e.remaining;t.remaining=i},setGoal:function(t,e){var i=e.goal;t.goal=i},addCategory:function(t,e){var i=e.title;t.categories.push({title:i,items:[]})},editCategory:function(t,e){var i=e.category,s=e.title;i.title=s},addItem:function(t,e){var i=e.category,s=e.title,n=e.price;i.items.push({title:s,price:n,spent:!1})},editItem:function(t,e){var i=e.item,s=e.title,n=e.price;i.title=s,i.price=n},spentItem:function(t,e){var i=e.item,s=e.spent;i.spent=s},removeCategory:function(t,e){var i=e.category,s=t.categories.indexOf(i);t.categories.splice(s,1)},removeItem:function(t,e){var i=e.item;u.each(t.categories,function(t){t.items.indexOf(i)>-1&&t.items.splice(t.items.indexOf(i),1)})}},plugins:[(0,l.default)()]})},function(t,e,i){"use strict";function s(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var n=i(4),a=s(n),o=i(13),r=s(o),c=i(28),l=s(c),u=i(26),d=s(u);i(15),i(14),a.default.use(r.default),a.default.use(d.default),e.default={name:"app",components:{Budget:l.default}}},function(t,e,i){"use strict";function s(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var n=i(29),a=s(n),o=i(3),r=s(o),c=i(2);e.default={name:"budget",data:function(){return{new_category_title:"",editing:!1,new_income:this.$store.state.income,new_rate:this.$store.state.rate,new_years:this.$store.state.years,new_debt:this.$store.state.debt,new_debt_rate:this.$store.state.debtRate,new_goal:this.$store.state.goal,goal_options:[{text:"Retirement",value:"RETIREMENT"},{text:"Debt Payoff",value:"DEBT"}]}},computed:{title:function(){return this.$store.state.title},income:function(){return this.$store.state.income},rate:function(){return this.$store.state.rate},years:function(){return this.$store.state.years},categories:function(){return this.$store.state.categories},debt:function(){return this.$store.state.debt},debtRate:function(){return this.$store.state.debtRate},remaining_to_budget:function(){var t=0;return c.each(this.$store.state.categories,function(e){c.each(e.items,function(e){t+=1*e.price})}),this.$store.commit("setRemaining",this.$store.state.income-t),this.$store.state.income-t},remaining_to_spend:function(){var t=0;return c.each(this.$store.state.categories,function(e){c.each(e.items,function(e){e.spent||(t+=1*e.price)})}),t},invested_one_time:function(){var t=this.remaining_to_budget,e=this.$store.state.rate/100,i=12*this.$store.state.years,s=t*Math.pow(1+e/12,i);return s},invested_monthly:function(){var t=this.remaining_to_budget,e=this.$store.state.rate/100,i=12*this.$store.state.years,s=(1+e)*t*((Math.pow(1+e,i)-1)/e);return s},invested_monthly_b:function(){var t=this.remaining_to_budget,e=this.$store.state.rate/100,i=this.$store.state.years,s=0,n=s*Math.pow(1+e/12,12*i)+t*((Math.pow(1+e/12,12*i)-1)/(e/12))*(1+e/12);return n},months_to_payoff:function(){var t=this.debtRate/12/100,e=this.remaining_to_budget,i=this.debt;console.log(t),console.log(e),console.log(i);var s=-Math.log(1-t*i/e)/Math.log(1+t);return Math.ceil(s)}},methods:{addCategory:function(){var t=this.new_category_title;t.trim()&&this.$store.commit("addCategory",{title:t}),this.new_category_title=""},doneEdit:function(){var t=this.new_income;this.$store.commit("setIncome",{income:t});var e=this.new_years;this.$store.commit("setYears",{years:e});var i=this.new_rate;this.$store.commit("setRate",{rate:i}),this.editing=!1},doneEditDebt:function(){var t=this.new_debt;this.$store.commit("setDebt",{debt:t});var e=this.new_debt_rate;this.$store.commit("setDebtRate",{debtRate:e}),console.log("edit debt")}},watch:{new_goal:function(t,e){var i=this.new_goal;this.$store.commit("setGoal",{goal:i})}},components:{Category:a.default,Currency:r.default}}},function(t,e,i){"use strict";function s(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var n=i(30),a=s(n),o=i(3),r=s(o),c=i(2);e.default={name:"category",props:["category","goal"],data:function(){return{editing:!1,item_title:"",item_price:""}},computed:{items:function(){return this.category.items},items_total:function(){var t=0;return c.each(this.category.items,function(e){t+=1*e.price}),t},remaining_to_spend:function(){var t=0;return c.each(this.category.items,function(e){e.spent||(t+=1*e.price)}),console.log(this),t}},methods:{addItem:function(t){var e=this.item_title,i=this.item_price,s=this.category;e.trim()&&this.$store.commit("addItem",{category:s,title:e,price:i}),this.item_title=this.item_price=""},doneEdit:function(){if(this.editing){var t=this.category,e=this.category.title;this.$store.commit("editCategory",{category:t,title:e}),this.editing=!1}},removeCategory:function(){var t=this.category;this.$store.commit("removeCategory",{category:t})}},components:{Item:a.default,Currency:r.default}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i(25),n=i(23);e.default={name:"currency",props:["number"],data:function(){return{animatedNumber:this.number}},watch:{number:function(t,e){function i(t){n(i),s.update(t)}var a=this;new s.Tween({tweeningNumber:e}).easing(s.Easing.Quadratic.Out).to({tweeningNumber:t},500).onUpdate(function(){a.animatedNumber=this.tweeningNumber.toFixed(0)}).start(),i()}},filters:{currency:function(t){return Number(t).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g,"$1,")}}}},function(t,e,i){"use strict";function s(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var n=i(3),a=s(n),o=i(2);e.default={name:"item",props:["item","goal"],data:function(){return{editing:!1,spent:this.item.spent,isMonthly:!0}},computed:{once:function(){var t=this.item.price,e=this.$store.state.rate/100,i=12*this.$store.state.years,s=t*Math.pow(1+e/12,i);return s},monthly:function(){var t=this.item.price,e=this.$store.state.rate/100,i=this.$store.state.years,s=0,n=s*Math.pow(1+e/12,12*i)+t*((Math.pow(1+e/12,12*i)-1)/(e/12))*(1+e/12);return n},payoffCost:function(){var t=this.$store.state.debtRate/12/100,e=this.$store.state.debt,i=0;o.each(this.$store.state.categories,function(t){o.each(t.items,function(t){i+=1*t.price})});var s=parseFloat(this.$store.state.income)-i,n=s+parseFloat(this.item.price);console.log("rate: "+t),console.log("payment: "+s),console.log("payment 2: "+n),console.log("debt: "+e),console.log(this);var a=-Math.log(1-t*e/s)/Math.log(1+t),r=-Math.log(1-t*e/n)/Math.log(1+t);return Math.ceil(30*(a-r))}},methods:{doneEdit:function(t){var e=this.item,i=this.item.title,s=this.item.price;this.editing&&(this.$store.commit("editItem",{item:e,title:i,price:s}),this.editing=!1)},removeItem:function(){var t=this.item;this.$store.commit("removeItem",{item:t})},toggleMonthly:function(t){this.isMonthly=t.value}},watch:{spent:function t(){var e=this.item,t=this.spent;this.$store.commit("spentItem",{item:e,spent:t})}},components:{Currency:a.default}}},,function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},,,,,,,,function(t,e,i){i(17);var s=i(1)(i(8),i(32),null,null);t.exports=s.exports},function(t,e,i){i(16);var s=i(1)(i(9),i(31),"data-v-08f9c818",null);t.exports=s.exports},function(t,e,i){i(19);var s=i(1)(i(10),i(34),"data-v-6ee10e91",null);t.exports=s.exports},function(t,e,i){i(18);var s=i(1)(i(12),i(33),"data-v-6ddcefa6",null);t.exports=s.exports},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"budget"},[t._m(0),t._v(" "),i("div",{staticClass:"row"},[i("div",{staticClass:"col-sm-12 col-lg-8"},[i("transition-group",{attrs:{name:"category",tag:"ul"}},t._l(t.categories,function(e){return i("Category",{key:e,attrs:{category:e,goal:t.new_goal}})})),t._v(" "),i("b-card",{attrs:{header:"Add Category"}},[i("form",{on:{submit:function(e){e.preventDefault(),t.addCategory(e)}}},[i("div",{staticClass:"row"},[i("div",{staticClass:"col"},[i("b-form-input",{staticClass:"new-category",attrs:{autocomplete:"off",placeholder:"title"},model:{value:t.new_category_title,callback:function(e){t.new_category_title=e},expression:"new_category_title"}})],1),t._v(" "),i("div",{staticClass:"col"},[i("b-button",{attrs:{variant:"success",type:"submit"}},[i("i",{staticClass:"fa fa-plus-circle",attrs:{"aria-hidden":"true"}}),t._v("     Add Category")])],1)])])])],1),t._v(" "),i("div",{staticClass:"col-sm-12 col-lg"},[i("div",{staticClass:"row"},[i("div",{staticClass:"col-sm-12 col-md col-lg-12"},[i("b-card",{attrs:{header:"Goal and Income"}},[i("div",{staticClass:"row"},[i("div",{staticClass:"col"},[t._v("\n                Goal:\n              ")]),t._v(" "),i("div",{staticClass:"col"},[i("form",{on:{submit:function(e){e.preventDefault(),t.doneEdit(e)}}},[i("b-form-select",{staticClass:"mb-3",attrs:{options:t.goal_options},model:{value:t.new_goal,callback:function(e){t.new_goal=e},expression:"new_goal"}})],1)])]),t._v(" "),i("div",{staticClass:"row"},[i("div",{staticClass:"col"},[t._v("\n                  Monthly Income:\n                ")]),t._v(" "),i("div",{staticClass:"col"},[i("b-input-group",{attrs:{left:"$"}},[i("b-form-input",{on:{keyup:t.doneEdit},model:{value:t.new_income,callback:function(e){t.new_income=e},expression:"new_income"}})],1)],1)])])],1),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:"RETIREMENT"===t.new_goal,expression:"new_goal === 'RETIREMENT'"}],staticClass:"col-sm-12 col-md col-lg-12"},[i("b-card",{attrs:{header:"Income and settings"}},[i("form",{on:{submit:function(e){e.preventDefault(),t.doneEdit(e)}}},[i("div",{staticClass:"row"},[i("div",{staticClass:"col"},[t._v("\n                  Years to invest:\n                ")]),t._v(" "),i("div",{staticClass:"col"},[i("b-input-group",{attrs:{right:"years"}},[i("b-form-input",{on:{keyup:t.doneEdit},model:{value:t.new_years,callback:function(e){t.new_years=e},expression:"new_years"}})],1)],1)]),t._v(" "),i("div",{staticClass:"row"},[i("div",{staticClass:"col"},[t._v("\n                  Interest rate: \n                ")]),t._v(" "),i("div",{staticClass:"col"},[i("b-input-group",{attrs:{right:"%"}},[i("b-form-input",{on:{keyup:t.doneEdit},model:{value:t.new_rate,callback:function(e){t.new_rate=e},expression:"new_rate"}})],1)],1)])])])],1),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:"RETIREMENT"===t.new_goal,expression:"new_goal === 'RETIREMENT'"}],staticClass:"col-sm-12 col-md col-lg-12"},[i("b-card",{staticClass:"investing",attrs:{header:"Opportunity Cost"}},[i("span",[t._v("Remaining to budget: "),i("b",[i("currency",{attrs:{number:t.remaining_to_budget}})],1)]),i("br"),i("br"),t._v(" "),i("span",[t._v("If you invested your remaining to budget this month it could be worth "),i("b",[i("currency",{attrs:{number:t.invested_one_time}}),t._v(" in "+t._s(t.years)+" years")],1)]),i("br"),i("br"),t._v(" "),i("span",[t._v("If your budgest looked like this every month and you invested your remaining to budget your nest egg could be "),i("b",[i("currency",{attrs:{number:t.invested_monthly_b}}),t._v(" in "+t._s(t.years)+" years")],1)])])],1)]),t._v(" "),i("div",{staticClass:"row"},[i("div",{directives:[{name:"show",rawName:"v-show",value:"DEBT"===t.new_goal,expression:"new_goal === 'DEBT'"}],staticClass:"col-sm-12 col-md col-lg-12"},[i("b-card",{attrs:{header:"Debt"}},[i("form",{on:{submit:function(e){e.preventDefault(),t.doneEdit(e)}}},[i("div",{staticClass:"row"},[i("div",{staticClass:"col"},[t._v("\n                  Total Debt:\n                ")]),t._v(" "),i("div",{staticClass:"col"},[i("b-input-group",{attrs:{left:"$"}},[i("b-form-input",{on:{keyup:t.doneEditDebt},model:{value:t.new_debt,callback:function(e){t.new_debt=e},expression:"new_debt"}})],1)],1)]),t._v(" "),i("div",{staticClass:"row"},[i("div",{staticClass:"col"},[t._v("\n                  Interest rate: \n                ")]),t._v(" "),i("div",{staticClass:"col"},[i("b-input-group",{attrs:{right:"%"}},[i("b-form-input",{on:{keyup:t.doneEditDebt},model:{value:t.new_debt_rate,callback:function(e){t.new_debt_rate=e},expression:"new_debt_rate"}})],1)],1)])])])],1),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:"DEBT"===t.new_goal,expression:"new_goal === 'DEBT'"}],staticClass:"col-sm-12 col-md col-lg-12"},[i("b-card",{staticClass:"investing",attrs:{header:"Payoff Cost"}},[i("span",[t._v("Remaining to budget: "),i("b",[i("currency",{attrs:{number:t.remaining_to_budget}})],1)]),i("br"),i("br"),t._v(" "),i("span",[t._v("If your budgest looked like this every month and you paid down your debt you be debt free in"),i("b",[t._v(" "+t._s(t.months_to_payoff)+" months")])])])],1)])])])])},staticRenderFns:[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"row"},[i("h1",[t._v("Budget Reset")])])}]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"app"}},[i("budget")],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("b-list-group-item",{staticClass:"item"},[i("div",{directives:[{name:"show",rawName:"v-show",value:!t.editing,expression:"!editing"}]},[i("div",{staticClass:"row"},[i("div",{staticClass:"col-6 col-sm"},[i("span",{on:{click:function(e){t.editing=!0}}},[t._v(t._s(t.item.title))])]),t._v(" "),i("div",{staticClass:"col-6 col-sm"},[i("span",{on:{click:function(e){t.editing=!0}}},[i("currency",{attrs:{number:t.item.price}})],1)]),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:"RETIREMENT"===t.goal,expression:"goal === 'RETIREMENT'"}],staticClass:"col-6 col-sm"},[i("toggle-button",{attrs:{value:!0,width:75,labels:{checked:"monthly",unchecked:"once"}},on:{change:t.toggleMonthly}})],1),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:!t.isMonthly&&"RETIREMENT"===t.goal,expression:"!isMonthly && goal === 'RETIREMENT'"}],staticClass:"col-6 col-sm"},[i("span",[i("currency",{attrs:{number:t.once}})],1)]),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.isMonthly&&"RETIREMENT"===t.goal,expression:"isMonthly && goal === 'RETIREMENT'"}],staticClass:"col-6 col-sm"},[i("span",[i("currency",{attrs:{number:t.monthly}})],1)]),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:"DEBT"===t.goal,expression:"goal === 'DEBT'"}],staticClass:"col-6 col-sm"},[i("span",[t._v(t._s(t.payoffCost)+" days")])]),t._v(" "),i("div",{staticClass:"col-1"},[i("i",{staticClass:"fa fa-times-circle remove",attrs:{"aria-hidden":"true"},on:{click:t.removeItem}})])])]),t._v(" "),i("form",{directives:[{name:"show",rawName:"v-show",value:t.editing,expression:"editing"}],on:{submit:function(e){e.preventDefault(),t.doneEdit(e)}}},[i("div",{staticClass:"row"},[i("div",{staticClass:"col"},[i("b-form-input",{on:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13)?void t.doneEdit(e):null}},model:{value:t.item.title,callback:function(e){t.item.title=e},expression:"item.title"}})],1),t._v(" "),i("div",{staticClass:"col"},[i("b-form-input",{on:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13)?void t.doneEdit(e):null}},model:{value:t.item.price,callback:function(e){t.item.price=e},expression:"item.price"}})],1),t._v(" "),i("div",{staticClass:"col"},[i("span",[i("currency",{attrs:{number:t.once}})],1)]),t._v(" "),i("div",{staticClass:"col"},[i("span",[i("currency",{attrs:{number:t.monthly}})],1)]),t._v(" "),i("div",{staticClass:"col"},[i("b-button",{attrs:{variant:"primary",type:"submit"}},[t._v("Save")])],1)])])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("b-card",{staticClass:"category",attrs:{"show-header":"","show-footer":""}},[i("div",{slot:"header"},[i("span",{directives:[{name:"show",rawName:"v-show",value:!t.editing,expression:"!editing"}],on:{click:function(e){t.editing=!0}}},[t._v(t._s(t.category.title)+": "),i("currency",{attrs:{number:t.items_total}})],1),t._v(" "),i("form",{directives:[{name:"show",rawName:"v-show",value:t.editing,expression:"editing"}],on:{submit:function(e){e.preventDefault(),t.doneEdit(e)}}},[i("div",{staticClass:"row"},[i("div",{staticClass:"col"},[i("b-form-input",{on:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13)?void t.doneEdit(e):null}},model:{value:t.category.title,callback:function(e){t.category.title=e},expression:"category.title"}})],1),t._v(" "),i("div",{staticClass:"col"},[i("b-button",{attrs:{variant:"primary",type:"submit"}},[t._v("Save")])],1)])])]),t._v(" "),i("b-list-group",[i("transition-group",{attrs:{name:"item",tag:"div"}},t._l(t.category.items,function(e){return i("Item",{key:e,attrs:{item:e,goal:t.goal}})})),t._v(" "),i("b-list-group-item",[i("form",{on:{submit:function(e){e.preventDefault(),t.addItem(e)}}},[i("div",{staticClass:"row"},[i("div",{staticClass:"col"},[i("b-form-input",{attrs:{placeholder:"Item name"},on:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13)?void t.addItem(e):null}},model:{value:t.item_title,callback:function(e){t.item_title=e},expression:"item_title"}})],1),t._v(" "),i("div",{staticClass:"col"},[i("b-input-group",{attrs:{left:"$"}},[i("b-form-input",{attrs:{placeholder:"amount"},on:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13)?void t.addItem(e):null}},model:{value:t.item_price,callback:function(e){t.item_price=e},expression:"item_price"}})],1)],1),t._v(" "),i("div",{staticClass:"col"},[i("b-button",{attrs:{variant:"success",type:"submit"}},[i("i",{staticClass:"fa fa-plus-circle",attrs:{"aria-hidden":"true"}}),t._v("     Add Item")])],1)])])])],1),t._v(" "),i("small",{staticClass:"text-muted",slot:"footer"},[i("b-button",{attrs:{variant:"danger"},on:{click:t.removeCategory}},[i("i",{staticClass:"fa fa-minus-circle",attrs:{"aria-hidden":"true"}}),t._v("     Remove Category")])],1)],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("span",{staticClass:"currency"},[t._v("$"+t._s(t._f("currency")(t.animatedNumber)))])},staticRenderFns:[]}}]);
//# sourceMappingURL=app.09d01f3926dcd9bc04bf.js.map