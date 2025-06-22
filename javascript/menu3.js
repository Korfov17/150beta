function initSettingsMenu3() {
  const fontSettings = localStorage.getItem("tph_font_settings");
  if (fontSettings) {
    applyFont(fontSettings);
  } else {
    applyFont(null);
  }

  if (localStorage.getItem("tph_robofan_symbols_enabled") === "true") {
    replaceRobofanIcons(localStorage.getItem("tph_robofan_symbol_selected") || "b");
  }

  const dropdown = document.getElementById("opcion3");
  if (!dropdown) return;

  dropdown.selectedIndex = 0;

  dropdown.addEventListener("change", () => {
    const selectedValue = dropdown.value;

    if (selectedValue === "tph_fontdefault") {
      localStorage.removeItem("tph_font_index");
      localStorage.removeItem("tph_font_settings");

      alert("✅ Fuente restablecida por defecto.");
      location.reload();
      return;
    }

    if (selectedValue === "tph_iconsdefault") {
      const confirmReset = confirm("¿Quieres restaurar los íconos por defecto? (Font Awesome)");
      if (confirmReset) {
        restoreFAIcons();
        localStorage.removeItem("tph_robofan_symbols_enabled");
        localStorage.removeItem("tph_robofan_symbol_selected");
        alert("✅ Íconos restaurados.");
        location.reload();
        return;
      } else {
        dropdown.selectedIndex = 0;
        return;
      }
    }

    if (selectedValue === "tph_font3") {
      const useRobofan = confirm("¿Deseas reemplazar los íconos por defecto (Font Awesome) por los iconos de Transformers?");
      if (useRobofan) {
        const symbol = prompt(
          "Introduce la letra del logo que quieras cargar:\n" +
          "Mayúsculas: A B C D E F G H I\n" +
          "Minúsculas: a b c d e f g h i j k l m n o p q r s t u v w x y z",
          "b"
        ) || "b";

        localStorage.setItem("tph_robofan_symbols_enabled", "true");
        localStorage.setItem("tph_robofan_symbol_selected", symbol);
        replaceRobofanIcons(symbol);
      } else {
        restoreFAIcons();
        localStorage.removeItem("tph_robofan_symbols_enabled");
        localStorage.removeItem("tph_robofan_symbol_selected");
      }
    }

    const applyToH2 = confirm("¿Quieres aplicar la fuente seleccionada al Titulo?");
    const applyToH3H4 = confirm("¿Quieres aplicar la fuente seleccionada al Texto?");
    const applyToButtons = confirm("¿Quieres aplicar la fuente seleccionada a los Botones y Desplegables?");

    if (!applyToH2 && !applyToH3H4 && !applyToButtons) {
      alert("❌ No se ha aplicado la fuente.");
      return;
    }

    function parseFonts(str) {
      const res = { h2: null, h3h4: null, buttons: null };
      if (!str) return res;
      str.split(" ").forEach(cls => {
        if (cls.endsWith("-h2")) res.h2 = cls.replace("-h2", "");
        else if (cls.endsWith("-h3h4")) res.h3h4 = cls.replace("-h3h4", "");
        else if (cls.endsWith("-buttons")) res.buttons = cls.replace("-buttons", "");
      });
      return res;
    }

    const indexFonts = parseFonts(localStorage.getItem("tph_font_index"));
    const settingsFonts = parseFonts(localStorage.getItem("tph_font_settings"));

    function updateFonts(currentFonts) {
      if (applyToH2) currentFonts.h2 = selectedValue;
      if (applyToH3H4) currentFonts.h3h4 = selectedValue;
      if (applyToButtons) currentFonts.buttons = selectedValue;
      return currentFonts;
    }

    const newIndexFonts = updateFonts(indexFonts);
    localStorage.setItem("tph_font_index",
      [newIndexFonts.h2 && `${newIndexFonts.h2}-h2`,
       newIndexFonts.h3h4 && `${newIndexFonts.h3h4}-h3h4`,
       newIndexFonts.buttons && `${newIndexFonts.buttons}-buttons`]
       .filter(Boolean).join(" ")
    );

    const applyToSettings = confirm("¿Quieres aplicar la fuente seleccionads en ajustes?");
    if (applyToSettings) {
      const newSettingsFonts = updateFonts(settingsFonts);
      localStorage.setItem("tph_font_settings",
        [newSettingsFonts.h2 && `${newSettingsFonts.h2}-h2`,
         newSettingsFonts.h3h4 && `${newSettingsFonts.h3h4}-h3h4`,
         newSettingsFonts.buttons && `${newSettingsFonts.buttons}-buttons`]
        .filter(Boolean).join(" ")
      );
      applyFont(localStorage.getItem("tph_font_settings"));

      if (localStorage.getItem("tph_robofan_symbols_enabled") === "true") {
        replaceRobofanIcons(localStorage.getItem("tph_robofan_symbol_selected") || "b");
      }
    } else {
      applyFont(localStorage.getItem("tph_font_settings") || null);
    }

    alert("✅ Fuente aplicada.");
    dropdown.selectedIndex = 0;
  });
}

function initIndexMenu3() {
  const indexFont = localStorage.getItem("tph_font_index");
  if (indexFont) {
    applyFont(indexFont);
  }

  if (localStorage.getItem("tph_robofan_symbols_enabled") === "true") {
    replaceRobofanIcons(localStorage.getItem("tph_robofan_symbol_selected") || "b");
  }
}

function applyFont(fontClass) {
  document.body.classList.remove(
    ...Array.from(document.body.classList).filter(c => c.startsWith("tph_font"))
  );

  if (fontClass) {
    fontClass.split(" ").forEach(cl => {
      document.body.classList.add(cl);
    });
  }
}

function replaceRobofanIcons(symbol) {
  const faIcons = document.querySelectorAll("i[class*='fa']");
  faIcons.forEach(icon => {
    if (icon.tagName.toLowerCase() === "span" && icon.classList.contains("robofan-icon")) return;

    const span = document.createElement("span");
    span.classList.add("robofan-icon");
    span.textContent = symbol;
    span.style.fontFamily = "'Robofan-Symbol', sans-serif";
    span.dataset.originalIcon = icon.outerHTML;
    icon.replaceWith(span);
  });
}

function restoreFAIcons() {
  const robofanIcons = document.querySelectorAll("span.robofan-icon[data-original-icon]");
  robofanIcons.forEach(span => {
    const temp = document.createElement("div");
    temp.innerHTML = span.dataset.originalIcon;
    const originalIcon = temp.firstElementChild;
    span.replaceWith(originalIcon);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const isSettings = document.getElementById("opcion3") !== null;
  if (isSettings) {
    initSettingsMenu3();
  } else {
    initIndexMenu3();
  }
});
