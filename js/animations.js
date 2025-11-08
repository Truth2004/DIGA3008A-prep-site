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


document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // Initial state
  gsap.set(".blog-card", { autoAlpha: 0, x: -150, willChange: "opacity, transform" });

  // Scroll-triggered batch animation
  ScrollTrigger.batch(".blog-card", {
    interval: 0.05, // more frequent batching for smoother feel
    start: "top 85%",
    end: "bottom 15%",
    onEnter: batch => gsap.to(batch, {
      autoAlpha: 1,
      x: 0,
      duration: 1.2,
      ease: "power4.out",
      stagger: 0.25
    }),
    onLeave: batch => gsap.to(batch, {
      autoAlpha: 0,
      x: -150,
      duration: 1,
      ease: "power4.in",
      stagger: 0.15
    }),
    onEnterBack: batch => gsap.to(batch, {
      autoAlpha: 1,
      x: 0,
      duration: 1.2,
      ease: "power4.out",
      stagger: 0.25
    }),
    onLeaveBack: batch => gsap.to(batch, {
      autoAlpha: 0,
      x: -150,
      duration: 1,
      ease: "power4.in",
      stagger: 0.15
    })
  });
});

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // Set initial state for all sections (invisible)
  gsap.set(".blog-content section", { autoAlpha: 0, y: 50, willChange: "opacity, transform" });

  ScrollTrigger.batch(".blog-content section", {
    start: "top 90%",   // trigger when section is near entering viewport
    end: "bottom 10%",  // trigger when section is near leaving viewport

    // scrolling down: fade in from bottom
    onEnter: batch => gsap.to(batch, {
      autoAlpha: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      stagger: 0.2
    }),

    // scrolling down: fade out upward
    onLeave: batch => gsap.to(batch, {
      autoAlpha: 0,
      y: -50,
      duration: 0.8,
      ease: "power3.in",
      stagger: 0.1
    }),

    // scrolling up: fade in from top
    onEnterBack: batch => gsap.to(batch, {
      autoAlpha: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      stagger: 0.2
    }),

    // scrolling up: fade out downward
    onLeaveBack: batch => gsap.to(batch, {
      autoAlpha: 0,
      y: 50,
      duration: 0.8,
      ease: "power3.in",
      stagger: 0.1
    })
  });
});
