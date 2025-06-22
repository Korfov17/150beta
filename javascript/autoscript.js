function detect_device() {
    const ua = navigator.userAgent;
    let result = "No Identificado";

    const ps4fw = ua.match(/PlayStation 4\/(\d+\.\d+)/);
    if (ps4fw) {
        let versionPS4 = ps4fw[1];

        if (parseFloat(versionPS4) < 10.00) {
            versionPS4 = versionPS4.replace(/^0/, '');
        }

        if (versionPS4 === "5.05") {
            result = "PlayStation 4 v" + versionPS4 + " - Jailbreak (PS4 BPF Exploit)";
        } else if (versionPS4 === "6.72") {
            result = "PlayStation 4 v" + versionPS4 + " - Jailbreak (PS4JB Exploit)";
        } else if (versionPS4 === "9.00") {
            result = "PlayStation 4 v" + versionPS4 + " - Jailbreak (PPPwn/PSFree/pOObs4/Lapse)";
        } else if (parseFloat(versionPS4) >= 7.00 && parseFloat(versionPS4) <= 9.60) {
            result = "PlayStation 4 v" + versionPS4 + " - Jailbreak (PSFree/Lapse/PPPwn)";
        } else if (parseFloat(versionPS4) >= 10.00 && parseFloat(versionPS4) <= 11.00) {
            result = "PlayStation 4 v" + versionPS4 + " - Jailbreak (PPPwn)";
        } else if (parseFloat(versionPS4) >= 11.02 && parseFloat(versionPS4) <= 12.02) {
            result = "PlayStation 4 v" + versionPS4 + " - Jailbreak (Lua/Lapse)";
        } else if (parseFloat(versionPS4) > 12.02) {
            result = "PlayStation 4 v" + versionPS4 + " - No Jailbreak";
        } else if (parseFloat(versionPS4) < 5.05) {
            result = "PlayStation 4 v" + versionPS4 + " - Jailbreak Disponible";
        } else {
            result = "PlayStation 4 v" + versionPS4;
        }
    } else if (/Windows NT 6.1/.test(ua)) {
        result = "Windows 7";
    } else if (/Windows NT 6.2/.test(ua)) {
        result = "Windows 8";
    } else if (/Windows NT 6.3/.test(ua)) {
        result = "Windows 8.1";
    } else if (/Windows NT 10.0/.test(ua)) {
        result = "Windows 10";
    } else if (/Windows NT 10.1/.test(ua)) {
        result = "Windows 11";
    } else if (/Windows/.test(ua)) {
        result = "Otro SO Windows";
    } else if (/Android/.test(ua)) {
        const androidversion = ua.match(/Android (\d+\.\d+|\d+)/);
        if (androidversion) {
            result = `Android v${androidversion[1]}`;
        }
    } else if (/Linux/.test(ua)) {
        result = "Linux";
    } else if (/iPhone|iPad|iPod/.test(ua)) {
        const iosversion = ua.match(/OS (\d+_\d+_\d+)/);
        if (iosversion) {
            result = `iOS v${iosversion[1].replace(/_/g, '.')}`;
        }
    } else if (/Macintosh|Mac OS X/.test(ua)) {
        const macOSversion = ua.match(/Mac OS X (\d+_\d+_\d+)/);
        if (macOSversion) {
            result = `MacOS v${macOSversion[1].replace(/_/g, '.')}`;
        }
    }

    const browserVersion = ua.match(/(Firefox|Chrome|Safari|Edge|Trident|MSIE)\/([\d\.]+)/);
    if (browserVersion && !ps4fw) {
        result += " - " + browserVersion[1] + " v" + browserVersion[2];
    }

    const output = document.getElementById("filterUserAgent");
    if (output) {
        output.textContent = result;
    }
}

function ps4_cache_screen() {
  const loadingScreen = document.getElementById('loading-screen');
  const mainContent = document.getElementById('main-content');
  const appCache = window.applicationCache;
  const cacheAlreadyDone = localStorage.getItem('ps4CacheDone');
  const isPS4 = /PlayStation 4|Mozilla\/5.0 \(PlayStation 4/i.test(navigator.userAgent);

  if (isPS4 && !cacheAlreadyDone && appCache.status !== appCache.UNCACHED) {
    loadingScreen.innerHTML = `
      <div id="loading-content">
        <div id="progress-text">Preparando caché...</div>
        <div id="progress-container">
          <div id="progress-bar"></div>
        </div>
      </div>
    `;
    loadingScreen.style.display = 'flex';
    mainContent.classList.add('hidden');

    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');

    appCache.addEventListener('progress', function (e) {
      if (e.lengthComputable) {
        const percent = Math.round((e.loaded / e.total) * 100);
        progressBar.style.width = percent + '%';
        progressText.textContent = `Instalando Caché Offline... ${percent}%`;
      }
    });

    appCache.addEventListener('cached', function () {
      progressText.innerHTML = '<div class="reload-message">¡Listo! Abre de nuevo el navegador</div>';
      progressBar.style.width = '100%';
      localStorage.setItem('ps4CacheDone', 'true');
    });

    appCache.addEventListener('error', function () {
      progressText.innerHTML = '<div class="reload-message">Error al instalar la caché. Vuelve a intentarlo</div>';
    });

    if (appCache.status === appCache.DOWNLOADING) {
      progressText.textContent = 'Preparando caché... 0%';
      progressBar.style.width = '0%';
    }
  } else {
    loadingScreen.style.display = 'none';
    mainContent.classList.remove('hidden');
  }
}

document.addEventListener("DOMContentLoaded", function () {
  detect_device();
  ps4_cache_screen();
});

function tph_resetSettings() {
  const confirmar = confirm("¿Estás seguro de que quieres restablecer todos los ajustes?");
  if (confirmar) {
    localStorage.removeItem("tph_customBackground");  
    localStorage.removeItem("tph_settingsBackground"); 
    localStorage.removeItem("tph_customTitle");     
    localStorage.removeItem("tph_customTitleHTML"); 
    localStorage.removeItem("tph_whiteBackground");  
    localStorage.removeItem("tph_filterUserAgent");
    localStorage.removeItem("tph_font_index");     
    localStorage.removeItem("tph_font_settings");
    localStorage.removeItem("tph_robofan_symbols_enabled"); 
    localStorage.removeItem("tph_robofan_symbol_selected");
    localStorage.removeItem("currentBackgroundTemp");

    alert("✅ Todos los ajustes han sido restablecidos.");
    location.reload();
  }
}

function tph_exportJSON() {
    const selectedKeys = [
        'tph_customBackground',
        'tph_settingsBackground',
        'tph_customTitle',
        'tph_customTitleHTML',
        'tph_filterUserAgent',
        'tph_whiteBackground',
        'tph_font_index',     
        'tph_font_settings',
        'tph_robofan_symbols_enabled',
        'tph_robofan_symbol_selected' 
    ];
    const localStorageData = {};

    selectedKeys.forEach(key => {
        const value = localStorage.getItem(key);
        if (value !== null) {
            localStorageData[key] = value;
        }
    });

    const finalData = {
        "TU PS4 HEN CONFIG JSON": {
            "version_json": "v1.0.2",
            ...localStorageData
        }
    };

    const blob = new Blob([JSON.stringify(finalData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'tups4hen_config.json';
    a.click();

    URL.revokeObjectURL(url);
}

function tph_importJSON() {
    const useURL = confirm("¿Quieres cargar la configuracion JSON desde una URL?");
    
    if (useURL) {
        const jsonURL = prompt("Introduce la URL de la configuracion JSON:");
        
        if (jsonURL) {
            fetch(jsonURL)
                .then(response => response.json())
                .then(data => {
                    if (data["TU PS4 HEN CONFIG JSON"]) {
                        const importedData = data["TU PS4 HEN CONFIG JSON"];
                        for (let key in importedData) {
                            if (importedData.hasOwnProperty(key)) {
                                localStorage.setItem(key, importedData[key]);
                            }
                        }
                        alert("✅ Se ha importado la configuracion JSON con exito.");
                        location.reload();
                    } else {
                        alert("❌ La configuracion JSON no es valida.");
                    }
                })
                .catch(error => {
                    alert("❌ Error: " + error);
                });
        }
    } else {
        const inputFile = document.createElement('input');
        inputFile.type = 'file';
        inputFile.accept = '.json';
        
        inputFile.addEventListener('change', event => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    try {
                        const data = JSON.parse(e.target.result);
                        
                        if (data["TU PS4 HEN CONFIG JSON"]) {
                            const importedData = data["TU PS4 HEN CONFIG JSON"];
                            for (let key in importedData) {
                                if (importedData.hasOwnProperty(key)) {
                                    localStorage.setItem(key, importedData[key]);
                                }
                            }
                            alert("✅ Se ha importado la configuracion JSON con exito.");
                            location.reload();
                        } else {
                            alert("❌ La configuracion JSON no es valida.");
                        }
                    } catch (error) {
                        alert("❌ Error: " + error);
                    }
                };
                reader.readAsText(file);
            }
        });
        
        inputFile.click();
    }
}
