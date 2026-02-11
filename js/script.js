document.addEventListener("DOMContentLoaded", function () {

  // Elemente sammeln
  const formular = document.getElementById("spendenFormular");
  const spendeBereich = document.getElementById("spende");
  const bestaetigung = document.getElementById("bestaetigung");

  const vorOrt = document.getElementById("vorOrt");
  const abholung = document.getElementById("abholung");
  const nameInput = document.getElementById("name");
  const strasseInput = document.getElementById("strasse");
  const plzInput = document.getElementById("plz");
  const ortInput = document.getElementById("ort");
  const adressbereich = document.getElementById("adressbereich");

  const select = document.getElementById("krisengebiete");

  // Adressbereich ein- und ausblenden
  function updateAdressbereich() {
    if (abholung.checked) {
      adressbereich.classList.remove("d-none");

    nameInput.required = true;
    strasseInput.required = true;
    plzInput.required = true;
    ortInput.required = true;

    } else {
      adressbereich.classList.add("d-none");

    nameInput.required = false;
    strasseInput.required = false;
    plzInput.required = false;
    ortInput.required = false;
    
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