import { set_contacts } from "./set_contacts.js";

const FORM = document.getElementById("form");

export const formContact = () => {
  FORM.addEventListener("submit", (e) => {
    e.preventDefault();
    let name = document.getElementById("name").value;
    let email = document.getElementById("mail").value;
    let affair = document.getElementById("asunto").value;

    set_contacts(name, email, affair);
  });
};
