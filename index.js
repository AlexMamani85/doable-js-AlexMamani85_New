import DOMHandler from "./scripts/dom-handler.js";
import HomePage from "./scripts/pages/home-page.js";
import LoginPage from "./scripts/pages/login-page.js";
import { getUser } from "./scripts/services/users-service.js";
import { tokenKey } from "./scripts/config.js";
import STORE from "./scripts/store.js";

async function init() {
  try{
    const token = sessionStorage.getItem(tokenKey)
  
    if(!token) throw new Error()
  
    const user = await getUser()
    STORE.user = user

    // await STORE.fetchCategories();
    DOMHandler.load("<h1>HomePage</h1>")//HomePage
  } catch(error) {
    sessionStorage.removeItem(tokenKey);
    DOMHandler.load(LoginPage)//LoginPage
  }
}

init()
