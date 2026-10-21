import { useState } from "react";
import "./Contacto.css";

function Contacto() {
  const [datos, setDatos] = useState({ nombre: "", email: "", texto: "" });
  const [mensaje, setMensaje] = useState({ texto: "", tipo: "" });

  function handleChange(e) {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const nombre = datos.nombre.trim();
    const email = datos.email.trim();
    const texto = datos.texto.trim();

    if (nombre === "" || email === "" || texto === "") {
      setMensaje({ texto: "Completá todos los campos.", tipo: "error" });
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      setMensaje({ texto: "Ingresá un email válido.", tipo: "error" });
      return;
    }

    setMensaje({
      texto: "¡Gracias, " + nombre + "! Tu mensaje fue enviado.",
      tipo: "ok",
    });
    setDatos({ nombre: "", email: "", texto: "" });
  }

  return (
    <section id="contacto">
      <h2>Contacto</h2>
      <p>Dejanos tu mensaje:</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Tu nombre"
          value={datos.nombre}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Tu email"
          value={datos.email}
          onChange={handleChange}
        />
        <textarea
          name="texto"
          rows="4"
          placeholder="Tu mensaje"
          value={datos.texto}
          onChange={handleChange}
        />
        <button type="submit">Enviar</button>
      </form>

      <p className={"mensaje-form " + mensaje.tipo}>{mensaje.texto}</p>
    </section>
  );
}

export default Contacto;
