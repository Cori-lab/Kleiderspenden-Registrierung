document.addEventListener("DOMContentLoaded", function () {

  const plzInput = document.getElementById("plz");
  const abholung = document.getElementById("abholung");

  const geschaeftsstellenPLZPrefix = "50";

  plzInput.addEventListener("input", function () {

    if (!abholung.checked) {
      plzInput.classList.remove("is-invalid");
      return;
    }

    const plz = plzInput.value;

    if (plz.length >= 2) {
      const prefix = plz.substring(0, 2);

      if (prefix !== geschaeftsstellenPLZPrefix) {
        plzInput.classList.add("is-invalid");
      } else {
        plzInput.classList.remove("is-invalid");
      }
    } else {
      plzInput.classList.remove("is-invalid");
    }

  });

});
