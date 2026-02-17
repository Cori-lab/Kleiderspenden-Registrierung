document.addEventListener("DOMContentLoaded", function () {

  // Elemente sammeln
  const formular = document.getElementById("spendenFormular");
  const spendeBereich = document.getElementById("spende");
  const bestaetigung = document.getElementById("bestaetigung");

  const vorOrt = document.getElementById("vorOrt");
  const abholung = document.getElementById("abholung");
  const adressbereich = document.getElementById("adressbereich");

  const vornameInput = document.getElementById("vorname");
  const nachnameInput = document.getElementById("nachname");
  const emailInput = document.getElementById("email");
  const strasseInput = document.getElementById("strasse");
  const hausnrInput = document.getElementById("hausnr");
  const plzInput = document.getElementById("plz");
  const ortInput = document.getElementById("ort");
  
  const select = document.getElementById("krisengebiete");
  const neueSpendeBtn = document.getElementById("neueSpende");

    // Sanitizer Hilfsfunktion
  function sanitizer(value) {
  return value
    .trim()
    .replace(/[<>]/g, "");
  }

  // Adressbereich ein- und ausblenden
  function updateAdressbereich() {
    if (abholung.checked) {
      adressbereich.classList.remove("d-none");

    vornameInput.required = true;
    nachnameInput.required = true;
    strasseInput.required = true;
    hausnrInput.required = true;
    plzInput.required = true;
    ortInput.required = true;

    } else {
      adressbereich.classList.add("d-none");

    vornameInput.required = false;
    nachnameInput.required = false;
    strasseInput.required = false;
    hausnrInput.required = false;
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
      option.value = region;
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

  // Formulardaten sammeln
const kleidung = document.getElementById("kleidung").value;
const anzahl = document.getElementById("anzahl").value;
const selectGebiet = document.getElementById("krisengebiete");
const gebiet = selectGebiet.options[selectGebiet.selectedIndex].text;
const vorname = sanitizer(document.getElementById("vorname").value);
const nachname = sanitizer(document.getElementById("nachname").value);
const email = sanitizer(document.getElementById("email").value);
const strasse = sanitizer(document.getElementById("strasse").value);
const hausnr = sanitizer(document.getElementById("hausnr").value);
const plz = document.getElementById("plz").value;
const ort = sanitizer(document.getElementById("ort").value);

const uebergabeart = abholung.checked
  ? "Abholung durch Sammelfahrzeug"
  : "Übergabe an der Geschäftsstelle";

  // Datum und Uhrzeit anzeigen
  const jetzt = new Date();
  document.getElementById("confirmDatum").textContent =
  jetzt.toLocaleString("de-DE");

document.getElementById("confirmUebergabe").textContent = uebergabeart;
document.getElementById("confirmGebiet").textContent = gebiet;
document.getElementById("confirmKleidung").textContent = kleidung;
document.getElementById("confirmAnzahl").textContent = anzahl;
document.getElementById("confirmEmail").textContent = email;
document.getElementById("confirmVorname").textContent = vorname || "nicht angegeben";
document.getElementById("confirmNachname").textContent = nachname || "nicht angegeben";
    
  // Adresse nur bei Abholung anzeigen
if (abholung.checked) {
  document.getElementById("confirmAdresse").textContent =
    `${strasse}, ${plz} ${ort}`;
} else {
  document.getElementById("confirmAdresse").textContent =
    "Übergabe vor Ort";
}

  // Bestätigung anzeigen
spendeBereich.style.display = "none";
bestaetigung.hidden = false;

// neue Spende erfassen
neueSpendeBtn.addEventListener("click", function () {
  formular.reset();

  bestaetigung.hidden = true;
  spendeBereich.style.display = "block";

  updateAdressbereich();
});
  });
   });

  