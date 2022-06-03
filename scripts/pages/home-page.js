// import Expenses from "../components/expenses.js";
// import Profile from "../components/profile.js";
import DOMHandler from "../dom-handler.js";
import STORE from "../store.js";
import { logout } from "../services/sessions-service.js"
import LoginPage from "./login-page.js";

function renderDo(toDos) {
  return `<br>
<p>${toDos.map((todo)=>
   `
  <div class="each--do">
    <div class="width-280">
      <input type="checkbox" id="cb-complete" name="cb-complete" value="cbComplete" ${todo.completed? "checked":""}>
      <label for="cb-complete">  ${todo.title}</label><br>
      <span class="due-date"> ${todo.due_date}<span>
    </div>
    <div>  
    <img src=${todo.completed&&todo.important? "assets/icons/important_soso.svg":
    (todo.important?"assets/icons/important_red.svg":"assets/icons/important_gray.svg")
    }>
    </div> 
  </div>
  `
  ).join("")}</p>

  `;

}

function render() {
  const currenTab = STORE.currenTab

  return `
    <main class="section">
      <section class="container-s">
        <a class="text-center block mb-8 js-logout">Logout</a>

        <div>
          <div class=" flex justify-between">
            <label for="optSort">Sort:</label>
            <select  class=" select__input" name="optSort" id="cars">
              <option value="btn-alphabetical" ${STORE.sort==0?"selected":""}>Alphabetical (a-z)</option>
              <option value="btn-dueDate" ${STORE.sort==1?"selected":""}>Due date</option>
              <option value="btn-mportance" ${STORE.sort==2?"selected":""}>Importance</option>
            </select>
          </div>
          <br><br>

          <div class="checkbox__text-container">
            <span> Show </span>

            <input class="checkbox" type="checkbox" id="cb-onlyPending" name="cb-onlyPending" value="onlyPending">
            <label for="cb-onlyPending"> Only Pending</label><br>

            <input class="checkbox" type="checkbox" id="cb-onlyImportant" name="cb-onlyImportant" value="onlyImportant">
            <label for="cb-onlyImportant"> Only important</label><br>
          </div>
          <br>

          <div class="container--do">

            <div class="each--do">
              <div>
                <input type="checkbox" id="cb-complete" name="cb-complete" value="cbComplete">
                <label for="cb-complete"> Complete assigments</label><br>
              </div>  
              <img src="assets/icons/important_red.svg">
            </div>  
            
            ${STORE.toDos_sorted?renderDo(STORE.toDos):renderDo(STORE.toDos_sorted)}

            ${STORE.sort==0?renderDo(STORE.toDos_sorted):"sorpresa"}

          </div>

        </div>
        
        </div>
      </section>
    </main>
  `;
}

// function listenNavigation() {
//   const navigation = document.querySelector(".js-navigation")
//   console.log(navigation)
//   navigation.addEventListener("click", event => {
//     event.preventDefault()
//     const { tab } = event.target.dataset

//     if(!tab) return;

//     STORE.currenTab = tab;
//     DOMHandler.reload()
//   })
// }

function listenSelect() {
  const a = document.querySelector(".select__input") // Capturar
  // Agregar evento
  a.addEventListener("click", async (event) => {
    // =>> que hago con esto?
    event.preventDefault();
    console.dir(event.path[0].options.selectedIndex)
    STORE.sort=+event.path[0].options.selectedIndex
    await STORE.fetchToDos_sorted()
    console.log(STORE.toDos_sorted)
    try {
      DOMHandler.reload(this);
    } catch (error) {
      console.log(error.message);
    }
  })
}


function listenLogout() {
  const a = document.querySelector(".js-logout") // Capturar
  // Agregar evento
  a.addEventListener("click", async (event) => {
    // =>> que hago con esto?
    event.preventDefault();

    try {
      await logout();
      DOMHandler.load(LoginPage);
    } catch (error){
      console.log(error.message);
    }
  })
}

const HomePage = {
  toString() {
    return render()
  },
  addListeners() {
    // listenNavigation(this);
    listenLogout();
    listenSelect();

    // if(["expense", "income"].includes(STORE.currenTab)) Expenses.addListeners();
    // if (STORE.currenTab === "profile") Profile.addListeners();
  }
}

export default HomePage;


// <a class="button button--subtle ${ currenTab === "expense" ? "activeTab" : ""}" data-tab="expense">Expense</a>
//           <a class="button button--subtle ${ currenTab === "income" ? "activeTab" : ""}" data-tab="income">Income</a>
//           <a class="button button--subtle ${ currenTab === "profile" ? "activeTab" : ""}" data-tab="profile">Profile</a>


//           ${currenTab === "expense" ? Expenses : ""}
//           ${currenTab === "income" ? Expenses : ""}
//           ${currenTab === "profile" ? Profile : ""}