import { input } from "../components/input.js";

import DOMHandler from "../dom-handler.js";
import STORE from "../store.js";
import { logout } from "../services/sessions-service.js"
import LoginPage from "./login-page.js";
import { createTodo, updateTodo } from "../services/todos-services.js"


function renderDo(toDos) {
  return `<br>
<p>${toDos.map((todo)=>
   `
  <div class="each--do">
    <div class="width-280">
      <input type="checkbox"  class="checkbox-completed" id="${todo.id}" data="${todo.id}" name="cb-complete" value="cbComplete" ${todo.completed? "checked":""}>
      <label for="cb-complete">  ${todo.title}</label><br>
      <span class="due-date"> ${todo.due_date}<span>
    </div>
    <div>  
    <img class="js-images" data-ref="${todo.id}" src=${todo.completed&&todo.important? "assets/icons/important_soso.svg":
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
  STORE.hoy = new Date()
  return `  
    <header>
      <a class="text-center block mb-8 js-logout">Logout</a>
    </header>
    <main class="section">
      <section class="container-s height-600">


        <div>
          <div class=" flex justify-between">
            <label for="optSort">Sort:</label>
            <select  class=" select__input" name="optSort" id="cars">
              <option value="opt-alphabetical" ${STORE.sort==0?"selected":""}>Alphabetical (a-z)</option>
              <option value="opt-dueDate" ${STORE.sort==1?"selected":""}>Due date</option>
              <option value="opt-mportance" ${STORE.sort==2?"selected":""}>Importance</option>
            </select>
          </div>
          <br><br>

          <div class="checkbox__text-container">
            <span> Show </span>

            <input class="checkbox" type="checkbox" id="cb-onlyPending" name="cb-onlyPending" value="onlyPending" 
            ${STORE.showOnlyPending?"checked":""}>
            <label for="cb-onlyPending"> Only Pending</label><br>

            <input class="checkbox" type="checkbox" id="cb-onlyImportant" name="cb-onlyImportant" value="onlyImportant"
            ${STORE.showOnlyImportant?"checked":""}>
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

            ${STORE.showOnlyPending&&STORE.showOnlyImportant?renderDo(STORE.toDos_sorted.filter((x)=>x.completed==false).filter((x)=>x.important==true)):
              STORE.showOnlyImportant?renderDo(STORE.toDos_sorted.filter((x)=>x.important==true)):
              STORE.showOnlyPending?renderDo(STORE.toDos_sorted.filter((x)=>x.completed==false)):
              renderDo(STORE.toDos_sorted)}
          </div>
          <br>

          <form class="flex flex-column gap-4 mb-4 js-create-form">

          ${input({
            id: "title",
            type: "text",
            placeholder: "do the dishes...",
            required: true,
            value: ""
          })}

          ${input({
            id: "due_date",
            type: "date",
            placeholder: "dd/mm/yyyy",
            required: true,
            value:  (STORE.hoy).getFullYear()+"-"+
            ((STORE.hoy).getMonth()<10?"0"+(STORE.hoy).getMonth():+(STORE.hoy).getMonth())+"-"+
            ((STORE.hoy).getDay()<10?"0"+(STORE.hoy).getDay():+(STORE.hoy).getDay())
          })}



          <button class="button button--primary ">Add Task</button>
        </form>


          <div>


          </div>
        </div>
      </section>
    </main>
  `;
}




function listenSubmitForm(that) {
  const form =  document.querySelector(".js-create-form")

  form.addEventListener("submit", async (event) => {
    try {
      event.preventDefault();
      console.dir(event.target)
      const { title, due_date } = event.target;
      console.log(title, due_date)
      const valuesTodo = {
        title: title.value,
        due_date: due_date.value,
      }
  
      let a = await createTodo(valuesTodo)
      console.log(a)

      await STORE.fetchToDos_sorted()
      DOMHandler.load(HomePage)
    } catch (error) {
      
      console.log(error)
      that.state.loginError = error.message
      LoginPage.state.loginError = error.message
      DOMHandler.reload()
    }
  })
}


function listenSelect() {
  const a = document.querySelector(".select__input") 
  a.addEventListener("click", async (event) => {
    event.preventDefault();
    STORE.sort=+event.path[0].options.selectedIndex
    await STORE.fetchToDos_sorted()

    try {
      DOMHandler.reload(this);
    } catch (error) {
      console.log(error.message);
    }
  })
}

function listenOnlyPending() {
  const a = document.querySelector("#cb-onlyPending") 
  a.addEventListener("click", async (event) => {

    STORE.showOnlyPending=!STORE.showOnlyPending
    event.path[0].ownerDocument.activeElement.checked=!event.path[0].ownerDocument.activeElement.checked
    // STORE.sort=+event.path[0].options.selectedIndex
    await STORE.fetchToDos_sorted()
    try {

      DOMHandler.reload(this);

    } catch (error) {
      console.log(error.message);
    }
  })
}

function listenOnlyImportant() {
  const a = document.querySelector("#cb-onlyImportant") 
  a.addEventListener("click", async (event) => {
    STORE.showOnlyImportant=!STORE.showOnlyImportant

    await STORE.fetchToDos_sorted()

    try {
      DOMHandler.reload(this);
    } catch (error) {
      console.log(error.message);
    }
  })
}

{/* <div class="each--do">
<div class="width-280">
  <input type="checkbox" class="checkbox-completed" id="cb-complete" name="cb-complete" value="cbComplete" ${todo.completed? "checked":""}>
  <label for="cb-complete">  ${todo.title}</label><br> */}

//COMPLETED
function listenCompletedClick() {
  const checkboxesC = document.querySelectorAll(".checkbox-completed");
  checkboxesC.forEach((checkboxC) => {
    checkboxC.addEventListener("click", (e) => {
      e.preventDefault();
      e.target.checked=!e.target.checked //ok
      let checkboxId = +checkboxC.closest("input").id
      let valuesTodo=STORE.toDos_sorted.filter((x)=>x.id==checkboxId)[0]
      valuesTodo.completed=!valuesTodo.completed

      updateTodo(checkboxId,valuesTodo)
      try {
        DOMHandler.reload(this);
      } catch (error) {
        console.log(error.message);
      }

    });
  });
}


function listenImportantClick() {
  const imagesImportant = document.querySelectorAll(".js-images");
  imagesImportant.forEach((imageImportant) => {
    imageImportant.addEventListener("click", (e) => {
      e.preventDefault();
      let imageId = e.target.dataset.ref
      console.log(imageImportant.closest("img")) //html

      let valuesTodo=STORE.toDos_sorted.filter((x)=>x.id==imageId)[0]
      valuesTodo.important=!valuesTodo.important
      console.log(valuesTodo) // JSON
      updateTodo(imageId,valuesTodo)

      try {
        DOMHandler.reload(this);
      } catch (error) {
        console.log(error.message);
      }

    });
  });
}


function listenLogout() {
  const a = document.querySelector(".js-logout")
  a.addEventListener("click", async (event) => {
    event.preventDefault();
    
    try {
      console.log(await logout());
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
    listenLogout();
    listenSelect();
    listenOnlyPending();
    listenOnlyImportant();
    listenSubmitForm();
    listenCompletedClick();
    listenImportantClick();
    
  }
}

export default HomePage;

