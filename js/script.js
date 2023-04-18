window.onload = function() {
  let choice = document.getElementsByClassName("filter-choice");
  for (let i = 0; i < choice.length; i++) {
    choice[i].addEventListener('click', toggleChoice);
    choice[i].id = i;
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
  
  // apply filter
  let support = document.getElementsByClassName("support-item");
  for (let i = 0; i < support.length; i++) {
    let isLocation = false;
    let isDate = false;
    let isCategory = false;

    // Location
    if (filters.some(filter => (filter >= 2 && filter < 4))) {
      let location = support[i].getElementsByClassName("support-location");
      let filter = filters.find(filter => (filter >= 2 && filter < 4));

      if (filter == 2) {
        if (location[0].innerText == "Remote") {
          isLocation = true;
        }
      }
      else if (filter == 3) {
        if (location[0].innerText == "On-site") {
          isLocation = true;
        }
      }
    }
    else {
      isLocation = true;
    }

    // Start Date
    let date = support[i].getElementsByClassName("support-date");
    // Date.now() is hard-coded to be April 15, 2023
    let today = 1681531200000;
    let filter = filters.find(filter => ( filter >= 4 && filter < 11 ) );
    date = Date.parse(date[0].innerHTML.substring(12));
    
    if (filter == 4) {
      isDate = true;
    }
    else {
      let diff = Math.ceil((date - today) / (1000 * 3600 * 24));
      if (filter == 5 && diff < 7) {
        isDate = true;
      }
      else if (filter == 6 && diff < 14) {
        isDate = true;
      }
      else if (filter == 7 && diff < 30) {
        isDate = true;
      }
      else if (filter == 8 && diff < 90) {
        isDate = true;
      }
      else if (filter == 9 && diff < 180) {
        isDate = true;
      }
      else if (filter == 10 && diff < 365) {
        isDate = true;
      }
    }

    // Category
    if (filters.some(filter => filter >= 11)) {
      for (let j = 0; j < filters.length; j++) {
        if (support[i].classList.contains(filters[j])) {
          isCategory = true;
          break;
        }
      }
    }
    else {
      isCategory = true;
    }

    if (isLocation && isDate && isCategory) {
      support[i].style.display = "block";
    }
    else {
      support[i].style.display = "none";
    }
  }

  toggleFilter();
}

function toggleChoice() {
  let choice = document.getElementsByClassName("filter-choice");
  // Sort By
  if (this.id >= 0 && this.id < 2) {
    for (let i = 0; i < 2; i++) {
      if (choice[i].classList.contains("filter-checked")) {
        choice[i].classList.remove("filter-checked");
      }
    }
    this.classList.add("filter-checked");
  }
  // Location
  else if (this.id >= 2 && this.id < 4) {
    for (let i = 2; i < 4; i++) {
      if (choice[i].classList.contains("filter-checked") && i != this.id) {
        choice[i].classList.remove("filter-checked");
      }
    }
    this.classList.toggle("filter-checked");
  }
  // Date Posted
  else if (this.id >= 4 && this.id < 11) {
    for (let i = 4; i < 11; i++) {
      if (choice[i].classList.contains("filter-checked")) {
        choice[i].classList.remove("filter-checked");
      }
    }
    this.classList.add("filter-checked");
  }
  // Location and Categories
  else {
    this.classList.toggle("filter-checked");
  }
}