window.addEventListener("DOMContentLoaded", () => {
  const modeList = document.querySelector(".mode-list");
  const modeInputs = modeList.querySelectorAll("input");
  const body = document.querySelector("body");
  const upperNav = document.querySelector(".upper-nav");
  const lowerNav = document.querySelector(".lower-nav");
  const headerLinks = document.querySelectorAll("header a");
  const upperList = document.querySelector("#upper-list");
  const lowerList = document.querySelector("#lower-list-1");
  const fontList = document.querySelector(".font-list");
  const fontInputs = fontList.querySelectorAll("input");
  const menuBtn = document.querySelectorAll(".menu-btn");
  const toggleList = document.querySelectorAll(".toggle-list");
  const nextLink = document.querySelector(".next-link");
  const topLink = document.querySelector(".top-link");
  const heroSection = document.querySelector(".hero-section");
  const scrollCta = document.querySelectorAll(".scroll-cta");
  const mainContent = document.getElementById("main-content");
  const hero = document.getElementById("hero");
  const mode = localStorage.getItem("mode");
  const font = localStorage.getItem("font");
  const closeBtn = document.querySelector(".close-btn");

  //   Variable => enable dark
  const enableDark = () => {
    document.querySelectorAll(".default-icon").forEach((defaultIcon) => {
      defaultIcon.hidden = true;
    });
    document.querySelectorAll(".dark-icon").forEach((darkIcon) => {
      darkIcon.hidden = false;
    });
    body.classList.add("dark-mode");
    lowerNav.classList.add("dark-mode");
    upperNav.classList.add("dark-mode");
  };
  //   Variable => disable dark
  const disableDark = () => {
    document.querySelectorAll(".default-icon").forEach((defaultIcon) => {
      defaultIcon.hidden = false;
    });
    document.querySelectorAll(".dark-icon").forEach((darkIcon) => {
      darkIcon.hidden = true;
    });
    body.classList.remove("dark-mode");
    lowerNav.classList.remove("dark-mode");
    upperNav.classList.remove("dark-mode");
  };
  //   Variable => close menus
  const closeMenus = () => {
    toggleList.forEach((list) => {
      if (list.getAttribute("aria-expanded") == "true") {
        list.setAttribute("aria-expanded", "false");
        list.hidden = "true";
      }
    });
  };

  // Local Storage (Mode)
  if (mode) {
    modeInputs.forEach((input) => {
      const inputId = input.getAttribute("id");
      if (inputId == mode) {
        input.checked = true;
      }
      if (mode == "dark") {
        enableDark();
      }
    });
  } else {
    localStorage.setItem("mode", "mode-default");
    document.getElementById("mode-default").checked = true;
  }

  // Local Storage (Font)
  if (font) {
    fontInputs.forEach((input) => {
      const inputId = input.getAttribute("id");
      if (inputId == font) {
        input.checked == true;
      }
      if (font == "font-large") {
        document.getElementById(font).checked = true;
        body.classList.add("font-large");
        body.classList.remove("font-xl");
      } else if (font == "font-xl") {
        document.getElementById(font).checked = true;
        body.classList.add("font-xl");
        body.classList.remove("font-large");
      } else {
        document.getElementById("font-default").checked = true;
        body.classList.remove("font-xl");
        body.classList.remove("font-large");
      }
    });
  } else {
    document.getElementById("font-default").checked = true;
    localStorage.setItem("font", "font-default");
  }

  // Event Listener (Change - Mode)
  modeInputs.forEach((input) => {
    input.addEventListener("change", (event) => {
      const targetId = event.currentTarget.getAttribute("id");
      if (targetId === "dark") {
        localStorage.setItem("mode", "dark");
        enableDark();
      } else {
        localStorage.setItem("mode", "mode-default");
        disableDark();
      }
    });
  });

  // Event Listener (Change - Mode)
  fontInputs.forEach((input) => {
    input.addEventListener("change", (event) => {
      const targetId = event.currentTarget.getAttribute("id");
      if (targetId === "font-large") {
        localStorage.setItem("font", "font-large");
        body.classList.add("font-large");
        body.classList.remove("font-xl");
      } else if (targetId === "font-xl") {
        localStorage.setItem("font", "font-xl");
        body.classList.add("font-xl");
        body.classList.remove("font-large");
      } else {
        localStorage.setItem("font", "font-default");
        body.classList.remove("font-xl");
        body.classList.remove("font-large");
      }
    });
  });

  // Event Listener (Clicking link closes menu)
  headerLinks.forEach((link) => {
    link.addEventListener("click", () => {
      upperList.hidden = true;
      upperList.setAttribute("aria-expanded", "false");
      lowerList.hidden = true;
      lowerList.setAttribute("aria-expanded", "false");
    });
  });

  // Event Listener (Click - toggle menu)
  menuBtn.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const ariaControls = event.currentTarget.getAttribute("aria-controls");
      const controlledAria = document.getElementById(ariaControls);
      const ariaExpanded = controlledAria.getAttribute("aria-expanded");
      if (ariaExpanded === "false") {
        toggleList.forEach((list) => {
          list.hidden = true;
          list.setAttribute("aria-expanded", "false");
        });
        controlledAria.hidden = false;
        controlledAria.setAttribute("aria-expanded", "true");
      } else {
        controlledAria.hidden = true;
        controlledAria.setAttribute("aria-expanded", "false");
      }
    });
  });

  //   Event Listener (Scroll - Back to top link)
  window.addEventListener("scroll", () => {
    closeMenus();
    if (window.scrollY > heroSection.clientHeight / 1.25) {
      nextLink.hidden = true;
      topLink.hidden = false;
    } else {
      nextLink.hidden = false;
      topLink.hidden = true;
    }
  });

  //   Event Listener (Click - fixes scroll height on scroll cta)
  // scrollCta.forEach((cta) => {
  //   cta.addEventListener("click", (event) => {
  //     event.preventDefault();
  //     const id = event.currentTarget.getAttribute("href").slice(1);
  //     const element = document.getElementById(id);
  //     const navHeight = upperNav.getBoundingClientRect().height;
  //     let position = element.offsetTop - navHeight;
  //     window.scrollTo({
  //       left: 0,
  //       top: position,
  //     });
  //   });
  // });

  //   Event Listener (Click - main content closes all menus)
  mainContent.addEventListener("click", () => {
    closeMenus();
  });

  //   Event Listener (Click - main content closes all menus)
  hero.addEventListener("click", () => {
    closeMenus();
  });
  
  closeBtn.addEventListener("click", () => {
    closeMenus();
  })
});
