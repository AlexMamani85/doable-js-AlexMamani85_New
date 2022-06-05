import { input } from "../components/input.js";
import { login } from "../services/sessions-service.js"

import DOMHandler from "../dom-handler.js";
import SignUpPage from "./signup-page.js"
import HomePage from "./home-page.js"
import STORE from "../store.js";

function render() {
  // const { loginError } = this.state; //venia de antes
  const { loginError } = LoginPage.state;

  return `
    <main class="section">
      <section class="container-s">
        <h1 class="heading heading--lg text-center mb-4">Login</h1>
        <form class="flex flex-column gap-4 mb-4 js-login-form">

          ${input({
            label: "email",
            id: "email",
            type: "email",
            placeholder: "nosoydiego@gmail.com",
            required: true,
            value: "alex@mail.com"
          })}

          ${input({
            label: "password",
            id: "password",
            type: "password",
            placeholder: "******",
            required: true,
            value: "123456"
          })}

          ${loginError ? 
            `<p class="text-center error-300">${loginError}</p>`: ''
          }

          <button class="button button--primary ">Login</button>
        </form>
        <a href="#" class="block text-center js-signup-link">Create account</a>
      </section>
    </main>
  `;
}


const LoginPage = {
  toString() {
    // return render.call(this)
    return render()
  },
  addListeners() {
    // listenSubmitForm.call(this)
    listenSignUp(this),
    listenSubmitForm(this)
  },
  state: {
    loginError: null,
  }
}


// js-signup-link

function listenSignUp(that) {
  const form =  document.querySelector(".js-signup-link")

  form.addEventListener("click", async (event) => {

    try {
      event.preventDefault();

      DOMHandler.load(SignUpPage)
    } catch (error) {
      
      that.state.loginError = error.message
      LoginPage.state.loginError = error.message
      DOMHandler.reload()
    }
  })
}




function listenSubmitForm(that) {
  const form =  document.querySelector(".js-login-form")

  form.addEventListener("submit", async (event) => {
    try {
      event.preventDefault();
  
      const { email, password } = event.target;
  
      const credentials = {
        email: email.value,
        password: password.value,
      }
  
      const user = await login(credentials)
      STORE.user = user

      await STORE.fetchToDos_sorted()
      DOMHandler.load(HomePage)
    } catch (error) {
      

      that.state.loginError = error.message
      LoginPage.state.loginError = error.message
      DOMHandler.reload()
    }
  })
}


export default LoginPage;