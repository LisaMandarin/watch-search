window.addEventListener("DOMContentLoaded", () => {
  let visitCount = localStorage.getItem("visitCount")
    ? parseInt(localStorage.getItem("visitCount"), 10)
    : 0;
  visitCount++;
  localStorage.setItem("visitCount", visitCount);
  document.getElementById("visit-number").textContent = visitCount;
});

const today = new Date();
const currentYear = today.getFullYear();

const yearElem = document.querySelector(".year");
yearElem.textContent = currentYear;
