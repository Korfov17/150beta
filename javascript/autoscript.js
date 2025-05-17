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
            result = "PlayStation 4 v" + versionPS4 + " - Jailbreak (PPPwn/pOObs4)";
        } else if ([
            "7.00", "7.01", "7.02", "7.50", "7.51", "7.55",
            "8.00", "8.01", "8.03", "8.50", "8.52",
            "9.03", "9.04", "9.50", "9.51", "9.60",
            "10.00", "10.01", "10.50", "10.70", "10.71", "11.00"
        ].includes(versionPS4)) {
            result = "PlayStation 4 v" + versionPS4 + " - Jailbreak (PPPwn)";
        } else if (parseFloat(versionPS4) > 11.00) {
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

document.addEventListener("DOMContentLoaded", detect_device);

function resetAllSettings() {
  const confirmar = confirm("¿Estás seguro de que quieres restablecer todos los ajustes?");
  if (confirmar) {
    localStorage.removeItem("customBackground");  
    localStorage.removeItem("settingsBackground"); 
    localStorage.removeItem("customTitle");     
    localStorage.removeItem("customSystemName"); 
    localStorage.removeItem("whiteBackground");    
    localStorage.removeItem("currentBackgroundTemp");

    alert("✅ Todos los ajustes han sido restablecidos.");
    location.reload();
  }
}

function inicializarCache() {
    window.applicationCache.ondownloading = function () {
        document.getElementById("progress").innerHTML = "Iniciando proceso de caché...";
    };
    window.applicationCache.onprogress = function (a) {
        document.getElementById("progress").innerHTML = (Math.round(100 * (a.loaded / a.total))) + "%";
    };
    window.applicationCache.oncached = function () {
        document.getElementById("progress").innerHTML = "Se ha almacenado la caché exitosamente!!";
        setTimeout(function () {
            document.getElementById("progress").innerHTML = "Abre de nuevo el navegador!!";
        }, 1500);
    };
}
