document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("navbar").innerHTML = `
    <nav class="nav-container">
      <div class="logo">
        <img src="/DIGA3008A-prep-site/images/hand-gun-logo.png" alt="Zombie Survival Logo">
      </div>
      <ul class="nav-links">
        <li><a href="/DIGA3008A-prep-site/index.html">Home</a></li>
        <li><a href="/DIGA3008A-prep-site/survival-kits/survival-kits.html">Survival Kits</a></li>
        <li><a href="/DIGA3008A-prep-site/guides/guides.html">Guides</a></li>
        <li><a href="/DIGA3008A-prep-site/lore/lore.html">Lore</a></li>
        <li><a href="/DIGA3008A-prep-site/contact/contact.html">Contact</a></li>
      </ul>
      <button class="burger" id="burger">☰</button>
    </nav>
  `;

  // Burger toggle for mobile
  const burger = document.getElementById("burger");
  burger.addEventListener("click", () => {
    document.querySelector(".nav-links").classList.toggle("nav-open");
  });
});