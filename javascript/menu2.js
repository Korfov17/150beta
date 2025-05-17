function initSettingsMenu2() {
  const whiteBG = localStorage.getItem("tph_whiteBackground");
  const fondoAjustes = localStorage.getItem("tph_settingsBackground");

  if (whiteBG === "true") {
    setWhiteBackground();
  } else if (fondoAjustes) {
    applyBackground(fondoAjustes);
  } else {
    applyDefaultBackground();
  }

  const dropdown = document.getElementById("opcion2");
  if (!dropdown) return;

  dropdown.addEventListener("change", () => {
    const selectedValue = dropdown.value;
    let nuevaImagen = null;
    let nuevoColor = null;
    let nuevoGradiente = null;

    // Extra IMG
    if (selectedValue.startsWith("tph_img")) {
      const numero = selectedValue.replace("tph_img", "");
      nuevaImagen = `background/extra${numero}.jpg`;
    }

    // URL Custom
    else if (selectedValue === "tph_customURL") {
      const url = prompt("Introduce la URL para aplicar como fondo:");
      if (url) nuevaImagen = url;
    }

    // Hex Color
    else if (selectedValue.startsWith("tph_solid")) {
      const colores = {
        tph_solidRed: "#ff0000",
        tph_solidBlue: "#0000ff",
        tph_solidGreen: "#16b516",
        tph_solidYellow: "#ffff00",
        tph_solidOrange: "#eb6b00",
        tph_solidPurple: "#800080",
        tph_solidPink: "#e02284",
        tph_solidBrown: "#8b4513",
        tph_solidGray: "#b4b4b4",
        tph_solidBlack: "#000000"
      };
      nuevoColor = colores[selectedValue];
    }

    // Custom Hex Color
    else if (selectedValue === "tph_customColor") {
      const colorPersonalizado = prompt("Introduce el código hexadecimal del color (ej. #ffcc00):");
      if (colorPersonalizado) nuevoColor = colorPersonalizado;
    }

    // Gradient
    else if (selectedValue.startsWith("tph_gradient")) {
      const degradados = {
        tph_gradient1: "linear-gradient(135deg, #ff6a5c 0%, #ffb88c 50%, #ffffff 100%)",
        tph_gradient2: "linear-gradient(to right, #d0003a 0%, #ff6b81 60%, #ffffff 100%)",
        tph_gradient3: "linear-gradient(120deg, #7f00ff 0%, #3f51b5 60%, #ffffff 100%)",
        tph_gradient4: "linear-gradient(to right, #00c9ff 0%, #92fe9d 60%, #ffffff 100%)",
      };
      nuevoGradiente = degradados[selectedValue];
    }

    // Remove Background
    else if (selectedValue === "tph_removeBackground") {
      localStorage.removeItem("tph_settingsBackground");
      localStorage.removeItem("tph_customBackground");
      localStorage.setItem("tph_whiteBackground", "true");
      setWhiteBackground();
      alert("✅ Fondo eliminado.");
    }

    // Background Default
    else if (selectedValue === "tph_default") {
      localStorage.removeItem("tph_settingsBackground");
      localStorage.removeItem("tph_customBackground");
      localStorage.removeItem("tph_whiteBackground");
      alert("✅ Fondo restablecido por defecto.");
      location.reload();
    }

    // Apply background if one was set
    if (nuevaImagen) {
      localStorage.setItem("tph_customBackground", nuevaImagen);
      const aplicarEnAjustes = confirm("¿Quieres aplicar el fondo en el menú de ajustes?");
      if (aplicarEnAjustes) {
        localStorage.setItem("tph_settingsBackground", nuevaImagen);
        localStorage.removeItem("tph_whiteBackground");
        applyBackground(nuevaImagen);
      } else {
        mantenerFondoActual();
      }
      alert("✅ Fondo guardado correctamente.");
    }

    else if (nuevoColor) {
      const valor = `color:${nuevoColor}`;
      applyBackground(valor);
      localStorage.setItem("tph_customBackground", valor);
      const aplicarEnAjustes = confirm("¿Quieres aplicar este color como fondo en el menú de ajustes?");
      if (aplicarEnAjustes) {
        localStorage.setItem("tph_settingsBackground", valor);
        localStorage.removeItem("tph_whiteBackground");
      } else {
        mantenerFondoActual();
      }
      alert("✅ Color aplicado como fondo.");
    }

    else if (nuevoGradiente) {
      const valor = `tph_gradient:${nuevoGradiente}`;
      applyBackground(valor);
      localStorage.setItem("tph_customBackground", valor);
      const aplicarEnAjustes = confirm("¿Quieres aplicar este degradado como fondo en el menú de ajustes?");
      if (aplicarEnAjustes) {
        localStorage.setItem("tph_settingsBackground", valor);
        localStorage.removeItem("tph_whiteBackground");
      } else {
        mantenerFondoActual();
      }
      alert("✅ Degradado aplicado como fondo.");
    }

    // Reset dropdown al placeholder
    dropdown.selectedIndex = 0;
  });
}

function mantenerFondoActual() {
  const fondoActualSettings = localStorage.getItem("tph_settingsBackground");
  if (fondoActualSettings) {
    applyBackground(fondoActualSettings);
  } else if (localStorage.getItem("tph_whiteBackground") === "true") {
    setWhiteBackground();
  } else {
    applyDefaultBackground();
  }
}

// Parte 2: Solo aplica el fondo al index
function initIndexMenu2() {
  const whiteBG = localStorage.getItem("tph_whiteBackground");
  const fondo = localStorage.getItem("tph_customBackground");

  if (whiteBG === "true") {
    setWhiteBackground();
  } else if (fondo) {
    applyBackground(fondo);
  } else {
    applyDefaultBackground();
  }
}

// Aplicar el fondo según el tipo
function applyBackground(valor) {
  if (valor.startsWith("color:")) {
    document.body.style.backgroundImage = "none";
    document.body.style.backgroundColor = valor.replace("color:", "");
  } else if (valor.startsWith("tph_gradient:")) {
    document.body.style.backgroundColor = "";
    document.body.style.backgroundImage = valor.replace("tph_gradient:", "");
  } else {
    document.body.style.backgroundColor = "";
    document.body.style.backgroundImage = `url('${valor}')`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundPosition = "center";
  }
}

// Fondo por defecto
function applyDefaultBackground() {
  document.body.style.backgroundColor = "";
  document.body.style.backgroundImage = "url('background/default.jpg')";
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundPosition = "center";
}

// Fondo blanco
function setWhiteBackground() {
  document.body.style.backgroundImage = "none";
  document.body.style.backgroundColor = "#000000";
}

// Autodetectar si estamos en ajustes o index
document.addEventListener("DOMContentLoaded", () => {
  const isSettings = document.getElementById("opcion2") !== null;
  if (isSettings) {
    initSettingsMenu2();
  } else {
    initIndexMenu2();
  }
});
