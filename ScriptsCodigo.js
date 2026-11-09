const $ = (id) => document.getElementById(id);
const casillas = [...document.querySelectorAll("#codigo input")];
const msg = $("msg");

// Si no se pasó por el paso 1, volver al inicio
const correo = sessionStorage.getItem("sigie_correo");
if (!correo) window.location.href = "recuperar_contrasena.html";
$("correoMostrado").textContent = correo || "";

function mensaje(texto, ok = false) {
  msg.textContent = texto;
  msg.classList.toggle("ok", ok);
  msg.hidden = !texto;
}

/* ---------- Casillas del código ---------- */
casillas.forEach((c, i) => {
  c.addEventListener("input", () => {
    c.value = c.value.replace(/\D/g, "");
    c.classList.toggle("lleno", !!c.value);
    $("codigo").classList.remove("error");
    if (c.value && casillas[i + 1]) casillas[i + 1].focus();
  });
  c.addEventListener("keydown", (e) => {
    if (e.key === "Backspace" && !c.value && casillas[i - 1]) casillas[i - 1].focus();
  });
  c.addEventListener("paste", (e) => {
    e.preventDefault();
    const d = (e.clipboardData.getData("text") || "").replace(/\D/g, "").slice(0, 6);
    d.split("").forEach((n, k) => {
      casillas[k].value = n;
      casillas[k].classList.add("lleno");
    });
    casillas[Math.min(d.length, 5)].focus();
  });
});
casillas[0].focus();

/* ---------- Verificar ---------- */
$("formCodigo").addEventListener("submit", (e) => {
  e.preventDefault();
  const ingresado = casillas.map((c) => c.value).join("");

  if (ingresado.length < 6) {
    mensaje("Ingresa los 6 dígitos del código.");
    return;
  }

  // TODO: verificar en el backend (POST /api/recuperar/verificar con { correo, codigo })
  // DEMO: compara con el código guardado por el paso 1
  if (ingresado !== sessionStorage.getItem("sigie_codigo_demo")) {
    $("codigo").classList.add("error");
    mensaje("Código incorrecto. Inténtalo de nuevo.");
    return;
  }

  sessionStorage.setItem("sigie_verificado", "si");
  window.location.href = "nueva_contrasena.html";
});

/* ---------- Reenviar ---------- */
let timer;
function iniciarContador(seg) {
  const btn = $("btnReenviar");
  btn.disabled = true;
  clearInterval(timer);
  let t = seg;
  $("contador").textContent = `(${t}s)`;
  timer = setInterval(() => {
    t--;
    $("contador").textContent = t > 0 ? `(${t}s)` : "";
    if (t <= 0) {
      clearInterval(timer);
      btn.disabled = false;
    }
  }, 1000);
}
iniciarContador(60);

$("btnReenviar").addEventListener("click", () => {
  const nuevo = String(Math.floor(100000 + Math.random() * 900000));
  sessionStorage.setItem("sigie_codigo_demo", nuevo);
  console.log("Código de prueba:", nuevo);
  // TODO: pedir al backend que reenvíe el código
  casillas.forEach((c) => { c.value = ""; c.classList.remove("lleno"); });
  casillas[0].focus();
  mensaje("Te enviamos un nuevo código.", true);
  iniciarContador(60);
});
