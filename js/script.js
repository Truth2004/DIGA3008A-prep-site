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
        <input type="text" id="navSearch" placeholder="Search city for survival weather..." class="search-input">
        <button class="search-btn" id="searchBtn">🔍</button>
        <div class="search-results" id="searchResults"></div>
      </div>
      <button class="burger" id="burger">☰</button>
    </nav>
  `;

  // Burger toggle for mobile
  const burger = document.getElementById("burger");
  burger.addEventListener("click", () => {
    document.querySelector(".nav-links").classList.toggle("nav-open");
    document.querySelector(".nav-search").classList.toggle("nav-open");
  });

  // OpenWeather API functionality
  const searchInput = document.getElementById("navSearch");
  const searchBtn = document.getElementById("searchBtn");
  const searchResults = document.getElementById("searchResults");
  
  // OpenWeather API configuration
  const API_KEY = "8eb4fb3dcb718db39dbcbe8484a3ae06";
  const BASE_URL = "https://api.openweathermap.org/data/2.5";

  async function performSearch() {
    const cityName = searchInput.value.trim();
    
    if (cityName === "") {
      showResults("Please enter a city name");
      return;
    }

    try {
      showResults("<div class='loading'>🔍 Scanning survival conditions...</div>");
      
      // Get current weather
      const currentWeatherResponse = await fetch(
        `${BASE_URL}/weather?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=metric`
      );
      
      if (!currentWeatherResponse.ok) {
        if (currentWeatherResponse.status === 404) {
          throw new Error('CITY_NOT_FOUND');
        } else if (currentWeatherResponse.status === 401) {
          throw new Error('API_KEY_INVALID');
        } else {
          throw new Error('API_ERROR');
        }
      }
      
      const currentData = await currentWeatherResponse.json();
      
      // Get 5-day forecast for survival planning
      const forecastResponse = await fetch(
        `${BASE_URL}/forecast?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=metric`
      );
      
      if (!forecastResponse.ok) {
        // Continue with just current data if forecast fails
        console.warn("Forecast data unavailable, using current weather only");
      }
      
      const forecastData = await forecastResponse.json();
      
      // Analyze weather for survival conditions
      const survivalAnalysis = analyzeSurvivalConditions(currentData, forecastData);
      
      const resultHTML = `
        <div class="weather-result">
          <div class="weather-header">
            <h3>${currentData.name}, ${currentData.sys.country}</h3>
            <div class="current-temp">${Math.round(currentData.main.temp)}°C</div>
          </div>
          
          <div class="weather-main">
            <img src="https://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png" 
                 alt="${currentData.weather[0].description}" class="weather-icon">
            <div class="weather-desc">${currentData.weather[0].description}</div>
          </div>
          
          <div class="weather-details">
            <div class="detail-item">
              <span class="label">Feels like:</span>
              <span class="value">${Math.round(currentData.main.feels_like)}°C</span>
            </div>
            <div class="detail-item">
              <span class="label">Humidity:</span>
              <span class="value">${currentData.main.humidity}%</span>
            </div>
            <div class="detail-item">
              <span class="label">Wind:</span>
              <span class="value">${currentData.wind.speed} m/s</span>
            </div>
            <div class="detail-item">
              <span class="label">Pressure:</span>
              <span class="value">${currentData.main.pressure} hPa</span>
            </div>
          </div>
          
          <div class="survival-analysis">
            <h4>🧟 Zombie Survival Assessment:</h4>
            <div class="survival-status ${survivalAnalysis.overallRisk.toLowerCase()}">
              ${survivalAnalysis.overallRisk} RISK CONDITIONS
            </div>
            <ul class="survival-tips">
              ${survivalAnalysis.tips.map(tip => `<li>${tip}</li>`).join('')}
            </ul>
            ${survivalAnalysis.forecastSummary ? `
              <div class="forecast-note">
                📅 Next 5 days: ${survivalAnalysis.forecastSummary}
              </div>
            ` : ''}
          </div>
        </div>
      `;
      
      showResults(resultHTML);
      
    } catch (error) {
      let errorMessage = '';
      
      if (error.message === 'CITY_NOT_FOUND') {
        errorMessage = `
          <div class="error">
            <strong>Survival Intel Missing:</strong> "${cityName}" not found<br>
            Check spelling or try nearby major cities.
            <div class="example-cities">
              Try: London, New York, Tokyo, Berlin, Sydney
            </div>
          </div>
        `;
      } else if (error.message === 'API_KEY_INVALID') {
        errorMessage = `
          <div class="error">
            <strong>Communication System Down:</strong> API configuration issue
          </div>
        `;
      } else {
        errorMessage = `
          <div class="error">
            <strong>Communication Error:</strong> Unable to reach weather intelligence
            <div class="example-cities">
              Check connection or try again later
            </div>
          </div>
        `;
      }
      
      showResults(errorMessage);
    }
  }

  function analyzeSurvivalConditions(currentData, forecastData) {
    const temp = currentData.main.temp;
    const humidity = currentData.main.humidity;
    const windSpeed = currentData.wind.speed;
    const weatherMain = currentData.weather[0].main;
    const visibility = currentData.visibility || 10000;
    
    let overallRisk = "LOW";
    const tips = [];
    
    // Temperature analysis for survival
    if (temp < -15) {
      tips.push("❄️ EXTREME COLD: Zombies sluggish but frostbite risk extreme");
      overallRisk = "HIGH";
    } else if (temp < 0) {
      tips.push("🥶 FREEZING: Thermal gear essential, zombies move slower");
      overallRisk = "MODERATE";
    } else if (temp > 35) {
      tips.push("🔥 EXTREME HEAT: Dehydration risk high, carry 3x water supply");
      overallRisk = "HIGH";
    } else if (temp > 25) {
      tips.push("☀️ HOT: Good for daytime raids, extra water needed");
      overallRisk = "MODERATE";
    } else {
      tips.push("🌡️ OPTIMAL TEMP: Good conditions for scavenging and defense");
    }
    
    // Weather conditions impact on survival
    if (weatherMain === "Rain" || weatherMain === "Drizzle") {
      tips.push("🌧️ RAIN: Masks zombie groans but also your footsteps");
      overallRisk = overallRisk === "LOW" ? "MODERATE" : overallRisk;
    } else if (weatherMain === "Snow") {
      tips.push("🌨️ SNOW: Tracks visible but mobility severely limited");
      overallRisk = overallRisk === "LOW" ? "MODERATE" : overallRisk;
    } else if (weatherMain === "Thunderstorm") {
      tips.push("⛈️ STORM: Thunder masks noise but limits visibility - stay indoors");
      overallRisk = "HIGH";
    } else if (weatherMain === "Fog" || weatherMain === "Mist") {
      tips.push("🌫️ FOG: High stealth advantage but ambush risk increased");
      overallRisk = "HIGH";
    } else {
      tips.push("☀️ CLEAR: Good visibility for threat assessment and defense");
    }
    
    // Wind impact on survival tactics
    if (windSpeed > 15) {
      tips.push("💨 HIGH WIND: Noise covers movement but scent travels farther");
      overallRisk = overallRisk === "LOW" ? "MODERATE" : overallRisk;
    } else if (windSpeed > 8) {
      tips.push("🍃 MODERATE WIND: Good for masking sounds, maintain awareness");
    }
    
    // Humidity and equipment considerations
    if (humidity > 85) {
      tips.push("💧 HIGH HUMIDITY: Weapons maintenance critical, watch for mold");
    } else if (humidity < 30) {
      tips.push("🏜️ LOW HUMIDITY: Hydration priority, static electricity concerns");
    }
    
    // Visibility impact on survival
    if (visibility < 1000) {
      tips.push("👁️ LOW VISIBILITY: Stealth missions recommended, avoid open areas");
      overallRisk = "HIGH";
    } else if (visibility < 5000) {
      tips.push("🔍 REDUCED VISIBILITY: Use scouts, maintain close formation");
      overallRisk = overallRisk === "LOW" ? "MODERATE" : overallRisk;
    }
    
    // Forecast analysis for planning
    let forecastSummary = "";
    if (forecastData && forecastData.list) {
      const upcomingConditions = forecastData.list.slice(0, 8).map(item => item.weather[0].main);
      const uniqueConditions = [...new Set(upcomingConditions)];
      forecastSummary = uniqueConditions.join(", ");
    }
    
    return {
      overallRisk,
      tips: tips.slice(0, 4), // Limit to 4 most important tips
      forecastSummary
    };
  }

  // Debounced search for better UX
  let searchTimeout;
  searchInput.addEventListener('input', () => {
    clearTimeout(searchTimeout);
    const term = searchInput.value.trim();
    
    if (term.length > 2) {
      searchTimeout = setTimeout(performSearch, 800);
    } else {
      hideResults();
    }
  });

  searchBtn.addEventListener("click", performSearch);
  
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      performSearch();
    }
  });

  function showResults(content) {
    searchResults.innerHTML = content;
    searchResults.style.display = 'block';
  }

  function hideResults() {
    searchResults.style.display = 'none';
  }

  // Close results when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-search')) {
      hideResults();
    }
  });
});

