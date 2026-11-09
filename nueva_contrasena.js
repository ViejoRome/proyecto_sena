const $ = (id) => document.getElementById(id);

// Solo se puede entrar si el código fue verificado
if (sessionStorage.getItem("sigie_verificado") !== "si") {
 window.location.href = "recuperar_contrasena.html";
}

const p1 = $("pass1");
const p2 = $("pass2");
const msg = $("msg");

function evaluar() {
  const reglas = {
    largo: p1.value.length >= 8,
    mayus: /[A-Z]/.test(p1.value),
    numero: /\d/.test(p1.value),
    igual: p1.value !== "" && p1.value === p2.value,
  };
  Object.entries(reglas).forEach(([k, ok]) => {
    document.querySelector(`[data-regla="${k}"]`).classList.toggle("ok", ok);
  });
  return Object.values(reglas).every(Boolean);
}
p1.addEventListener("input", evaluar);
p2.addEventListener("input", evaluar);

document.querySelectorAll(".ojo").forEach((b) => {
  b.addEventListener("click", () => {
    const input = $(b.dataset.target);
    input.type = input.type === "password" ? "text" : "password";
  });
});

$("formPass").addEventListener("submit", (e) => {
  e.preventDefault();
  if (!evaluar()) {
    msg.textContent = "La contraseña no cumple todos los requisitos.";
    msg.hidden = false;
    return;
  }
  msg.hidden = true;

  // TODO: enviar al backend (POST /api/recuperar/cambiar) con el correo y la nueva contraseña
  // El servidor debe comprobar que el código fue verificado; no confíes solo en esta página.

  sessionStorage.clear();
  $("formPass").hidden = true;
  document.querySelector(".steps").hidden = true;
  $("exito").hidden = false;
});
