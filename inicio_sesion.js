const form = document.getElementById("loginForm");
const usuario = document.getElementById("usuario");
const password = document.getElementById("password");
const recordar = document.getElementById("recordar");
const errorEl = document.getElementById("error");

// Recuperar usuario recordado
try {
  const guardado = localStorage.getItem("sigie_usuario");
  if (guardado) {
    usuario.value = guardado;
    recordar.checked = true;
  }
} catch (e) {}

function mostrarError(msg) {
  errorEl.textContent = msg;
  errorEl.hidden = false;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  errorEl.hidden = true;

  const user = usuario.value.trim();
  const pass = password.value;

  if (!user || !pass) {
    mostrarError("Ingrese su usuario y contraseña.");
    return;
  }

  try {
    if (recordar.checked) localStorage.setItem("sigie_usuario", user);
    else localStorage.removeItem("sigie_usuario");
  } catch (e) {}
  // TODO: aquí va la llamada real a tu backend, por ejemplo:
  // fetch("/api/login", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ usuario: user, password: pass })
  // })
  //   .then(r => r.ok ? r.json() : Promise.reject())
  //   .then(() => window.location.href = "inicio.html")
  //   .catch(() => mostrarError("Usuario o contraseña incorrectos."));
 window.location.href = "dashboard.html";
});

document.getElementById("olvido").addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "recuperar_contrasena.html";
});

// cienzo .js de dashboard
