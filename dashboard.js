// ----- Menú lateral -----
const items = document.querySelectorAll(".menu-item[data-section]");
items.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    items.forEach((i) => i.classList.remove("active"));
    item.classList.add("active");
    // TODO: cargar la sección correspondiente (item.dataset.section)
  });
});

document.getElementById("salir").addEventListener("click", (e) => {
  e.preventDefault();
  if (confirm("¿Desea cerrar sesión?")) window.location.href = "inicio_sesion.html";
});

// ----- Pestañas (Aprendices, Instructores, ...) -----
const tabs = document.querySelectorAll(".tab");
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    // TODO: cambiar los campos según tab.dataset.tab
  });
});

// ----- Foto -----
const btnFoto = document.getElementById("btnFoto");
const fileFoto = document.getElementById("fileFoto");

btnFoto.addEventListener("click", () => fileFoto.click());
fileFoto.addEventListener("change", () => {
  const file = fileFoto.files[0];
  if (!file) return;
  btnFoto.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
  btnFoto.textContent = "";
});

// ----- Formulario -----
const form = document.getElementById("registroForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let valido = true;
  form.querySelectorAll("[required]").forEach((campo) => {
    const vacio = !campo.value.trim();
    campo.closest(".field").classList.toggle("invalid", vacio);
    if (vacio) valido = false;
  });

  if (!valido) {
    alert("Complete los campos obligatorios.");
    return;
  }

  const datos = {
    tipo: document.querySelector(".tab.active").dataset.tab,
    nombre: form.nombre.value.trim(),
    tipoDoc: form.tipoDoc.value,
    numDoc: form.numDoc.value.trim(),
    fechaNac: form.fechaNac.value,
    telefono: form.telefono.value.trim(),
    observacion: form.obs.value.trim(),
    area: form.area.value.trim(),
    vinculacion: form.vinculacion.value,
    jornada: form.jornada.value.trim(),
    correo: form.correo.value.trim(),
  };

  console.log("Registro a guardar:", datos);
  // TODO: enviar `datos` a tu backend con fetch(...)
  alert("Registro guardado (simulado).");
});

document.getElementById("btnLimpiar").addEventListener("click", () => {
  form.reset();
  form.querySelectorAll(".invalid").forEach((f) => f.classList.remove("invalid"));
  btnFoto.style.backgroundImage = "";
  btnFoto.textContent = "📷 Cámara";
});