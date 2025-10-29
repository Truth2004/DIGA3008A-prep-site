const pathPrefix = location.pathname.includes("/") && !location.pathname.endsWith("index.html") ? "../" : "";

document.getElementById("navbar").innerHTML = `
  <nav class="nav-container">
    <div class="logo">
      <img src="${pathPrefix}images/hand-gun-logo.png" alt="Zombie Survival Logo">
    </div>
    <ul class="nav-links">
      <li><a href="${pathPrefix}index.html">Home</a></li>
      <li><a href="${pathPrefix}survival-kits/survival-kits.html">Survival Kits</a></li>
      <li><a href="${pathPrefix}guides/guides.html">Guides</a></li>
      <li><a href="${pathPrefix}lore/lore.html">Lore</a></li>
      <li><a href="${pathPrefix}contact/contact.html">Contact</a></li>
    </ul>
    <button class="burger" id="burger">☰</button>
  </nav>
`;

const burger = document.getElementById("burger");
burger.addEventListener("click", () => {
  document.querySelector(".nav-links").classList.toggle("nav-open");
});