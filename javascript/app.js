("use strict");
const countryContainer = document.querySelector(".section__country");
const themeToggle = document.querySelector(".navigation__theme-toggle");
const body = document.getElementsByTagName("body")[0];

// theme elements

class Country {
  constructor() {
    this.fetchData();
    themeToggle.addEventListener("click", this._toggleTheme.bind(this));
    window.addEventListener("load", this._setLastUsedTheme.bind(this));
  }

  fetchData() {
    fetch(`https://restcountries.com/v3.1/all`)
      .then((response) => {
        return response.json();
      })
      .then((countries) => {
        console.log(countries[1]);

        console.log(
          countries.filter((country) => country.capital === "undefined")
        );

        countries.forEach((country) => {
          this.renderCountry(country);
        });
      });
  }

  renderCountry(country) {
    const html = `
        <div class="country" role="button" tab-index="-1"  >
        <div class="country__flag">
          <img class="country__flag--img" src="${country.flags.svg}" alt="" />
        </div>
        <div class="country__desc">
          <h2 class="country__desc--name">${country.name.common}</h2>
          <p class="country__desc--detail">
            <span class="sub">population:</span>
            <span class="main">${country.population}</span>
          </p>
          <p class="country__desc--detail">
            <span class="sub">region:</span>
            <span class="main">${country.region}</span>
          </p>
          <p class="country__desc--detail">
            <span class="sub">capital:</span >
            <span class="main">${country.capital}</span>
          </p>
        </div>
      </div>
        `;
    countryContainer.insertAdjacentHTML("beforeend", html);
  }

  _toggleTheme() {
    let currentTheme = body.dataset?.theme;

    this._switchTheme(currentTheme);
  }
  _setLastUsedTheme() {
    console.log("theme switching started");

    const lastUsedTheme = localStorage.getItem("theme");
    if (!lastUsedTheme) return;

    let currentTheme = lastUsedTheme === "light" ? "dark" : "light";

    this._switchTheme(currentTheme);

  }
  
  _switchTheme(currentTheme) {
    switch (currentTheme) {
      case "light":
        body.dataset.theme = "dark";
        themeToggle.textContent = "Dark Mode";
        localStorage.setItem("theme", "dark");
        break;
      case "dark":
        body.dataset.theme = "light";
        themeToggle.textContent = "Light Mode";
        localStorage.setItem("theme", "light");

        break;
      }
      console.log(window.matchMedia("(prefers-color-scheme: dark)"))
  }
}

const country = new Country();
