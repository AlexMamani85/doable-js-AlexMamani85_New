import { input } from "../components/input.js";
import { login } from "../services/sessions-service.js"
import { signup } from "../services/sessions-service.js"
import DOMHandler from "../dom-handler.js";
import HomePage from "./home-page.js"
import STORE from "../store.js";
import LoginPage from "./login-page.js";

function render() {
  // const { loginError } = this.state; //venia de antes
  const { signUpError } = SignUpPage.state;

  return `
    <main class="section">
      <section class="container-s">
        <h1 class="heading heading--lg text-center mb-4">Sign Up</h1>
        <form class="flex flex-column gap-4 mb-4 js-signup-form">

          ${input({
            label: "email",
            id: "email",
            type: "email",
            placeholder: "nosoydiego@gmail.com",
            required: true,
            value: "alex111@mail.com"
          })}

          ${input({
            label: "password",
            id: "password",
            type: "password",
            placeholder: "******",
            required: true,
            value: "123456"
          })}

          ${signUpError ? 
            `<p class="text-center error-300">${signUpError}</p>`: ''
          }

          <button class="button button--primary">Sign Up</button>
        </form>
        <a href="#" class="block text-center js-login-link">Log in</a>
      </section>
    </main>
  `;
}


const SignUpPage = {
  toString() {
    // return render.call(this)
    return render()
  },
  addListeners() {
    listenLogIn(this),
    listenSubmitForm(this)
  },
  state: {
    signUpError: null,
  }
}

///CAMBIAR------///CAMBIAR------///CAMBIAR------///CAMBIAR------

function listenLogIn(that) {
  const form =  document.querySelector(".js-login-link")

  form.addEventListener("click", async (event) => {

    try {
      event.preventDefault();
  
      DOMHandler.load(LoginPage)
    } catch (error) {
      
      // console.dir(error.message)  
      // console.dir(this.state)  
      // console.dir(that)  
      that.state.loginError = error.message
      LoginPage.state.loginError = error.message
      DOMHandler.reload()
    }
  })
}



function listenSubmitForm(that) {
  const form =  document.querySelector(".js-signup-form")

  form.addEventListener("submit", async (event) => {
    try {
      event.preventDefault();
  
      const { email, password } = event.target;
  
      const credentials = {
        email: email.value,
        password: password.value,
      }
  
      const user = await signup(credentials)
      STORE.user = user
      // console.log(STORE)


      await STORE.fetchTodos()
      DOMHandler.load(HomePage)
    } catch (error) {
      
      // console.dir(error.message)  
      // console.dir(this.state)  
      // console.dir(that)  
      that.state.signUpError = error.message
      SignUpPage.state.signUpError = error.message
      DOMHandler.reload()
    }
  })
}


export default SignUpPage;