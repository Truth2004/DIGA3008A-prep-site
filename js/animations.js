document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // Initial state
  gsap.set(".kit-card", { opacity: 0, y: 150 });

  // Animate each card once
  ScrollTrigger.batch(".kit-card", {
    interval: 0.1,      // batch interval
    start: "top 90%",
    onEnter: batch => {
      gsap.to(batch, { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        ease: "power3.out", 
        stagger: 0.15 
      });
    },
    // Remove other callbacks so animation doesn't reverse
  });
});