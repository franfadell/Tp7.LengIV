import { useState } from "react";
import "./ProyectoBlob.css";

const TEXTO_INICIAL =
  "Hola, este es un archivo de texto creado con un Blob desde React.\n" +
  "Trabajo Práctico N°7 - Lenguaje IV - UCASAL.";

function ProyectoBlob() {
  const [texto, setTexto] = useState(TEXTO_INICIAL);
  const [blob, setBlob] = useState(null);
  const [inicio, setInicio] = useState(0);
  const [fin, setFin] = useState(20);
  const [resultado, setResultado] = useState({ mensaje: "", tipo: "" });

  function mostrar(mensaje, tipo) {
    setResultado({ mensaje: mensaje, tipo: tipo });
  }

  function crearBlob() {
    if (texto.trim() === "") {
      mostrar("Escribí algo de texto antes de crear el Blob.", "blob-error");
      return;
    }

    const nuevo = new Blob([texto], { type: "text/plain" });
    setBlob(nuevo);
    mostrar(
      "Blob creado: " + nuevo.size + " bytes, tipo " + nuevo.type,
      "blob-exito"
    );
  }

  function descargarBlob() {
    if (!blob) {
      mostrar("Primero creá el Blob.", "blob-error");
      return;
    }

    const url = URL.createObjectURL(blob);
    const enlace = document.createElement("a");
    enlace.href = url;
    enlace.download = "archivo.txt";
    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);
    URL.revokeObjectURL(url);

    mostrar("Descargando archivo.txt", "blob-exito");
  }

  async function usarSlice() {
    if (!blob) {
      mostrar("Primero creá el Blob.", "blob-error");
      return;
    }

    const desde = Number(inicio);
    const hasta = Number(fin);

    if (desde < 0 || hasta <= desde) {
      mostrar("Rango inválido: fin tiene que ser mayor que inicio.", "blob-error");
      return;
    }

    const parte = blob.slice(desde, hasta, "text/plain");
    const contenido = await parte.text();

    mostrar(
      "slice(" + desde + ", " + hasta + ") → " + parte.size + " bytes\n\"" + contenido + "\"",
      "blob-exito"
    );
  }

  return (
    <section>
      <h2>Proyecto Blob</h2>
      <p>
        Escribí un texto, creá el Blob, descargalo como .txt o cortá un
        fragmento con slice().
      </p>

      <div className="blob-panel">
        <textarea
          rows="4"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />

        <div className="blob-botones">
          <button onClick={crearBlob}>Crear Blob</button>
          <button onClick={descargarBlob}>Descargar .txt</button>
          <button onClick={usarSlice}>Probar slice()</button>
        </div>

        <div className="blob-rango">
          <span>Rango en bytes:</span>
          <input
            type="number"
            min="0"
            aria-label="inicio"
            value={inicio}
            onChange={(e) => setInicio(e.target.value)}
          />
          <input
            type="number"
            min="1"
            aria-label="fin"
            value={fin}
            onChange={(e) => setFin(e.target.value)}
          />
        </div>

        <pre className={"blob-salida " + resultado.tipo}>
          {resultado.mensaje || "Sin resultados todavía."}
        </pre>
      </div>
    </section>
  );
}

export default ProyectoBlob;
