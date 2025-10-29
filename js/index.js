document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".stat p");
  const duration = 15000; // 5 seconds
  const frameRate = 60;  // 60 frames per second
  let started = false;   // to prevent re-triggering

  const startCounting = () => {
    if (started) return;
    started = true;

    counters.forEach(counter => {
      const target = +counter.textContent.replace(/,/g, "");
      counter.textContent = "0";
      let current = 0;
      const increment = target / (duration / (1000 / frameRate));

      const updateCounter = () => {
        current += increment;
        if (current >= target) {
          counter.textContent = target.toLocaleString();
        } else {
          counter.textContent = Math.floor(current).toLocaleString();
          requestAnimationFrame(updateCounter);
        }
      };

      requestAnimationFrame(updateCounter);
    });
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startCounting();
        observer.disconnect(); // stop observing once triggered
      }
    });
  }, { threshold: 0.3 }); // triggers when 30% of the section is visible

  const statsSection = document.querySelector(".stats");
  if (statsSection) observer.observe(statsSection);
});