import { useState } from "react";

export default function NovoChecklist() {
  const [titulo, setTitulo] = useState("");
  const [resposta, setResposta] = useState("");
  const [imagem, setImagem] = useState(null);
  const [assinatura, setAssinatura] = useState(null);
  const [localizacao, setLocalizacao] = useState("");
  const [enviando, setEnviando] = useState(false);

  const capturarLocalizacao = () => {
    if (!navigator.geolocation) return alert("Geolocalização não suportada");

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLocalizacao(`${latitude}, ${longitude}`);
      },
      (err) => {
        alert("Erro ao capturar localização");
        console.error(err);
      }
    );
  };

  const converterParaBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const enviarChecklist = async () => {
    if (!titulo || !resposta || !imagem || !assinatura || !localizacao) {
      return alert("Preencha todos os campos e capture a localização");
    }

    setEnviando(true);

    try {
      const imagemBase64 = await converterParaBase64(imagem);
      const assinaturaBase64 = await converterParaBase64(assinatura);

      const payload = {
        titulo,
        resposta,
        imagem: imagemBase64,
        assinatura: assinaturaBase64,
        localizacao,
      };

      const respostaApi = await fetch(
        "https://checklist-backend.onrender.com/api/checklist", // depois atualizamos se o teu backend for outro
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const blob = await respostaApi.blob();
      const urlPDF = URL.createObjectURL(blob);
      window.open(urlPDF, "_blank");
    } catch (erro) {
      console.error("Erro ao enviar checklist:", erro);
      alert("Erro ao enviar checklist.");
    }

    setEnviando(false);
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-600">Novo Checklist</h1>

      <label className="block mb-2">Título:</label>
      <input
        type="text"
        className="w-full border p-2 mb-4"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />

      <label className="block mb-2">Resposta:</label>
      <textarea
        className="w-full border p-2 mb-4"
        value={resposta}
        onChange={(e) => setResposta(e.target.value)}
      />

      <label className="block mb-2">Foto (anexo):</label>
      <input
        type="file"
        className="mb-4"
        accept="image/*"
        onChange={(e) => setImagem(e.target.files[0])}
      />

      <label className="block mb-2">Assinatura (anexo):</label>
      <input
        type="file"
        className="mb-4"
        accept="image/*"
        onChange={(e) => setAssinatura(e.target.files[0])}
      />

      <button
        onClick={capturarLocalizacao}
        className="bg-gray-200 px-4 py-2 rounded mb-4"
      >
        Capturar Localização
      </button>

      <p className="mb-4 text-sm text-gray-600">Local: {localizacao}</p>

      <button
        onClick={enviarChecklist}
        disabled={enviando}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {enviando ? "Enviando..." : "Enviar Checklist"}
      </button>
    </div>
  );
}

