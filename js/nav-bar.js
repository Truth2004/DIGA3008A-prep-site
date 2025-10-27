document.getElementById("navbar").innerHTML = `
  <nav class="nav-container">
    <div class="logo">
      <img src="images/logo.png" alt="Zombie Survival Logo">
    </div>
    <ul class="nav-links">
      <li><a href="index.html">Home</a></li>
      <li><a href="kits.html">Survival Kits</a></li>
      <li><a href="guides.html">Guides</a></li>
      <li><a href="lore.html">Lore</a></li>
      <li><a href="contact.html">Contact</a></li>
    </ul>
    <button class="burger" id="burger">☰</button>
  </nav>
`;

// Burger toggle for mobile
const burger = document.getElementById("burger");
burger.addEventListener("click", () => {
  document.querySelector(".nav-links").classList.toggle("nav-open");
});