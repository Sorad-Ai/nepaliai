import { useEffect } from 'react';

const NavigationScript = () => {
  useEffect(() => {
    const nav = document.querySelector(".nav");
    const navOpenBtn = document.querySelector(".navOpenBtn");
    const navCloseBtn = document.querySelector(".navCloseBtn");
    

    if (navOpenBtn) {
      navOpenBtn.addEventListener("click", () => {
        if (nav) {
          nav.classList.add("openNav");
          nav.classList.remove("openSearch");
        }
      });
    }

    if (navCloseBtn) {
      navCloseBtn.addEventListener("click", () => {
        if (nav) {
          nav.classList.remove("openNav");
        }
      });
    }

    // Cleanup listeners on component unmount
    return () => {
      if (navOpenBtn) {
        navOpenBtn.removeEventListener("click", () => {});
      }
      if (navCloseBtn) {
        navCloseBtn.removeEventListener("click", () => {});
      }
    };
  }, []);

  return null; // This component only handles script, so no render output
};

export default NavigationScript;
