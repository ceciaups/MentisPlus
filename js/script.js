window.onload = function() {
  let choice = document.getElementsByClassName("filter-choice");
  for (let i = 0; i < choice.length; i++) {
    choice[i].addEventListener('click', toggleChoice);
  }
}

var filters = [];

function toggleFilter() {
  let filter = document.getElementById("support-filter");
  filter.classList.toggle("filter-show");
}

function cancelFilter() {
  toggleFilter();

  // switch the choices back
  let choice = document.getElementsByClassName("filter-choice");
  for (let i = 0; i < choice.length; i++) {
    if (filters.includes(i)) {
      if (!choice[i].classList.contains("filter-checked")) {
        choice[i].classList.add("filter-checked");
      }
    }
    else {
      if (choice[i].classList.contains("filter-checked")) {
        choice[i].classList.remove("filter-checked");
      }
    }
  }
}

function saveFilter() {
  // save the choices
  filters = [];
  let choice = document.getElementsByClassName("filter-choice");
  for (let i = 0; i < choice.length; i++) {
    if (choice[i].classList.contains("filter-checked")) {
      filters.push(i);
    }
  }
  toggleFilter();
}

function toggleChoice() {
  this.classList.toggle("filter-checked");
}