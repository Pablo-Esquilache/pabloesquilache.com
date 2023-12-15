

export function activeMenu() {
    const url = location.href;
    const links = document.querySelectorAll("#nav-responsive li a");
  
    links.forEach((link) => {
      if (link.href === url) {
        link.classList.add("active");
      }
    });
  }
  