import { manejarNavegacionResponsive } from "./menu_resposive.js";
import { initializeSlider } from "./slider.js";
import { initializeSliderRespon } from "./slider_respon.js"
// import { activeMenu } from "./active_menu.js";
import { scrollScreen } from "./scroll_screen.js";
import { formContact } from "./form_contact.js";
import { sendEmail } from "./send_email.js";
// import { modal } from "./modal.js";

window.addEventListener("DOMContentLoaded", () => {
  manejarNavegacionResponsive();
  initializeSlider();
  initializeSliderRespon();
  // activeMenu();
  scrollScreen();
  // modal();
  formContact();
  sendEmail();
});
