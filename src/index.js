import "./styles/style.css";
import {
  initBasicMap,
  initClusterMap,
  initJsonMap,
  eqfeed_callback,
} from "./scripts/maps";

// const hello = () => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => resolve("Hello World"), 2000);
//   });
// };

// async function lazyLoadExample() {
//   const { lazyLoad } = await import("./scripts/lazy-load-example");
//   lazyLoad().then((res) => console.log(res));
// }

// hello().then((value) => console.log(value));
// document.querySelector("#lazy-load").addEventListener("click", lazyLoadExample);

window.initMap = initBasicMap;
// window.initMap = initClusterMap;
// window.initMap = initJsonMap;
// window.eqfeed_callback = eqfeed_callback;

const modals = document.querySelectorAll("[data-modal]");

modals.forEach(function (trigger) {
  trigger.addEventListener("click", function (event) {
    event.preventDefault();
    const modal = document.getElementById(trigger.dataset.modal);
    modal.classList.add("open");
    const exits = modal.querySelectorAll(".modal-exit");
    exits.forEach(function (exit) {
      exit.addEventListener("click", function (event) {
        event.preventDefault();
        modal.classList.remove("open");
      });
    });
  });
});
