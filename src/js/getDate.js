window.addEventListener("DOMContentLoaded", () => {
  let visitCount = localStorage.getItem("visitCount")
    ? parseInt(localStorage.getItem("visitCount"), 10)
    : 0;
  visitCount++;
  localStorage.setItem("visitCount", visitCount);

  const visitText = `Wow!  This is your ${visitCount} ${visitCount === 1 ? "time" : "times"} visiting the website.`;
  document.getElementById("visit-count").textContent = visitText;
});

const today = new Date();
const currentYear = today.getFullYear();

const yearElem = document.querySelector(".year");
yearElem.textContent = currentYear;
