function initSettingsPage() {
  const whiteBG = localStorage.getItem("whiteBackground");
  const fondoAjustes = localStorage.getItem("settingsBackground");

  if (whiteBG === "true") {
    setWhiteBackground();
  } else if (fondoAjustes) {
    applyBackground(fondoAjustes);
  } else {
    applyDefaultBackground();
  }

  const nombreSistema = localStorage.getItem("customSystemName");
  if (nombreSistema) {
    document.title = `🎮 ${nombreSistema} | Menu 🎮`;
  }

  const dropdown = document.getElementById("opcion2");
  if (!dropdown) return;

  dropdown.addEventListener("change", () => {
    const selectedValue = dropdown.value;
    let nuevaImagen = null;
    let nuevoColor = null;
    let nuevoGradiente = null;

    // Extra IMG
    if (selectedValue.startsWith("img")) {
      const numero = selectedValue.replace("img", "");
      nuevaImagen = `background/extra${numero}.jpg`;
    }

    // URL Custom
    else if (selectedValue === "customURL") {
      const url = prompt("Introduce la URL de la imagen de fondo:");
      if (url) nuevaImagen = url;
    }

    // Hex Color
    else if (selectedValue.startsWith("solid")) {
      const colores = {
        solidRed: "#ff0000",
        solidBlue: "#0000ff",
        solidGreen: "#16b516",
        solidYellow: "#ffff00",
        solidOrange: "#eb6b00",
        solidPurple: "#800080",
        solidPink: "#e02284",
        solidBrown: "#8b4513",
        solidGray: "#b4b4b4",
        solidBlack: "#000000"
      };
      nuevoColor = colores[selectedValue];
    }

    else if (selectedValue.startsWith("gradient")) {
      const degradados = {
        gradient1: "linear-gradient(to right, #2193b0, #6dd5ed)",
        gradient2: "linear-gradient(to right, #ff0000, #ffff00)",
        gradient3: "linear-gradient(to right, #008000, #bfff00)",
        gradient4: "linear-gradient(to right, #00c6ff, #ffffff)"
      };
      nuevoGradiente = degradados[selectedValue];
    }

    // Custom Hex Color
    else if (selectedValue === "customColor") {
      const colorPersonalizado = prompt("Introduce el código del color (ej. #ffcc00):");
      if (colorPersonalizado) nuevoColor = colorPersonalizado;
    }

    // Apply IMG
    if (nuevaImagen) {
      localStorage.setItem("customBackground", nuevaImagen);
      const aplicarEnAjustes = confirm("¿También quieres aplicarlo en ajustes?");
      if (aplicarEnAjustes) {
        localStorage.setItem("settingsBackground", nuevaImagen);
        localStorage.removeItem("whiteBackground");
        applyBackground(nuevaImagen);
      } else {
        mantenerFondoActual();
      }
      alert("✅ Fondo guardado para el menú.");
    }

    // Apply Hex Color
    else if (nuevoColor) {
      const valor = `color:${nuevoColor}`;
      applyBackground(valor);
      localStorage.setItem("customBackground", valor);
      const aplicarEnAjustes = confirm("¿También quieres aplicar este color en ajustes?");
      if (aplicarEnAjustes) {
        localStorage.setItem("settingsBackground", valor);
        localStorage.removeItem("whiteBackground");
      } else {
        mantenerFondoActual();
      }
      alert("✅ Color aplicado como fondo.");
    }

    else if (nuevoGradiente) {
      const valor = `gradient:${nuevoGradiente}`;
      applyBackground(valor);
      localStorage.setItem("customBackground", valor);
      const aplicarEnAjustes = confirm("¿También quieres aplicar este degradado en ajustes?");
      if (aplicarEnAjustes) {
        localStorage.setItem("settingsBackground", valor);
        localStorage.removeItem("whiteBackground");
      } else {
        mantenerFondoActual();
      }
      alert("✅ Degradado aplicado como fondo.");
    }

    // Remove Background
    else if (selectedValue === "removeBackground") {
      localStorage.removeItem("settingsBackground");
      localStorage.removeItem("customBackground");
      localStorage.setItem("whiteBackground", "true");
      setWhiteBackground();
      alert("✅ Fondos eliminados. Ambos fondos ahora son blancos.");
    }

    // Background Default
    else if (selectedValue === "default") {
      localStorage.removeItem("settingsBackground");
      localStorage.removeItem("customBackground");
      localStorage.removeItem("whiteBackground");
      alert("✅ Fondos restablecidos por defecto.");
      location.reload();
    }

    dropdown.selectedIndex = 0;
  });
}

function mantenerFondoActual() {
  const fondoActualSettings = localStorage.getItem("settingsBackground");
  if (fondoActualSettings) {
    applyBackground(fondoActualSettings);
  } else if (localStorage.getItem("whiteBackground") === "true") {
    setWhiteBackground();
  } else {
    applyDefaultBackground();
  }
}

function initIndexPage() {
  const whiteBG = localStorage.getItem("whiteBackground");
  const fondo = localStorage.getItem("customBackground");
  const titulo = localStorage.getItem("customTitle");
  const nombreSistema = localStorage.getItem("customSystemName");

  if (whiteBG === "true") {
    setWhiteBackground();
  } else if (fondo) {
    applyBackground(fondo);
  } else {
    applyDefaultBackground();
  }

  if (titulo) {
    const span = document.querySelector("h2 .arcoiris");
    if (span) {
      span.textContent = titulo;
    }
  }

  if (nombreSistema) {
    document.title = `🎮 ${nombreSistema} | Menu 🎮`;
  }
}

function applyBackground(valor) {
  if (valor.startsWith("color:")) {
    document.body.style.backgroundImage = "none";
    document.body.style.backgroundColor = valor.replace("color:", "");
  } else if (valor.startsWith("gradient:")) {
    document.body.style.backgroundColor = "";
    document.body.style.backgroundImage = valor.replace("gradient:", "");
  } else {
    document.body.style.backgroundColor = "";
    document.body.style.backgroundImage = `url('${valor}')`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundPosition = "center";
  }
}

function applyDefaultBackground() {
  document.body.style.backgroundColor = "";
  document.body.style.backgroundImage = "url('background/default.jpg')";
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundPosition = "center";
}

function setWhiteBackground() {
  document.body.style.backgroundImage = "none";
  document.body.style.backgroundColor = "#000000";
}

document.addEventListener("DOMContentLoaded", () => {
  const isSettings = document.getElementById("opcion2") !== null;
  if (isSettings) {
    initSettingsPage();
  } else {
    initIndexPage();
  }
});
