function initSettingsMenu3() {
  // Cargar y aplicar solo la fuente de ajustes
  const fuenteSettings = localStorage.getItem("tph_font_settings");
  if (fuenteSettings) {
    applyFont(fuenteSettings);
  }

  const dropdown = document.getElementById("opcion3");
  if (!dropdown) return;

  dropdown.selectedIndex = 0; // placeholder

  dropdown.addEventListener("change", () => {
    const selectedValue = dropdown.value;

    if (selectedValue === "tph_fontdefault") {
      // Borrar ambas claves para reset completo
      localStorage.removeItem("tph_font_index");
      localStorage.removeItem("tph_font_settings");
      alert("✅ Fuente restablecida por defecto.");
      location.reload();
      return;
    }

    const aplicarH2 = confirm("¿Quieres aplicar esta fuente a los h2?");
    const aplicarH3H4 = confirm("¿Quieres aplicar esta fuente a los h3 y h4?");
    const aplicarButtons = confirm("¿Quieres aplicar esta fuente a los botones y desplegables?");

    if (!aplicarH2 && !aplicarH3H4 && !aplicarButtons) {
      alert("❌ No se aplicó la fuente a ningún elemento.");
      return;
    }

    // Función para convertir string a objeto {h2: fuente, h3h4: fuente, buttons: fuente}
    function parseFonts(str) {
      const res = { h2: null, h3h4: null, buttons: null };
      if (!str) return res;
      str.split(" ").forEach(clase => {
        if (clase.endsWith("-h2")) res.h2 = clase.replace("-h2", "");
        else if (clase.endsWith("-h3h4")) res.h3h4 = clase.replace("-h3h4", "");
        else if (clase.endsWith("-buttons")) res.buttons = clase.replace("-buttons", "");
      });
      return res;
    }

    // Leer los valores actuales
    const indexFonts = parseFonts(localStorage.getItem("tph_font_index"));
    const settingsFonts = parseFonts(localStorage.getItem("tph_font_settings"));

    // Actualizar solo las fuentes que el usuario confirme
    function updateFonts(currentFonts) {
      if (aplicarH2) currentFonts.h2 = selectedValue;
      if (aplicarH3H4) currentFonts.h3h4 = selectedValue;
      if (aplicarButtons) currentFonts.buttons = selectedValue;
      return currentFonts;
    }

    const newIndexFonts = updateFonts(indexFonts);
    localStorage.setItem("tph_font_index",
      [newIndexFonts.h2 && `${newIndexFonts.h2}-h2`,
       newIndexFonts.h3h4 && `${newIndexFonts.h3h4}-h3h4`,
       newIndexFonts.buttons && `${newIndexFonts.buttons}-buttons`]
       .filter(Boolean).join(" ")
    );

    const aplicarEnAjustes = confirm("¿Quieres aplicar esta fuente también en ajustes?");
    if (aplicarEnAjustes) {
      const newSettingsFonts = updateFonts(settingsFonts);
      localStorage.setItem("tph_font_settings",
        [newSettingsFonts.h2 && `${newSettingsFonts.h2}-h2`,
         newSettingsFonts.h3h4 && `${newSettingsFonts.h3h4}-h3h4`,
         newSettingsFonts.buttons && `${newSettingsFonts.buttons}-buttons`]
        .filter(Boolean).join(" ")
      );
      applyFont(localStorage.getItem("tph_font_settings"));
    } else {
      applyFont(localStorage.getItem("tph_font_settings") || null);
    }

    alert("✅ Fuente aplicada.");
    dropdown.selectedIndex = 0;
  });
}

function initIndexMenu3() {
  // Solo cargar la fuente de index
  const fuenteIndex = localStorage.getItem("tph_font_index");
  if (fuenteIndex) {
    applyFont(fuenteIndex);
  }
}

function applyFont(claseFuente) {
  document.body.classList.remove(
    ...Array.from(document.body.classList).filter(c => c.startsWith("tph_font"))
  );

  if (claseFuente) {
    claseFuente.split(" ").forEach(cl => {
      document.body.classList.add(cl);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const isSettings = document.getElementById("opcion3") !== null;
  if (isSettings) {
    initSettingsMenu3();
  } else {
    initIndexMenu3();
  }
});
