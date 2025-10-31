document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("navbar").innerHTML = `
    <nav class="nav-container">
      <div class="logo" alt="Zombie Survival Logo">
        <img src="/DIGA3008A-prep-site/images/hand-gun-logo.png" alt="Zombie Survival Logo">
      </div>
      <ul class="nav-links">
        <li><a href="/DIGA3008A-prep-site/index.html">Home</a></li>
        <li><a href="/DIGA3008A-prep-site/survival-kits/survival-kits.html">Survival Kits</a></li>
        <li><a href="/DIGA3008A-prep-site/guides/guides.html">Guides</a></li>
        <li><a href="/DIGA3008A-prep-site/lore/lore.html">Lore</a></li>
        <li><a href="/DIGA3008A-prep-site/contact/contact.html">Contact</a></li>
      </ul>
      <div class="nav-search">
        <input type="text" id="navSearch" placeholder="Search..." class="search-input">
        <button class="search-btn" id="searchBtn">🔍</button>
      </div>
      <button class="burger" id="burger">☰</button>
    </nav>
  `;

  // Burger toggle for mobile
  const burger = document.getElementById("burger");
  burger.addEventListener("click", () => {
    document.querySelector(".nav-links").classList.toggle("nav-open");
    // Also toggle search visibility on mobile if needed
    document.querySelector(".nav-search").classList.toggle("nav-open");
  });

  // Search functionality
  const searchInput = document.getElementById("navSearch");
  const searchBtn = document.getElementById("searchBtn");

  // Function to handle search
  function performSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === "") {
      alert("Please enter a search term");
      return;
    }

    // Define searchable content - you can expand this based on your site structure
    const searchData = {
      "home": "/DIGA3008A-prep-site/index.html",
      "survival kits": "/DIGA3008A-prep-site/survival-kits/survival-kits.html",
      "guides": "/DIGA3008A-prep-site/guides/guides.html",
      "lore": "/DIGA3008A-prep-site/lore/lore.html",
      "contact": "/DIGA3008A-prep-site/contact/contact.html",
      "zombie": "/DIGA3008A-prep-site/lore/lore.html",
      "weapons": "/DIGA3008A-prep-site/guides/guides.html",
      "food": "/DIGA3008A-prep-site/guides/guides.html",
      "shelter": "/DIGA3008A-prep-site/guides/guides.html"
    };

    // Find matching page
    let foundPage = null;
    for (const [keyword, url] of Object.entries(searchData)) {
      if (keyword.includes(searchTerm) || searchTerm.includes(keyword)) {
        foundPage = url;
        break;
      }
    }

    if (foundPage) {
      window.location.href = foundPage;
    } else {
      alert(`No results found for "${searchTerm}". Try searching for: home, survival kits, guides, lore, contact, zombie, weapons, food, shelter`);
    }
  }

  // Event listeners for search
  searchBtn.addEventListener("click", performSearch);
  
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      performSearch();
    }
  });
});