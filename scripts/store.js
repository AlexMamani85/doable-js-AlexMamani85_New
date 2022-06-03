// import { getCategories } from "./services/categories-services.js"
import { getTodos } from "./services/todos-services.js"

async function fetchTodos() {
  const toDos = await getTodos()
  this.toDos=toDos

  
}

async function fetchCategories() {
  // const categories = await getCategories()
  // this.income = categories.filter( category => category.transaction_type === "income");
  // this.expense = categories.filter( category => category.transaction_type === "expense");
}

function currentCategories(){
  return this[this.currenTab]

  // if (STORE.currenTab === "income") {
  //   STORE.income
  // } else  {
  //   STORE.expense
  // }

  // return STORE[this.expense]
  // return this[this.currenTab]
}

function deleteCategory(id) {
  if(this.currenTab == "expense") {
    this.expense = this.expense.filter( category => category.id != id );
  }
  if(this.currenTab == "income") {
    this.income = this.income.filter( category => category.id != id );
  }
}

const STORE = {
  user: null,
  income: [],
  expense: [],
  toDos: [],
  currenTab: "expense",
  fetchTodos,
  fetchCategories,
  currentCategories,
  deleteCategory
};

export default STORE;