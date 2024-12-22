import "../css/all.min.css";
import "../css/bootstrap.min.css";
import "../css/queries.css";
import "../css/style.css";

// Get the button
let mybutton = document.getElementById("myBtn");

// Initialize a variable to track scrolling status
let hasScrolled = false;

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  // Check if the user has scrolled more than 500px from the top
  if (
    document.body.scrollTop > 500 ||
    document.documentElement.scrollTop > 500
  ) {
    if (!hasScrolled) {
      // Show the button and start achievement counters
      mybutton.style.display = "block";
      achievmentCounter(achievmentElements[0], 8000, 200, 50);
      achievmentCounter(achievmentElements[1], 810, 50, 100);
      achievmentCounter(achievmentElements[2], 2000, 100, 80);
      achievmentCounter(achievmentElements[3], 20, 5, 150);
      hasScrolled = true;
    }
  } else {
    // Hide the button and reset the scrolling status
    mybutton.style.display = "none";
    hasScrolled = false;
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
}

// Select all achievement elements
const achievmentElements = document.querySelectorAll(
  ".section-achievments .text-box p"
);

// Log the achievement elements (optional debugging step)
console.log(achievmentElements);

// Achievement counter function
const achievmentCounter = (element, maxNum, counter, time) => {
  let i = 0;
  const interv = setInterval(() => {
    console.log("counting");
    i += counter;
    element.textContent = i;
    if (i >= maxNum) {
      element.textContent = maxNum; // Ensure it stops exactly at the max number
      clearInterval(interv);
    }
  }, time);
};

const form = document.querySelector(".section-contact .form");
const nameEl = document.querySelector("input#username");
const emailEl = document.querySelector("input#email");
const passwordEl = document.querySelector("input#password");
const textareaEl = document.querySelector(".form-control#textarea");

// Show error funciton
const showError = (element, message) => {
  if (element.parentElement.classList.contains("success")) {
    element.parentElement.classList.replace("success", "error");
    element.parentElement.nextElementSibling.textContent = message;
  } else {
    element.parentElement.classList.add("error");
    element.parentElement.nextElementSibling.textContent = message;
  }
};

// Show success function
const showSuccess = (element) => {
  if (element.parentElement.classList.contains("error")) {
    element.parentElement.classList.replace("error", "success");
  } else {
    element.parentElement.classList.add("success");
  }
};

// Check required fields
const checkRequired = (inputs) => {
  inputs.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
      return true;
    } else return false;
  });
};

// Check input length
const checkLength = (input, min, max) => {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} Characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} Characters`
    );
  } else {
    showSuccess(input);
  }
};

// Check email is valid
const checkEmail = (input) => {
  const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid");
  }
};

// Get field name
const getFieldName = (input) => {
  return input.id[0].toUpperCase() + input.id.slice(1);
};

// Event listener
form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkLength(nameEl, 3, 15);
  checkLength(textareaEl, 10, 500);
  checkLength(passwordEl, 6, 25);
  checkEmail(emailEl);
  checkRequired([nameEl, emailEl, passwordEl, textareaEl]);
});
