const form = document.getElementById("contactForm");
const inputs = form.querySelectorAll("input, textarea");
const formStatus = document.getElementById("formStatus");

function showFeedback(input, message, isValid) {
  const feedback = input.parentElement.querySelector(".feedback");
  if (isValid) {
    feedback.textContent = "Looks good!";
    feedback.className = "feedback success";
    input.classList.add("success-state");
    input.classList.remove("error-state");
  } else {
    feedback.textContent = message;
    feedback.className = "feedback error";
    input.classList.add("error-state");
    input.classList.remove("success-state");
  }
}

function validateInput(input) {
  let valid = false;
  const value = input.value.trim();

  if (input.id === "name") {
    valid = value.length >= 2;
    showFeedback(input, valid ? "" : "Name must be at least 2 characters.", valid);
  } 
  else if (input.id === "email") {
 
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    valid = regex.test(value);
    showFeedback(input, valid ? "" : "Enter a valid email address.", valid);
  } 
  else if (input.id === "message") {
    valid = value.length >= 10;
    showFeedback(input, valid ? "" : "Message must be at least 10 characters.", valid);
  }

  return valid;
}


inputs.forEach(input => {
  input.addEventListener("input", () => validateInput(input));
});


form.addEventListener("submit", e => {
  e.preventDefault();
  let allValid = true;

  inputs.forEach(input => {
    if (!validateInput(input)) allValid = false;
  });

  if (allValid) {
    formStatus.textContent = "✅ Message sent successfully!";
    formStatus.style.color = "#4caf50";
    form.reset();
    inputs.forEach(input => {
      input.classList.remove("success-state", "error-state");
      input.parentElement.querySelector(".feedback").textContent = "";
    });
  } else {
    formStatus.textContent = "⚠️ Please correct the highlighted errors.";
    formStatus.style.color = "#f44336";
  }
});

document.addEventListener("DOMContentLoaded", () => {

  const tl = gsap.timeline();

  tl.from(".contact-container", {
    opacity: 0,
    x: 200,
    duration: 1.8,
    ease: "power3.out"
  })
  .from(".form-group", {
    opacity: 0,
    x: 50,
    duration: 0.8,
    ease: "power3.out",
    stagger: 0.2
  }, "-=1.0") 
  .from(".submit-btn", {
    opacity: 0,
    y: 20,
    duration: 0.8,
    ease: "power3.out"
  }, "-=0.5"); 
});

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(MotionPathPlugin);

  gsap.to(".contact-flyer", {
    duration: 10,
    repeat: -1,
    ease: "power1.inOut",
    motionPath: {
      path: "#contactPath",
      align: "#contactPath",
      autoRotate: true,
      alignOrigin: [0.5, 0.5]
    }
  });
});
