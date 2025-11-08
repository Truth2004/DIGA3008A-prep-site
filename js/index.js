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
        duration: 10, 
        ease: "power2.out",
        snap: { innerText: 1 },
        scrollTrigger: {
          trigger: counter,
          start: "top 80%",
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
      stagger: 0.25 
    }
  );
});