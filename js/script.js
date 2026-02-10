// Auswahl Dropdown Krisengebiet

fetch("data/krisengebiete.json")
  .then(response => response.json())
  .then(data => {
    const select = document.getElementById("krisengebiete");

    data.forEach(region => {
      const option = document.createElement("option");
      option.textContent = region;
      select.appendChild(option);
    });
  });

  // Adresse Zustandsänderung
const vorOrt = document.getElementById("vorOrt");
const abholung = document.getElementById("abholung");
const adressbereich = document.getElementById("adressbereich");

function updateAdressbereich() {
  if (abholung.checked) {
    adressbereich.classList.remove("d-none");
  } else {
    adressbereich.classList.add("d-none");
  }
}

vorOrt.addEventListener("change", updateAdressbereich);
abholung.addEventListener("change", updateAdressbereich);

// Name als Pflichtfeld bei Abholung
const nameInput = document.getElementById("name");

if (abholung.checked) {
  nameInput.required = true;
} else {
  nameInput.required = false;
}
