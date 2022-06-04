// import { getCategories } from "./services/categories-services.js"
import { getTodos } from "./services/todos-services.js"





const sortByYear = (a,b) => a["due_date"].slice(0,3) - b["due_date"].slice(0,3)

const sortByTitle = (a, b) => {
  var textA = a.title.toUpperCase();
  var textB = b.title.toUpperCase();
  return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
}

const sortByImportant = (a, b) => {
  var textA = a.important;
  var textB = b.important;
  return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
}

async function fetchToDos_sorted() {
  const toDos = await getTodos()
  this.toDos=toDos

  this.toDos_sorted = STORE.sort==0?toDos.sort(sortByTitle): 
                  STORE.sort==1?toDos.sort(sortByYear):toDos.sort(sortByImportant);

  // let a = toDos.sort(sortByTitle);  //ok ok ok 
  // let sorted2 = toDos.sort(sortByYear) //ok ok ok 
  // console.log(toDos.sort(sortByImportant))  //ok ok ok 

}

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
  toDos_sorted: [],
  sort:0, //"alphabetical", "due date", "importance"
  showOnlyPending: false, // "only pending"
  showOnlyImportant: false, // "only important"
  currenTab: "expense",
  fetchToDos_sorted,
  fetchTodos,
  fetchCategories,
  currentCategories,
  deleteCategory

};

export default STORE;