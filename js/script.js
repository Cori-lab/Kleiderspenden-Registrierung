document.addEventListener("DOMContentLoaded", function () {

  // Elemente sammeln
  const formular = document.getElementById("spendenFormular");
  const spendeBereich = document.getElementById("spende");
  const bestaetigung = document.getElementById("bestaetigung");

  const vorOrt = document.getElementById("vorOrt");
  const abholung = document.getElementById("abholung");
  const adressbereich = document.getElementById("adressbereich");

  const select = document.getElementById("krisengebiete");

  // Adressbereich ein- und ausblenden
  function updateAdressbereich() {
    if (abholung.checked) {
      adressbereich.classList.remove("d-none");
    } else {
      adressbereich.classList.add("d-none");
    }
  }

  vorOrt.addEventListener("change", updateAdressbereich);
  abholung.addEventListener("change", updateAdressbereich);

  updateAdressbereich();

  // Auswahl Dropdown Krisengebiet

fetch("data/krisengebiete.json")
  .then(response => response.json())
  .then(data => {
    
    data.forEach(region => {
      const option = document.createElement("option");
      option.textContent = region;
      select.appendChild(option);
    });
  });

  // Formular prüfen
  formular.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!formular.checkValidity()) {
      formular.reportValidity();
      return;
    }

    spendeBereich.style.display = "none";
    bestaetigung.hidden = false;
  });

});
