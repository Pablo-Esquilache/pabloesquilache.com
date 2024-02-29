
export function modal() {

  const isQuienSoyPage = window.location.pathname.includes("sobre_mi.html");

  if (isQuienSoyPage) {
      const modal_container = document.getElementById("modal-container");
      const quiensoy_card1 = document.getElementById("quiensoy-card1");
      const quiensoy_card2 = document.getElementById("quiensoy-card2");
      const quiensoy_card3 = document.getElementById("quiensoy-card3");
      const quiensoy_h2_3 = document.getElementById("quiensoy-h2-3");
      const quiensoy_h2_2 = document.getElementById("quiensoy-h2-2");
      const quiensoy_h2_1 = document.getElementById("quiensoy-h2-1");
  
      quiensoy_h2_1.addEventListener("click", () => {
        modal_container.style.display = "flex";
        quiensoy_card1.style.display = "flex";
      });
  
      quiensoy_card1.addEventListener("click", () => {
        quiensoy_card1.style.display = "none";
        modal_container.style.display = "none";
      });
  
      quiensoy_h2_2.addEventListener("click", () => {
        modal_container.style.display = "flex";
        quiensoy_card2.style.display = "flex";
      });
  
      quiensoy_card2.addEventListener("click", () => {
        quiensoy_card2.style.display = "none";
        modal_container.style.display = "none";
      });
  
      quiensoy_h2_3.addEventListener("click", () => {
        modal_container.style.display = "flex";
        quiensoy_card3.style.display = "flex";
      });
  
      quiensoy_card3.addEventListener("click", () => {
        quiensoy_card3.style.display = "none";
        modal_container.style.display = "none";
      });
    }
  }
  