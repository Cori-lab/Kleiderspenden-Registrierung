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
