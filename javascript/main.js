import { manejarNavegacionResponsive } from "./menu_resposive.js";
// import { slider } from './slider.js';
import { activeMenu } from "./active_menu.js";
import { scrollScreen } from "./scroll_screen.js";
import { sendEmail } from "./send_email.js";
import { formContact } from "./form_contact.js";

window.addEventListener("DOMContentLoaded", () => {
  manejarNavegacionResponsive();
  //slider();
  activeMenu();
  scrollScreen();
  sendEmail();
  formContact();
});
