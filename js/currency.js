function setValue(selector, value) {
  document.querySelectorAll(selector).forEach(item => {
    item.innerText = value;
  });
}

function currency() {
  const countryListEUR = [
    "AT",
    "CH",
    "DE",
    "LI",
    "LU",
    "BE",
    "CZ",
    "ES",
    "FR",
    "GR",
    "HU",
    "IT",
    "NL",
    "PL",
    "PT",
    "RO",
    "RS",
    "HR",
    "SK",
    "SL",
    "DK",
    "FI",
    "NO",
    "SE"
  ];

  fetch("https://amos-mamaya.fun/geo")
    .then(response => response.ok ? response.json() : Promise.reject())
    .then(data => {
      setValue(".countryName", data.country);
      if (data.country_code == "GB") {
        setValue(".currency", "£");
        setValue(".currencyText", "pounds");
      } else if (countryListEUR.includes(data.country_code)) {
        setValue(".currency", "€");
        setValue(".currencyText", "euros");
      } else {
        setValue(".currency", "$");
        setValue(".currencyText", "dollars");
      }
    })
    .catch(() => {
      setValue(".currency", "$");
      setValue(".currencyText", "dollars");
      setValue(".countryName", "YOUR COUNTRY");
    });
}

window.addEventListener("DOMContentLoaded", () => {
  currency();
});