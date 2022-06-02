// import Expenses from "../components/expenses.js";
// import Profile from "../components/profile.js";
import DOMHandler from "../dom-handler.js";
import STORE from "../store.js";
import { logout } from "../services/sessions-service.js"
import LoginPage from "./login-page.js";

function render() {
  const currenTab = STORE.currenTab
  return `
    <main class="section">
      <section class="container">
        <h1 class="heading heading--lg text-center mb-2">Expensable</h1>
        <a class="text-center block mb-8 js-logout">Logout</a>
        <div class="flex justify-between mb-8 js-navigation">
          
        </div>



      </section>
    </main>
  `;
}

function listenNavigation() {
  const navigation = document.querySelector(".js-navigation")

  navigation.addEventListener("click", event => {
    event.preventDefault()
    const { tab } = event.target.dataset

    if(!tab) return;

    STORE.currenTab = tab;
    DOMHandler.reload()
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
    listenNavigation();
    listenLogout();
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