export function scrollScreen() {
  const header = document.querySelector("#header");

  window.addEventListener("scroll", function () {
    const scrollValue = window.scrollY;
    const headerHeight = header.offsetHeight;

    if (scrollValue > headerHeight) {
      header.classList.add("scroll");
    } else {
      header.classList.remove("scroll");
    }
  });
}
