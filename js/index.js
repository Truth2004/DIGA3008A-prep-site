document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const counters = document.querySelectorAll(".stat p");

  counters.forEach(counter => {
    const target = +counter.textContent.replace(/,/g, "");
    counter.textContent = "0";

    gsap.fromTo(counter, 
      { innerText: 0 },
      { 
        innerText: target,
        duration: 10, // animation speed
        ease: "power2.out",
        snap: { innerText: 1 }, // ensures whole numbers
        scrollTrigger: {
          trigger: counter,
          start: "top 80%", // when 80% of viewport reaches the stat
          toggleActions: "play none none none"
        },
        onUpdate: function() {
          counter.textContent = Math.floor(counter.innerText).toLocaleString();
        }
      }
    );
  });
});

document.addEventListener("DOMContentLoaded", () => {
  gsap.fromTo(
    ".hero-content *",
    { opacity: 0, y: 150 },
    { 
      opacity: 1, 
      y: 0, 
      duration: 1.5, 
      ease: "power3.out", 
      stagger: 0.25 // delays each element slightly
    }
  );
});