("use strict");
const countryContainer = document.querySelector(".section__country");
const themeToggle = document.querySelector(".navigation__theme-toggle");
const body = document.getElementsByTagName("body")[0];
const dropdown = document.querySelector(".dropdown");
const dropdownvalueDisplay = document.querySelector(".dropdown__values");
const optionContainer = document.querySelector(".dropdown__options");
const defaultOption = document.querySelector(".default");
const values = document.querySelectorAll(".dropdown__value");
const options = document.querySelectorAll(".dropdown__option");
const submitBtn = document.querySelector(`input[type='submit']`)




// theme elements

class Country {
  prevValue = [];
  constructor() {
    this.fetchData();
    window.addEventListener("load", this._setLastUsedTheme.bind(this));
    themeToggle.addEventListener("click", this._toggleTheme.bind(this));
    dropdown.addEventListener(
      "click",
      this._submitDropdownSelection.bind(this)
    );
  }

  fetchData() {
    fetch(`https://restcountries.com/v3.1/all`)
      .then((response) => {
        return response.json();
      })
      .then((countries) => {
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
    const lastUsedTheme = localStorage.getItem("theme");
    if (!lastUsedTheme) return;

    let currentTheme = lastUsedTheme === "light" ? "dark" : "light";

    this._switchTheme(currentTheme);
  }

  _submitDropdownSelection(e) {
    if (e.target.closest("div").classList.contains("dropdown__values"))
      optionContainer.classList.toggle("hide__options");

    if (!e.target.dataset.continent || e.target.closest("div").classList.contains("dropdown__values")) return;

    const availableOptions = ["africa", "asia", "europe", "america", "oceania", "all"];
    if (availableOptions.includes(e.target.dataset?.continent)) {
      const continent = e.target.dataset.continent;
      values.forEach(function (value) {
        if (value.dataset.continent !== continent) {
          value.classList.add("hide");
        } else {
          value.classList.remove("hide");
        }
      });

      options.forEach(function (option) {
        if (option.dataset.continent !== continent) {
          option.classList.remove("hide");
        } else {
          option.classList.add("hide");
        }
      });

      optionContainer.classList.toggle("hide__options");

      console.log(continent);
      submitBtn.value = continent
      console.log(submitBtn);
      submitBtn.click()
    }

    // if (!options.includes(e.target.value)) return;
    // console.log(this);

    // console.log(e.target.value);
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
    // console.log(window.matchMedia("(prefers-color-scheme: dark)"))
  }
}

const country = new Country();
