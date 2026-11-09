const form = document.getElementById("formCorreo");
const msg = document.getElementById("msg");

const correoValido = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const valor = document.getElementById("correo").value.trim();

  if (!correoValido(valor)) {
    msg.textContent = "Ingresa un correo válido.";
    msg.hidden = false;
    return;
  }
  msg.hidden = true;

  // DEMO: el código real debe generarlo y enviarlo el servidor
  const codigo = String(Math.floor(100000 + Math.random() * 900000));
  console.log("Código de prueba:", codigo);

  sessionStorage.setItem("sigie_correo", valor);
  sessionStorage.setItem("sigie_codigo_demo", codigo);
  sessionStorage.removeItem("sigie_verificado");

  // TODO: pedir al backend que envíe el código por correo

  window.location.href = "verificar_codigo.html";
});
