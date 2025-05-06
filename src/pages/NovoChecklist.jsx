import { useState, useEffect } from "react";
import AssinaturaCanvas from "../components/AssinaturaCanvas";

function NovoChecklist() {
  const [titulo, setTitulo] = useState("");
  const [resposta, setResposta] = useState("");
  const [imagem, setImagem] = useState(null);
  const [assinatura, setAssinatura] = useState(null);
  const [localizacao, setLocalizacao] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const coords = `${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`;
        setLocalizacao(coords);
      });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Checklist enviado (simulado)");

    // Exibir dados coletados (só pra teste visual)
    console.log({
      titulo,
      resposta,
      assinatura,
      localizacao,
      imagem
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-xl font-bold text-blue-600 mb-4">Novo Checklist</h2>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md max-w-md">
        <label className="block mb-2 text-sm font-semibold">Título</label>
        <input
          type="text"
          className="w-full p-2 border rounded mb-4"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />

        <label className="block mb-2 text-sm font-semibold">Observações</label>
        <textarea
          className="w-full p-2 border rounded mb-4"
          value={resposta}
          onChange={(e) => setResposta(e.target.value)}
          required
        />

        <label className="block mb-2 text-sm font-semibold">Assinatura digital</label>
        <AssinaturaCanvas onChange={setAssinatura} />

        <label className="block mt-4 mb-2 text-sm font-semibold">Foto (opcional)</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImagem(e.target.files[0])}
          className="mb-4"
        />

        {localizacao && (
          <p className="text-xs text-gray-600 mb-4">📍 Localização capturada: {localizacao}</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Enviar Checklist
        </button>
      </form>
    </div>
  );
}

export default NovoChecklist;
